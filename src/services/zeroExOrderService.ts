import {
    assetDataUtils,
    marketUtils,
    OrdersAndRemainingFillAmount,
    SignedOrder,
    sortingUtils,
} from '@0xproject/order-utils';
import { orderHashUtils, signatureUtils } from '@0xproject/order-utils';
import { PrivateKeyWalletSubprovider, Provider, Web3ProviderEngine } from '@0xproject/subproviders';
import { Order, SignerType } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import { Web3Wrapper } from '@0xproject/web3-wrapper';
import SetProtocol, { Address, SignedIssuanceOrder, ZeroExSignedFillOrder } from 'setprotocol.js';
import * as _ from 'lodash';

import { bigNumberSum } from '../utils';
import { constants } from '../utils/constants';
const { PUBLIC_ADDRESS, SET_KOVAN_ADDRESSES  } = constants;
const BUFFER_MULTIPLIER = 1;

export class ZeroExOrderService {
    private _provider: Provider;
    private setProtocol: SetProtocol;
    constructor(provider: Provider, setProtocol: SetProtocol) {
        this._provider = provider;
        this.setProtocol = setProtocol;
    }

    public async generateZeroExOrders(issuanceOrder: SignedIssuanceOrder): Promise<ZeroExSignedFillOrder[]> {
        const { requiredComponents, requiredComponentAmounts } = issuanceOrder;

        const result: ZeroExSignedFillOrder[] = [];

        for (var i = 0; i < requiredComponents.length; i++) {
            const zeroExSignedFillOrder: ZeroExSignedFillOrder = await this.createSignedZeroExOrder(issuanceOrder, i);
            result.push(zeroExSignedFillOrder);
        }

        return result;
    }

    public async createSignedZeroExOrder(
        issuanceOrder: SignedIssuanceOrder,
        componentIndex: number
    ): Promise<ZeroExSignedFillOrder> {
        const { makerToken, requiredComponents, requiredComponentAmounts } = issuanceOrder;

        const requiredComponent = requiredComponents[componentIndex];
        const requiredComponentAmount = requiredComponentAmounts[componentIndex];

        const order: Order = {
          exchangeAddress: SET_KOVAN_ADDRESSES.zeroExExchange,
          expirationTimeSeconds: this.setProtocol.orders.generateExpirationTimestamp(60),
          feeRecipientAddress: SetProtocol.NULL_ADDRESS,
          makerAddress: PUBLIC_ADDRESS,
          makerAssetAmount: requiredComponentAmount,
          makerAssetData: assetDataUtils.encodeERC20AssetData(requiredComponent),
          makerFee: new BigNumber(0),
          salt: this.setProtocol.orders.generateSalt(),
          senderAddress: SetProtocol.NULL_ADDRESS,
          takerAddress: SetProtocol.NULL_ADDRESS,
          takerAssetAmount: new BigNumber(1),
          takerAssetData: assetDataUtils.encodeERC20AssetData(makerToken),
          takerFee: new BigNumber(0),
        };

        const orderHash = orderHashUtils.getOrderHashHex(order);
        const signature = await signatureUtils.ecSignOrderHashAsync(
            this._provider,
            orderHash,
            PUBLIC_ADDRESS,
            SignerType.Default,
        );
        const signedOrder: SignedOrder = {
            signature,
            ...order,
        };

        return Object.assign(
          {},
          signedOrder,
          { fillAmount: signedOrder.takerAssetAmount },
        ) as ZeroExSignedFillOrder;
    }
}
