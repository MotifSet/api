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
Object.defineProperty(exports, "__esModule", { value: true });
var _0x_js_1 = require("0x.js");
var _0x_js_2 = require("0x.js");
var web3_wrapper_1 = require("@0xproject/web3-wrapper");
var config_1 = require("../utils/config");
var constants_1 = require("../utils/constants");
var PUBLIC_ADDRESS = constants_1.constants.PUBLIC_ADDRESS;
var ZeroXHandler = /** @class */ (function () {
    function ZeroXHandler() {
        this.providerEngine = new _0x_js_2.Web3ProviderEngine();
        this.providerEngine.addProvider(config_1.config.NODE_URI);
        this.providerEngine.start();
        // Instantiate ContractWrappers with the provider
        this.contractWrappers = new _0x_js_1.ContractWrappers(this.providerEngine, { networkId: config_1.config.NETWORK_ID });
        this.web3Wrapper = new web3_wrapper_1.Web3Wrapper(this.providerEngine);
    }
    ZeroXHandler.prototype.getOrderParams = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, setTokenAddress, quantity, userAddress, randomExpiration, exchangeAddress, order;
            return __generator(this, function (_b) {
                _a = req.query, setTokenAddress = _a.setTokenAddress, quantity = _a.quantity, userAddress = _a.userAddress;
                randomExpiration = getRandomFutureDateInSeconds();
                exchangeAddress = this.contractWrappers.exchange.getContractAddress();
                order = {
                    exchangeAddress: exchangeAddress,
                    makerAddress: userAddress,
                    takerAddress: NULL_ADDRESS,
                    senderAddress: NULL_ADDRESS,
                    feeRecipientAddress: NULL_ADDRESS,
                    expirationTimeSeconds: randomExpiration,
                    salt: _0x_js_1.generatePseudoRandomSalt(),
                    makerAssetAmount: makerAssetAmount,
                    takerAssetAmount: takerAssetAmount,
                    makerAssetData: makerAssetData,
                    takerAssetData: takerAssetData,
                    makerFee: ZERO,
                    takerFee: ZERO,
                };
                res.status(200).send(JSON.stringify(order, null, 2));
                return [2 /*return*/];
            });
        });
    };
    ZeroXHandler.prototype.matchZeroXOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, txHash;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = void 0;
                        return [4 /*yield*/, contractWrappers.exchange.fillOrderAsync(signedOrder, takerAssetAmount, taker, {
                                gasLimit: TX_DEFAULTS.gas,
                            })];
                    case 1:
                        txHash = _b.sent();
                        return [4 /*yield*/, web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ZeroXHandler;
}());
exports.ZeroXHandler = ZeroXHandler;
//# sourceMappingURL=zeroxHandler.js.map