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
var augur_js_1 = require("augur.js");
var AugurConnection = /** @class */ (function () {
    function AugurConnection() {
        this.universeId = '0xe0fb73227c37051611c3edc091d6858f2a230ffe';
        var ethereumNode = {
            httpAddresses: [
                "http://127.0.0.1:8545",
                "https://kovan.augur.net/ethereum-http"
            ],
            wsAddresses: [
                "ws://127.0.0.1:8546",
                "wss://kovan.augur.net/ethereum-ws"
            ]
        };
        var augurNode = "ws://127.0.0.1:9001";
        this.augur = new augur_js_1.default();
        this.augur.connect({ ethereumNode: ethereumNode, augurNode: augurNode }, function (err, connectionInfo) {
            if (err != null) {
                console.log("Connected");
            }
        });
    }
    AugurConnection.prototype.getCategoryData = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.augur.markets.getCategories({
                    universe: this.universeId,
                    sortBy: "popularity",
                    isSortDescending: true
                }, function (error, result) {
                    res.status(200).send(JSON.stringify(result, null, 2));
                });
                return [2 /*return*/];
            });
        });
    };
    AugurConnection.prototype.getMarketData = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var marketId;
            return __generator(this, function (_a) {
                marketId = req.query.marketId;
                this.augur.markets.getMarketsInfo({
                    marketIds: [marketId]
                }, function (error, result) {
                    if (error != null || result == null) {
                        res.status(404).send(JSON.stringify(result, null, 2));
                    }
                    else {
                        var out = result[0].outcomes;
                        res.status(200).send(JSON.stringify(out, null, 2));
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return AugurConnection;
}());
exports.AugurConnection = AugurConnection;
//# sourceMappingURL=augurService.js.map