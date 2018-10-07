import { Web3Wrapper } from '@0xproject/web3-wrapper';

import { Web3ProviderEngine, ContractWrappers, BigNumber, SignedOrder, RPCSubprovider } from '0x.js';

const Web3 = require("web3"); // tslint:disable-line

import * as express from 'express';
import wrap = require('express-async-wrap');
import * as _ from 'lodash';

import { config } from '../utils/config';
import { constants } from '../utils/constants';

import {
    COMPONENTS,
} from '../utils/components';


export class ZeroXHandler {
    private providerEngine: Web3ProviderEngine;
    private contractWrappers: ContractWrappers;
    private web3Wrapper: Web3Wrapper;

    constructor() {
        var web3 = new Web3(new Web3.providers.HttpProvider(config.NODE_URI));
        web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY)
        this.providerEngine = web3.currentProvider;

        // Instantiate ContractWrappers with the provider
        this.contractWrappers = new ContractWrappers(this.providerEngine, { networkId: config.NETWORK_ID});
        this.web3Wrapper = new Web3Wrapper(this.providerEngine);
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
