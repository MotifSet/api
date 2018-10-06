import {
    assetDataUtils,
    marketUtils,
    OrdersAndRemainingFillAmount,
    SignedOrder,
    sortingUtils,
} from '@0xproject/order-utils';
import { PrivateKeyWalletSubprovider, Provider, RPCSubprovider, Web3ProviderEngine } from '@0xproject/subproviders';
import { BigNumber } from '@0xproject/utils';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import wrap = require('express-async-wrap');
import * as _ from 'lodash';
import SetProtocol, { Address, SignedIssuanceOrder, TakerWalletOrder, Component, ZeroExSignedFillOrder } from 'setprotocol.js';

import { constants } from '../utils/constants';
import {
    unJSONifyOrder,
    bigNumberSum,
} from '../utils';
import {
    COMPONENTS,
} from '../utils/components';
import { JsonSignedIssuanceOrder } from '../types'
import { ZeroExOrderService } from '../services/zeroExOrderService';
import { TakerWalletService } from '../services/takerWalletService';

const { PUBLIC_ADDRESS } = constants;

export class OrderHandler {
    private setProtocol: SetProtocol;
    private provider: Provider;
    private takerWalletService: TakerWalletService;
    private zeroExService: ZeroExOrderService

    constructor(setProtocol: SetProtocol, provider: Provider) {
        this.setProtocol = setProtocol;
        this.provider = provider;
        this.takerWalletService = new TakerWalletService(provider);
        this.zeroExService = new ZeroExOrderService(provider, setProtocol);
    }

    public async getQuote(req: express.Request, res: express.Response): Promise<void> {
        /**
         * Params:
         * setAddress: string
         * quantity: string -> BigNumber
         *
         * Return:
         * cost_weth -> string
         */
        const { setAddress, quantity } = req.query;

        const setDetails = await this.setProtocol.setToken.getDetails(setAddress);
        const { components, naturalUnit } = setDetails;

        const { ZERO_AMOUNT, E18 } = constants;

        let totalWeth = ZERO_AMOUNT;
        let totalUSD = ZERO_AMOUNT;
        let unitUSD = ZERO_AMOUNT;
        let unitWeth = ZERO_AMOUNT;
        _.each(components, component => {
            const componentAddress = component.address;
            const componentUnit = component.unit;
            const supportedComponent = _.find(COMPONENTS, ["address", componentAddress]);
            if (!supportedComponent) {
                throw new Error(`Component ${componentAddress} is not a supported component`);
            }

            const componentCostsInEth = componentUnit.mul(quantity).div(naturalUnit).mul(supportedComponent.price_eth);
            const componentCostsInUSD = componentUnit.mul(quantity).div(naturalUnit).mul(supportedComponent.price_usd);
            const unitCostInEth = componentUnit.div(naturalUnit).mul(supportedComponent.price_eth);
            const unitCostInUSD = componentUnit.div(naturalUnit).mul(supportedComponent.price_usd);

            totalWeth = totalWeth.add(componentCostsInEth);
            totalUSD = totalUSD.add(componentCostsInUSD);
            unitWeth = unitWeth.add(unitCostInEth);
            unitUSD = unitUSD.add(unitCostInUSD);
        });
        
        const result = {
            cost_weth: totalWeth.toString(),
            cost_usd: totalUSD.toString(),
            unit_weth: unitWeth.toString(),
            unit_usd: unitUSD.toString(),
        };
        res.status(200).send(JSON.stringify(result, null, 2));
    }

     public async postMarketOrder(req: express.Request, res: express.Response): Promise<void> {
        /**
         * Params:
         * issuance_order: JSONSignedIssuanceOrder
         *
         * Return:
         * txHash -> string
         */
        const issuanceOrder: SignedIssuanceOrder = unJSONifyOrder(req.body.issuance_order as JsonSignedIssuanceOrder);
        const { signature, ...order } = issuanceOrder;

        console.log("Received a market order", JSON.stringify(issuanceOrder));
        
        // Ensure allowances and balances for required tokens
        await this.ensureAllowanceAndBalances(issuanceOrder);

        // Is Valid Signature
        await this.setProtocol.orders.isValidSignatureOrThrowAsync(order, signature);

        // Create Taker Wallet Orders
        const takerWalletOrders: TakerWalletOrder[] = this.takerWalletService.generateTakerWalletOrders(issuanceOrder);

        console.log("Taker wallet orders", JSON.stringify(takerWalletOrders));

        // Create Zero Ex Order
        // const zeroExFillOrders: ZeroExSignedFillOrder[] = await this.zeroExService.generateZeroExOrders(issuanceOrder);

        // console.log("Zero wallet orders", JSON.stringify(zeroExFillOrders));
        
        try {
            // Fill entire order
            const txHash = await this.setProtocol.orders.fillOrderAsync(
                issuanceOrder,
                issuanceOrder.quantity,
                takerWalletOrders,
                { from: PUBLIC_ADDRESS },
            );

            console.log("Order fill successful?", txHash);

            const result = {
                txHash,
            };
            res.status(200).send(JSON.stringify(result, null, 2));    
        } catch(error) {
            console.log("Error", error);
        }
    }

    private async ensureAllowanceAndBalances(issuanceOrder: SignedIssuanceOrder) {
        const { requiredComponents, requiredComponentAmounts } = issuanceOrder;

        console.log("Checking allowances and balances");

        await Promise.all(
            requiredComponents.map(async (tokenAddress, i) => {
                // Ensure balances
                const requiredTokenAmount = requiredComponentAmounts[i];
                const ownerBalance = await this.setProtocol.erc20.getBalanceOfAsync(tokenAddress, PUBLIC_ADDRESS);
                if (ownerBalance.lt(requiredTokenAmount)) {
                    throw new Error(`Owner does not have enough balance of ${tokenAddress.toString()}`);
                }

                console.log(`Owner: ${PUBLIC_ADDRESS} balance of token ${tokenAddress} of ${ownerBalance.toString()}`);

                // Ensure allowances
                const ownerAllowance = await this.setProtocol.erc20.getAllowanceAsync(
                    tokenAddress,
                    PUBLIC_ADDRESS,
                    constants.SET_KOVAN_ADDRESSES.transferProxyAddress,
                );
                if (ownerAllowance.lt(requiredTokenAmount)) {
                    console.log(`Setting allowances to Transfer Proxy for token: ${tokenAddress}`);
                    
                    await this.setProtocol.setUnlimitedTransferProxyAllowanceAsync(
                        tokenAddress,
                        { from: PUBLIC_ADDRESS },
                    );
                }

                // Check and set 0x Proxy allowances
                const ownerAllowanceZeroExProxy = await this.setProtocol.erc20.getAllowanceAsync(
                    tokenAddress,
                    PUBLIC_ADDRESS,
                    constants.SET_KOVAN_ADDRESSES.zeroExErc20Proxy,
                );
                if (ownerAllowanceZeroExProxy.lt(requiredTokenAmount)) {
                    console.log(`Setting allowances to Zero Ex ERC20 Proxy for token: ${tokenAddress}. 
                        Current amount is ${ownerAllowanceZeroExProxy}`
                    );
                    await this.setProtocol.erc20.approveAsync(
                        tokenAddress,
                        constants.SET_KOVAN_ADDRESSES.zeroExErc20Proxy,
                        requiredTokenAmount.mul(10000000000000),
                        { from: PUBLIC_ADDRESS },
                    );
                }

                console.log(`Owner: ${PUBLIC_ADDRESS} allowance of token ${tokenAddress} of ${ownerAllowance.toString()}`);
            }),
        );
    }
}
