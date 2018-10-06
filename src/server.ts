import { PrivateKeyWalletSubprovider, Provider, RPCSubprovider, Web3ProviderEngine } from '@0xproject/subproviders';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import wrap = require('express-async-wrap');
import * as _ from 'lodash';
import SetProtocol from 'setprotocol.js';

import { constants } from './utils/constants';
import { OrderHandler } from './controllers/orderHandler';
import { SetsHandler } from './controllers/setsHandler';
import { CoinCapService} from './services/coinCapService';

const { PUBLIC_ADDRESS } = constants;

const providerEngine = new Web3ProviderEngine();
const privateKey = process.env.PRIVATE_KEY as string;

const infura_apikey = process.env.INFURAKEY;
const KOVAN_RPC_URL = 'https://kovan.infura.io/' + infura_apikey;
const pkSubprovider = new PrivateKeyWalletSubprovider(privateKey);
const rpcSubprovider = new RPCSubprovider(KOVAN_RPC_URL);
providerEngine.addProvider(pkSubprovider);
providerEngine.addProvider(rpcSubprovider);
providerEngine.start();

const setProtocol = new SetProtocol(providerEngine, {
    coreAddress: constants.SET_KOVAN_ADDRESSES.coreAddress,
    setTokenFactoryAddress: constants.SET_KOVAN_ADDRESSES.setTokenFactoryAddress,
    transferProxyAddress: constants.SET_KOVAN_ADDRESSES.transferProxyAddress,
    vaultAddress: constants.SET_KOVAN_ADDRESSES.vaultAddress,
});

const orderHandler = new OrderHandler(setProtocol, providerEngine);
const setsHandler = new SetsHandler(setProtocol, providerEngine);
const coinCap = new CoinCapService;

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/ping', (req: express.Request, res: express.Response) => {
    res.status(200).send('pong');
});

app.get('/sets', (req, res) => setsHandler.getSets(req, res));
app.get('/components', (req, res) => setsHandler.getAvailableComponents(req, res));
app.get('/services', (req, res) => coinCap.getStockChart(req,res));
app.get('/stockQuote', (req, res) => coinCap.getStockQuote(req, res));
// Order Related Endpoints
app.get('/quote', (req, res) => orderHandler.getQuote(req, res));
app.post('/market_order', (req, res) => orderHandler.postMarketOrder(req, res));

const DEFAULT_PORT = 7999;
const port = process.env.PORT || DEFAULT_PORT;
console.log(`Listening on port ${port} for new requests`);
app.listen(port);
