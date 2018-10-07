import { SignedOrder } from '0x.js';
import * as express from 'express';
export declare class ZeroXHandler {
    private providerEngine;
    private contractWrappers;
    private web3Wrapper;
    constructor();
    matchZeroXOrder(req: express.Request, res: express.Response): Promise<void>;
    unmarshallOrder(signedOrderRaw: any): SignedOrder;
}
//# sourceMappingURL=zeroxHandler.d.ts.map