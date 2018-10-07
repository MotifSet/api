"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subproviders_1 = require("@0xproject/subproviders");
var bodyParser = require("body-parser");
var express = require("express");
var constants_1 = require("./utils/constants");
var setsHandler_1 = require("./controllers/setsHandler");
var zeroxHandler_1 = require("./controllers/zeroxHandler");
var coinCapService_1 = require("./services/coinCapService");
var PUBLIC_ADDRESS = constants_1.constants.PUBLIC_ADDRESS;
var providerEngine = new subproviders_1.Web3ProviderEngine();
var privateKey = process.env.PRIVATE_KEY;
var infura_apikey = process.env.INFURAKEY;
var KOVAN_RPC_URL = 'https://kovan.infura.io/' + infura_apikey;
var pkSubprovider = new subproviders_1.PrivateKeyWalletSubprovider(privateKey);
var rpcSubprovider = new subproviders_1.RPCSubprovider(KOVAN_RPC_URL);
providerEngine.addProvider(pkSubprovider);
providerEngine.addProvider(rpcSubprovider);
providerEngine.start();
var setsHandler = new setsHandler_1.SetsHandler();
var zrxHandler = new zeroxHandler_1.ZeroXHandler();
var coinCap = new coinCapService_1.CoinCapService;
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/ping', function (req, res) {
    res.status(200).send('pong');
});
app.get('/sets', function (req, res) { return setsHandler.getSets(req, res); });
app.get('/services', function (req, res) { return coinCap.getStockChart(req, res); });
app.get('/stockQuote', function (req, res) { return coinCap.getStockQuote(req, res); });
// Order Related Endpoints
app.post('/broadcast', function (req, res) { return zrxHandler.matchZeroXOrder(req, res); });
var DEFAULT_PORT = 8000;
var port = process.env.PORT || DEFAULT_PORT;
console.log("Listening on port " + port + " for new requests");
app.listen(port);
//# sourceMappingURL=server.js.map