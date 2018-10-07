import {
    assetDataUtils,
    marketUtils,
    OrdersAndRemainingFillAmount,
    SignedOrder,
    sortingUtils,
} from '@0xproject/order-utils';

import {
    assetDataUtils,
    BigNumber,
    ContractWrappers,
    generatePseudoRandomSalt,
    Order,
    orderHashUtils,
    signatureUtils,
    SignerType,
} from '0x.js';

import { RPCSubprovider, Web3ProviderEngine } from '0x.js';
import { Web3Wrapper } from '@0xproject/web3-wrapper';

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

export class ZeroXHandler {
    private providerEngine: Web3ProviderEngine;
    private contractWrappers: ContractWrappers;

    constructor() {
        this.providerEngine = new Web3ProviderEngine();
        this.providerEngine.addProvider(new RPCSubprovider('http://localhost:8545'));
        this.providerEngine.start();
        // Instantiate ContractWrappers with the provider
        this.contractWrappers = new ContractWrappers(this.providerEngine, { networkId: NETWORK_CONFIGS.networkId });
    }

    public async getOrderParams(req: express.Request, res: express.Response): Promise<void> {
        /**
         * Params:
         * setTokenAddress: string
         * quantity: string -> BigNumber
         *
         * Return:
         * json of zrx order to sign
         */

        
        const { addr, quantity } = req.query;

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

     public async matchZeroXOrder(req: express.Request, res: express.Response): Promise<void> {
        /**
         * Params:
         * signedorder: JSONSignedOrder
         *
         * Return:
         * txHash -> string
         */
        var {}

        var txHash = await contractWrappers.exchange.fillOrderAsync(signedOrder, takerAssetAmount, taker, {
            gasLimit: TX_DEFAULTS.gas,
        });
        await web3Wrapper.awaitTransactionSuccessAsync(txHash);
    }
}
