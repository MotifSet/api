import { Provider } from '@0xproject/subproviders';
import SetProtocol, { SignedIssuanceOrder, ZeroExSignedFillOrder } from 'setprotocol.js';
export declare class ZeroExOrderService {
    private _provider;
    private setProtocol;
    constructor(provider: Provider, setProtocol: SetProtocol);
    generateZeroExOrders(issuanceOrder: SignedIssuanceOrder): Promise<ZeroExSignedFillOrder[]>;
    createSignedZeroExOrder(issuanceOrder: SignedIssuanceOrder, componentIndex: number): Promise<ZeroExSignedFillOrder>;
}
//# sourceMappingURL=ZeroExOrderService.d.ts.map