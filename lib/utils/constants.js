"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0xproject/utils");
exports.constants = {
    SET_KOVAN_ADDRESSES: {
        coreAddress: '0xdd7d1deb82a64af0a6265951895faf48fc78ddfc',
        setTokenFactoryAddress: '0x7497d12488ee035f5d30ec716bbf41735554e3b1',
        transferProxyAddress: '0xa0929aba843ff1a1af4451e52d26f7dde3d40f82',
        vaultAddress: '0x76aae6f20658f763bd58f5af028f925e7c5319af',
        zeroExExchange: '0x35dd2932454449b14cee11a94d3674a936d5d7b2',
        zeroExErc20Proxy: '0xf1ec01d6236d3cd881a0bf0130ea25fe4234003e',
        setTokenAddress: '0x2c58a14de96b522502857818e4dcc9b07a3993c4',
        wethAddress: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    },
    PUBLIC_ADDRESS: '0x714cd3ce5fd36af3d79e9bd7db6984fa566f4caf',
    NULL_ADDRESS: '0x0000000000000000000000000000000000000000',
    ZERO_AMOUNT: new utils_1.BigNumber(0),
    E18: new utils_1.BigNumber(10).pow(18),
};
//# sourceMappingURL=constants.js.map