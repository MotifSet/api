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

import { config } from '../utils/config';
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
    private web3Wrapper: Web3Wrapper;

    constructor() {
        this.providerEngine = new Web3ProviderEngine();
        this.providerEngine.addProvider(config.NODE_URI);
        this.providerEngine.start();
        // Instantiate ContractWrappers with the provider
        this.contractWrappers = new ContractWrappers(this.providerEngine, { networkId: config.NETWORK_ID});
        this.web3Wrapper = new Web3Wrapper(this.providerEngine);
    }

    public async getOrderParams(req: express.Request, res: express.Response): Promise<void> {
        /**
         * Params:
         * setTokenAddress: string
         * quantity: string -> BigNumber
         * userAddress: string
         *
         * Return:
         * json of zrx order to sign
         */

        const { setTokenAddress, quantity, userAddress } = req.query;

        const randomExpiration = getRandomFutureDateInSeconds();
        const exchangeAddress = this.contractWrappers.exchange.getContractAddress();

        // Create the order
        const order: Order = {
            exchangeAddress,
            makerAddress: userAddress,
            takerAddress: NULL_ADDRESS,
            senderAddress: NULL_ADDRESS,
            feeRecipientAddress: NULL_ADDRESS,
            expirationTimeSeconds: randomExpiration,
            salt: generatePseudoRandomSalt(),
            makerAssetAmount,
            takerAssetAmount,
            makerAssetData,
            takerAssetData,
            makerFee: ZERO,
            takerFee: ZERO,
        };

        res.status(200).send(JSON.stringify(order, null, 2));
    }

     public async matchZeroXOrder(req: express.Request, res: express.Response): Promise<void> {
        /**
         * Params:
         * signedorder: JSONSignedOrder
         *
         * Return:
         * txHash -> string
         */
        const signedOrder = this.unmarshallOrder(req.body);
        const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(0.1), config.DECIMALS);
        const taker = constants.PUBLIC_ADDRESS;

        var txHash = await this.contractWrappers.exchange.fillOrderAsync(signedOrder, takerAssetAmount, taker, {
            gasLimit: config.GAS,
        });
        await this.web3Wrapper.awaitTransactionSuccessAsync(txHash);
    }


    public unmarshallOrder(signedOrderRaw: any): SignedOrder {
        const signedOrder = {
            ...signedOrderRaw,
            salt: new BigNumber(signedOrderRaw.salt),
            makerAssetAmount: new BigNumber(signedOrderRaw.makerAssetAmount),
            takerAssetAmount: new BigNumber(signedOrderRaw.takerAssetAmount),
            makerFee: new BigNumber(signedOrderRaw.makerFee),
            takerFee: new BigNumber(signedOrderRaw.takerFee),
            expirationTimeSeconds: new BigNumber(signedOrderRaw.expirationTimeSeconds),
        };
        return signedOrder;
    }
}
