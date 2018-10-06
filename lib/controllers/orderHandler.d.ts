import { Provider } from '@0xproject/subproviders';
import * as express from 'express';
import SetProtocol from 'setprotocol.js';
export declare class OrderHandler {
    private setProtocol;
    private provider;
    private takerWalletService;
    private zeroExService;
    constructor(setProtocol: SetProtocol, provider: Provider);
    getQuote(req: express.Request, res: express.Response): Promise<void>;
    postMarketOrder(req: express.Request, res: express.Response): Promise<void>;
    private ensureAllowanceAndBalances;
}
//# sourceMappingURL=orderHandler.d.ts.map