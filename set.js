"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var setprotocol_js_1 = require("setprotocol.js");
// Kovan Config
var config = {
    coreAddress: '0xdd7d1deb82a64af0a6265951895faf48fc78ddfc',
    setTokenFactoryAddress: '0x7497d12488ee035f5d30ec716bbf41735554e3b1',
    transferProxyAddress: '0xa0929aba843ff1a1af4451e52d26f7dde3d40f82',
    vaultAddress: '0x76aae6f20658f763bd58f5af028f925e7c5319af',
    rebalancingSetTokenFactoryAddress: '0xc1be2c0bb387aa13d5019a9c518e8bc93cb53360'
};
var injectedWeb3 = window.web3 || undefined;
var provider;
try {
    // Use MetaMask/Mist provider
    provider = injectedWeb3.currentProvider;
}
catch (err) {
    // Throws when user doesn't have MetaMask/Mist running
    throw new Error("No injected web3 found when initializing setProtocol: " + err);
}
var setProtocol = new setprotocol_js_1["default"](provider, config);
var createDEXSet = function (allocation, name, symbol) {
    return __awaiter(this, void 0, void 0, function () {
        var sethAddress, shareAddress, componentAddresses, _a, units, naturalUnit, txOpts, txHash;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sethAddress = '0x4bd91508c38baeea8027a17bc6a27e3869a9671c';
                    shareAddress = '0x46d1e2bfbfb7449d4389acea5403051d3882dc47';
                    componentAddresses = [sethAddress, shareAddress];
                    return [4 /*yield*/, setProtocol.calculateSetUnitsAsync(componentAddresses, [new BigNumber(0.0001), new BigNumber(1)], // ZRX and KNC are $0.60 and $0.40, respectively
                        allocation, // Allocations passed in
                        new BigNumber(10))];
                case 1:
                    _a = _b.sent(), units = _a.units, naturalUnit = _a.naturalUnit;
                    txOpts = {
                        from: '0x4bec3189dc9bb989106c6e770abe1a371a7d219c',
                        gas: 4000000,
                        gasPrice: 8000000000
                    };
                    return [4 /*yield*/, setProtocol.createSetAsync(componentAddresses, units, naturalUnit, name, symbol, txOpts)];
                case 2:
                    txHash = _b.sent();
                    return [4 /*yield*/, setProtocol.getSetAddressFromCreateTxHashAsync(txHash)];
                case 3: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
// Initial Set is 50/50 allocation of ZRX and KNC
var initialAllocation = [new BigNumber(0.50), new BigNumber(0.50)];
var initialSetAddress = yield createDEXSet(initialAllocation, 'S&P 500', 'SPY');
//   const createDynamicDEXSet = async function() {
//     const manager = '0xYourMetaMaskAddress';      // Make yourself the manager!
//     const initialSet = [initialSetAddress];       // Must be an array to conform to create interface
//     const unitShares = [new BigNumber(10**10)];   // Must be an array to conform to create interface
//     // Calculate and set proposalPeriod and rebalanceInterval; must be calculated in seconds because
//     // that is the unit of Ethereum timestamps, Though not relevant for this example, there is a
//     // minimum rebalanceInterval and proposalPeriod of one day
//     const ONE_WEEK_IN_SECONDS = 60*60*24*7;
//     const THREE_MONTHS_IN_SECONDS = 60*60*24*30*3; // Assuming 30 days in a month
//     const proposalPeriod = new BigNumber(ONE_WEEK_IN_SECONDS);
//     // In order to rebalance every quarter we must allow for the one week proposal period
//     const rebalanceInterval = new BigNumber(THREE_MONTHS_IN_SECONDS - ONE_WEEK_IN_SECONDS);
//     const name = 'S&P 500 Index';
//     const symbol = 'SPY';
//     const txOpts = {
//       from: '0x4bec3189dc9bb989106c6e770abe1a371a7d219c',
//       gas: 4000000,
//       gasPrice: 8000000000,
//     };
//     const txHash = await setProtocol.createRebalancingSetTokenAsync(
//       manager,
//       initialSet,
//       unitShares,
//       proposalPeriod,
//       rebalanceInterval,
//       name,
//       symbol,
//       txOpts,
//     );
//     return await setProtocol.getSetAddressFromCreateTxHashAsync(txHash);
//   };
//   // Create the dynamic DEX Set
//   const dynamicDEXSetAddress = await createDynamicDEXSet();
