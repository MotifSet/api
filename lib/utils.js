"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0xproject/utils");
var _ = require("lodash");
function unJSONifyOrder(jsonOrder) {
    return {
        setAddress: jsonOrder.setAddress,
        makerAddress: jsonOrder.makerAddress,
        makerToken: jsonOrder.makerToken,
        relayerAddress: jsonOrder.relayerAddress,
        relayerToken: jsonOrder.relayerToken,
        quantity: new utils_1.BigNumber(jsonOrder.quantity),
        makerTokenAmount: new utils_1.BigNumber(jsonOrder.makerTokenAmount),
        expiration: new utils_1.BigNumber(jsonOrder.expiration),
        makerRelayerFee: new utils_1.BigNumber(jsonOrder.makerRelayerFee),
        takerRelayerFee: new utils_1.BigNumber(jsonOrder.takerRelayerFee),
        salt: new utils_1.BigNumber(jsonOrder.salt),
        requiredComponents: jsonOrder.requiredComponents,
        requiredComponentAmounts: _.map(jsonOrder.requiredComponentAmounts, function (amount) { return new utils_1.BigNumber(amount); }),
        signature: {
            v: new utils_1.BigNumber(jsonOrder.signature.v),
            r: jsonOrder.signature.r,
            s: jsonOrder.signature.s,
        },
    };
}
exports.unJSONifyOrder = unJSONifyOrder;
function bigNumberSum(numbers) {
    var e_1, _a;
    var sum = new utils_1.BigNumber(0);
    try {
        for (var numbers_1 = __values(numbers), numbers_1_1 = numbers_1.next(); !numbers_1_1.done; numbers_1_1 = numbers_1.next()) {
            var n = numbers_1_1.value;
            sum = sum.add(n);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (numbers_1_1 && !numbers_1_1.done && (_a = numbers_1.return)) _a.call(numbers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return sum;
}
exports.bigNumberSum = bigNumberSum;
//# sourceMappingURL=utils.js.map