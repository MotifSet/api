import * as express from 'express';
export declare class ZeroXHandler {
    private providerEngine;
    private contractWrappers;
    private web3Wrapper;
    constructor();
    getOrderParams(req: express.Request, res: express.Response): Promise<void>;
    matchZeroXOrder(req: express.Request, res: express.Response): Promise<void>;
}
//# sourceMappingURL=zeroxHandler.d.ts.map