import { Provider } from '@0xproject/subproviders';
import { SignedIssuanceOrder, TakerWalletOrder } from 'setprotocol.js';
export declare class TakerWalletService {
    private _provider;
    constructor(provider: Provider);
    generateTakerWalletOrders(issuanceOrder: SignedIssuanceOrder): TakerWalletOrder[];
}
//# sourceMappingURL=takerWalletService.d.ts.map