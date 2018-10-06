import SetProtocol, { Address, SignedIssuanceOrder, TakerWalletOrder } from 'setprotocol.js';
import * as _ from 'lodash';

import { constants } from '../utils/constants';
const { PUBLIC_ADDRESS, SET_KOVAN_ADDRESSES  } = constants;

export class CoinCapService {
    private _provider: Provider;
    constructor(provider: Provider) {
        this._provider = provider;
    }
    
    // TODO
}
