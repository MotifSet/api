import * as express from 'express';
export declare class ZeroXHandler {
    constructor();
    getOrderParams(req: express.Request, res: express.Response): Promise<void>;
    matchZeroXOrder(req: express.Request, res: express.Response): Promise<void>;
    private ensureAllowanceAndBalances;
}
//# sourceMappingURL=zeroxHandler.d.ts.map