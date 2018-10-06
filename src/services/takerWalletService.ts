import { PrivateKeyWalletSubprovider, Provider, Web3ProviderEngine } from '@0xproject/subproviders';
import { Order, SignedOrder, SignerType } from '@0xproject/types';
import { BigNumber } from '@0xproject/utils';
import { Web3Wrapper } from '@0xproject/web3-wrapper';
import SetProtocol, { Address, SignedIssuanceOrder, TakerWalletOrder } from 'setprotocol.js';
import * as _ from 'lodash';

import { constants } from '../utils/constants';
const { PUBLIC_ADDRESS, SET_KOVAN_ADDRESSES  } = constants;

export class TakerWalletService {
    private _provider: Provider;
    constructor(provider: Provider) {
        this._provider = provider;
    }
    
    // Generate taker wallet orders, assuming complete fill
    public generateTakerWalletOrders(issuanceOrder: SignedIssuanceOrder): TakerWalletOrder[] {
        const { requiredComponents, requiredComponentAmounts } = issuanceOrder;

        const result: TakerWalletOrder[] = [];

        _.each(requiredComponents, (requiredComponent, i) => {
            result.push({
                takerTokenAddress: requiredComponent,
                takerTokenAmount: requiredComponentAmounts[i],
            });
        });

        return result;
    }
}
