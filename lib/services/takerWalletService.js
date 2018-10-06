"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var constants_1 = require("../utils/constants");
var PUBLIC_ADDRESS = constants_1.constants.PUBLIC_ADDRESS, SET_KOVAN_ADDRESSES = constants_1.constants.SET_KOVAN_ADDRESSES;
var TakerWalletService = /** @class */ (function () {
    function TakerWalletService(provider) {
        this._provider = provider;
    }
    // Generate taker wallet orders, assuming complete fill
    TakerWalletService.prototype.generateTakerWalletOrders = function (issuanceOrder) {
        var requiredComponents = issuanceOrder.requiredComponents, requiredComponentAmounts = issuanceOrder.requiredComponentAmounts;
        var result = [];
        _.each(requiredComponents, function (requiredComponent, i) {
            result.push({
                takerTokenAddress: requiredComponent,
                takerTokenAmount: requiredComponentAmounts[i],
            });
        });
        return result;
    };
    return TakerWalletService;
}());
exports.TakerWalletService = TakerWalletService;
//# sourceMappingURL=takerWalletService.js.map