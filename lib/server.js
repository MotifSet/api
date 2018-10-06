"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subproviders_1 = require("@0xproject/subproviders");
var bodyParser = require("body-parser");
var express = require("express");
var setprotocol_js_1 = require("setprotocol.js");
var constants_1 = require("./utils/constants");
var orderHandler_1 = require("./controllers/orderHandler");
var setsHandler_1 = require("./controllers/setsHandler");
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
var setProtocol = new setprotocol_js_1.default(providerEngine, {
    coreAddress: constants_1.constants.SET_KOVAN_ADDRESSES.coreAddress,
    setTokenFactoryAddress: constants_1.constants.SET_KOVAN_ADDRESSES.setTokenFactoryAddress,
    transferProxyAddress: constants_1.constants.SET_KOVAN_ADDRESSES.transferProxyAddress,
    vaultAddress: constants_1.constants.SET_KOVAN_ADDRESSES.vaultAddress,
});
var orderHandler = new orderHandler_1.OrderHandler(setProtocol, providerEngine);
var setsHandler = new setsHandler_1.SetsHandler(setProtocol, providerEngine);
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
app.get('/components', function (req, res) { return setsHandler.getAvailableComponents(req, res); });
app.get('/services', function (req, res) { return coinCap.getStockChart(req, res); });
app.get('/stockQuote', function (req, res) { return coinCap.getStockQuote(req, res); });
// Order Related Endpoints
app.get('/quote', function (req, res) { return orderHandler.getQuote(req, res); });
app.post('/market_order', function (req, res) { return orderHandler.postMarketOrder(req, res); });
var DEFAULT_PORT = 8000;
var port = process.env.PORT || DEFAULT_PORT;
console.log("Listening on port " + port + " for new requests");
app.listen(port);
//# sourceMappingURL=server.js.map