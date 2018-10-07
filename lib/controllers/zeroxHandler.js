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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var constants_1 = require("../utils/constants");
var utils_1 = require("../utils");
var components_1 = require("../utils/components");
var PUBLIC_ADDRESS = constants_1.constants.PUBLIC_ADDRESS;
var ZeroXHandler = /** @class */ (function () {
    function ZeroXHandler() {
        // pass
    }
    ZeroXHandler.prototype.getOrderParams = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, addr, quantity, setDetails, components, naturalUnit, ZERO_AMOUNT, E18, totalWeth, totalUSD, unitUSD, unitWeth, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, addr = _a.addr, quantity = _a.quantity;
                        return [4 /*yield*/, this.setProtocol.setToken.getDetails(setAddress)];
                    case 1:
                        setDetails = _b.sent();
                        components = setDetails.components, naturalUnit = setDetails.naturalUnit;
                        ZERO_AMOUNT = constants_1.constants.ZERO_AMOUNT, E18 = constants_1.constants.E18;
                        totalWeth = ZERO_AMOUNT;
                        totalUSD = ZERO_AMOUNT;
                        unitUSD = ZERO_AMOUNT;
                        unitWeth = ZERO_AMOUNT;
                        _.each(components, function (component) {
                            var componentAddress = component.address;
                            var componentUnit = component.unit;
                            var supportedComponent = _.find(components_1.COMPONENTS, ["address", componentAddress]);
                            if (!supportedComponent) {
                                throw new Error("Component " + componentAddress + " is not a supported component");
                            }
                            var componentCostsInEth = componentUnit.mul(quantity).div(naturalUnit).mul(supportedComponent.price_eth);
                            var componentCostsInUSD = componentUnit.mul(quantity).div(naturalUnit).mul(supportedComponent.price_usd);
                            var unitCostInEth = componentUnit.div(naturalUnit).mul(supportedComponent.price_eth);
                            var unitCostInUSD = componentUnit.div(naturalUnit).mul(supportedComponent.price_usd);
                            totalWeth = totalWeth.add(componentCostsInEth);
                            totalUSD = totalUSD.add(componentCostsInUSD);
                            unitWeth = unitWeth.add(unitCostInEth);
                            unitUSD = unitUSD.add(unitCostInUSD);
                        });
                        result = {
                            cost_weth: totalWeth.toString(),
                            cost_usd: totalUSD.toString(),
                            unit_weth: unitWeth.toString(),
                            unit_usd: unitUSD.toString(),
                        };
                        res.status(200).send(JSON.stringify(result, null, 2));
                        return [2 /*return*/];
                }
            });
        });
    };
    ZeroXHandler.prototype.matchZeroXOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var issuanceOrder, signature, order, takerWalletOrders, txHash, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        issuanceOrder = utils_1.unJSONifyOrder(req.body.issuance_order);
                        signature = issuanceOrder.signature, order = __rest(issuanceOrder, ["signature"]);
                        console.log("Received a market order", JSON.stringify(issuanceOrder));
                        // Ensure allowances and balances for required tokens
                        return [4 /*yield*/, this.ensureAllowanceAndBalances(issuanceOrder)];
                    case 1:
                        // Ensure allowances and balances for required tokens
                        _a.sent();
                        // Is Valid Signature
                        return [4 /*yield*/, this.setProtocol.orders.isValidSignatureOrThrowAsync(order, signature)];
                    case 2:
                        // Is Valid Signature
                        _a.sent();
                        takerWalletOrders = this.takerWalletService.generateTakerWalletOrders(issuanceOrder);
                        console.log("Taker wallet orders", JSON.stringify(takerWalletOrders));
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.setProtocol.orders.fillOrderAsync(issuanceOrder, issuanceOrder.quantity, takerWalletOrders, { from: PUBLIC_ADDRESS })];
                    case 4:
                        txHash = _a.sent();
                        console.log("Order fill successful?", txHash);
                        result = {
                            txHash: txHash,
                        };
                        res.status(200).send(JSON.stringify(result, null, 2));
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        console.log("Error", error_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ZeroXHandler.prototype.ensureAllowanceAndBalances = function (issuanceOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var requiredComponents, requiredComponentAmounts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requiredComponents = issuanceOrder.requiredComponents, requiredComponentAmounts = issuanceOrder.requiredComponentAmounts;
                        console.log("Checking allowances and balances");
                        return [4 /*yield*/, Promise.all(requiredComponents.map(function (tokenAddress, i) { return __awaiter(_this, void 0, void 0, function () {
                                var requiredTokenAmount, ownerBalance, ownerAllowance, ownerAllowanceZeroExProxy;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            requiredTokenAmount = requiredComponentAmounts[i];
                                            return [4 /*yield*/, this.setProtocol.erc20.getBalanceOfAsync(tokenAddress, PUBLIC_ADDRESS)];
                                        case 1:
                                            ownerBalance = _a.sent();
                                            if (ownerBalance.lt(requiredTokenAmount)) {
                                                throw new Error("Owner does not have enough balance of " + tokenAddress.toString());
                                            }
                                            console.log("Owner: " + PUBLIC_ADDRESS + " balance of token " + tokenAddress + " of " + ownerBalance.toString());
                                            return [4 /*yield*/, this.setProtocol.erc20.getAllowanceAsync(tokenAddress, PUBLIC_ADDRESS, constants_1.constants.SET_KOVAN_ADDRESSES.transferProxyAddress)];
                                        case 2:
                                            ownerAllowance = _a.sent();
                                            if (!ownerAllowance.lt(requiredTokenAmount)) return [3 /*break*/, 4];
                                            console.log("Setting allowances to Transfer Proxy for token: " + tokenAddress);
                                            return [4 /*yield*/, this.setProtocol.setUnlimitedTransferProxyAllowanceAsync(tokenAddress, { from: PUBLIC_ADDRESS })];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [4 /*yield*/, this.setProtocol.erc20.getAllowanceAsync(tokenAddress, PUBLIC_ADDRESS, constants_1.constants.SET_KOVAN_ADDRESSES.zeroExErc20Proxy)];
                                        case 5:
                                            ownerAllowanceZeroExProxy = _a.sent();
                                            if (!ownerAllowanceZeroExProxy.lt(requiredTokenAmount)) return [3 /*break*/, 7];
                                            console.log("Setting allowances to Zero Ex ERC20 Proxy for token: " + tokenAddress + ". \n                        Current amount is " + ownerAllowanceZeroExProxy);
                                            return [4 /*yield*/, this.setProtocol.erc20.approveAsync(tokenAddress, constants_1.constants.SET_KOVAN_ADDRESSES.zeroExErc20Proxy, requiredTokenAmount.mul(10000000000000), { from: PUBLIC_ADDRESS })];
                                        case 6:
                                            _a.sent();
                                            _a.label = 7;
                                        case 7:
                                            console.log("Owner: " + PUBLIC_ADDRESS + " allowance of token " + tokenAddress + " of " + ownerAllowance.toString());
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ZeroXHandler;
}());
exports.ZeroXHandler = ZeroXHandler;
//# sourceMappingURL=zeroxHandler.js.map