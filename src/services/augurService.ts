import Augur from 'augur.js';
import * as express from 'express';

export interface AugurConn {
    markets: any,
    connect: any
    //connect: (params: object, cb: (err: object, connectionInfo: object) => void) => void;
}

interface AugurNode{
    uri: string
}

interface ConnectionParams{
    params: object
}


export class AugurConnection{

    public augur: AugurConn;
    universeId: string = '0xe0fb73227c37051611c3edc091d6858f2a230ffe';
    constructor(){
        let ethereumNode = {
            httpAddresses: [
              "http://127.0.0.1:8545", 
              "https://kovan.augur.net/ethereum-http"
            ],
            wsAddresses: [
              "ws://127.0.0.1:8546", 
              "wss://kovan.augur.net/ethereum-ws" 
            ]
    
          };  
        let augurNode = "ws://127.0.0.1:9001";
        this.augur = new Augur();
        this.augur.connect({ ethereumNode, augurNode }, (err: object, connectionInfo: object) => {
            if (err != null){
                console.log("Connected");
            }
          });
    }

    async getCategoryData(req: express.Request, res: express.Response): Promise<void>{
        this.augur.markets.getCategories({
            universe: this.universeId,
            sortBy: "popularity",
            isSortDescending: true
        }, function (error: object, result: object){
            res.status(200).send(JSON.stringify(result, null, 2))
        });
    }

    async getMarketData(req: express.Request, res: express.Response): Promise<void>{
        let marketId = req.query.marketId;
        this.augur.markets.getMarketsInfo({
            marketIds: [marketId]
        }, function (error: object, result: Array<any>){
            if (error != null || result == null){
                res.status(404).send(JSON.stringify(result, null, 2));
            }
            else {
            result = result[0].outComes;
            res.status(200).send(JSON.stringify(result, null, 2));
            }
        });
    }

//Example Market
//0x7ff5587568854bebe22fc75d663dacd4b6aaceb9
}