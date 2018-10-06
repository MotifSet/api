import { Provider } from '@0xproject/subproviders';
import * as express from 'express';
import SetProtocol, { Address } from 'setprotocol.js';
export interface ComponentDetail {
    name: string;
    symbol: string;
    address: Address;
    decimals: number;
    price_usd: string;
}
export declare class SetsHandler {
    private setProtocol;
    private provider;
    constructor(setProtocol: SetProtocol, provider: Provider);
    getSets(req: express.Request, res: express.Response): Promise<void>;
    getAvailableComponents(req: express.Request, res: express.Response): Promise<void>;
}
//# sourceMappingURL=setsHandler.d.ts.map