export interface JsonSignedIssuanceOrder {
    setAddress: string;
    makerAddress: string;
    makerToken: string;
    relayerAddress: string;
    relayerToken: string;
    quantity: string;
    makerTokenAmount: string;
    expiration: string;
    makerRelayerFee: string;
    takerRelayerFee: string;
    salt: string;
    requiredComponents: string[];
    requiredComponentAmounts: string[];
    signature: {
        v: number | string;
        r: string;
        s: string;
    };
}
//# sourceMappingURL=index.d.ts.map