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
var request = require("superagent");
var baseUrl = "https://api.iextrading.com/1.0";
var coinTickerIdMap = {
    "ICX": 2099,
    "ZRX": 1896,
    "ZIL": 2469,
    "AE": 1700,
    "BAT": 1697,
    "REP": 1104,
    "SNT": 1759,
    "PPT": 1789,
    "LOOM": 2588,
    "VET": 3077,
    "DAI": 2308
};
var CoinCapService = /** @class */ (function () {
    function CoinCapService() {
    }
    CoinCapService.prototype.getStockChart = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ticker, resp;
            return __generator(this, function (_a) {
                ticker = req.query.symbol;
                if (ticker === undefined) {
                    res.status(404).send("Must query with a ticker");
                    return [2 /*return*/];
                }
                request
                    .get(baseUrl + "/stock/" + ticker.toLowerCase() + "/chart/1m")
                    .set("Accept", "application/json")
                    .end(function (error, response) {
                    if (error || !response.ok) {
                        res.status(404).send(JSON.stringify(error, null, 2));
                    }
                    else {
                        resp = response.body;
                        var len = resp.length;
                        for (var i = 0; i <= len; i++) {
                            if (resp[i] != null) {
                                var cur = resp[i];
                                var high = resp[i].high;
                                var low = resp[i].low;
                                var avg = (high + low) / 2;
                                var date = resp[i].date;
                                resp[i] = {
                                    "date": date,
                                    "price": avg
                                };
                            }
                        }
                        res.status(200).send(JSON.stringify(resp, null, 2));
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    CoinCapService.prototype.getStockQuote = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ticker, resp;
            return __generator(this, function (_a) {
                ticker = req.query.symbol;
                request
                    .get(baseUrl + "/stock/" + ticker.toLowerCase() + "/delayed-quote")
                    .set("Accept", "application/json")
                    .end(function (error, response) {
                    if (error || !response.ok) {
                        res.status(404).send(JSON.stringify(error, null, 2));
                    }
                    else {
                        resp = response.body;
                        var newResp = {
                            "price": resp.delayedPrice
                        };
                        res.status(200).send(JSON.stringify(newResp, null, 2));
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return CoinCapService;
}());
exports.CoinCapService = CoinCapService;
//# sourceMappingURL=coinCapService.js.map