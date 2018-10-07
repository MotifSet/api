import {
    assetDataUtils,
    marketUtils,
    OrdersAndRemainingFillAmount,
    SignedOrder,
    sortingUtils,
} from '@0xproject/order-utils';
import { Provider } from '@0xproject/subproviders';

import { BigNumber } from '@0xproject/utils';
import * as _ from 'lodash';
import { JsonSignedIssuanceOrder } from './types';
import SetProtocol, { Address, SignedIssuanceOrder, ZeroExSignedFillOrder } from 'setprotocol.js';
import { constants } from './utils/constants';

import { ZeroExOrderService } from './services/zeroExOrderService';

export function unJSONifyOrder(jsonOrder: JsonSignedIssuanceOrder): SignedIssuanceOrder {
    return {
        setAddress: jsonOrder.setAddress,
        makerAddress: jsonOrder.makerAddress,
        makerToken: jsonOrder.makerToken,
        relayerAddress: jsonOrder.relayerAddress,
        relayerToken: jsonOrder.relayerToken,
        quantity: new BigNumber(jsonOrder.quantity),
        makerTokenAmount: new BigNumber(jsonOrder.makerTokenAmount),
        expiration: new BigNumber(jsonOrder.expiration),
        makerRelayerFee: new BigNumber(jsonOrder.makerRelayerFee),
        takerRelayerFee: new BigNumber(jsonOrder.takerRelayerFee),
        salt: new BigNumber(jsonOrder.salt),
        requiredComponents: jsonOrder.requiredComponents,
        requiredComponentAmounts: _.map(jsonOrder.requiredComponentAmounts, amount => new BigNumber(amount)),
        signature: {
            v: new BigNumber(jsonOrder.signature.v),
            r: jsonOrder.signature.r,
            s: jsonOrder.signature.s,
        },
    };
}

export function bigNumberSum(numbers: BigNumber[]): BigNumber {
    let sum = new BigNumber(0);
    for (const n of numbers) {
        sum = sum.add(n);
    }
    return sum;
}
