import * as request from 'superagent';
import * as express from 'express';
const baseUrl = "https://api.iextrading.com/1.0";

var coinTickerIdMap: {[symbol: string]: number} = {
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

export class CoinCapService {

    async getStockChart(req: express.Request, res: express.Response): Promise<void>{
        let ticker: string = req.query.symbol;
        if (ticker === undefined) {
            res.status(404).send("Must query with a ticker");
            return;
        }
        var resp;
        request
            .get(baseUrl + "/stock/" + ticker.toLowerCase() + "/chart/1m")
            .set("Accept", "application/json")
            .end(function(error, response){
                if (error || !response.ok){
                    res.status(404).send(JSON.stringify(error, null, 2));

                } else{
                    resp = response.body;
                    let len: number = resp.length;
                    for (var i = 0; i <= len; i++){
                        if (resp[i] != null){
                        var cur = resp[i];
                        var high = resp[i].high;
                        var low = resp[i].low;
                        var avg = (high + low)/2;
                        var date = resp[i].date;
                        resp[i] = {
                            "date": date,
                            "price": avg
                        }
                    }
                    }
                    res.status(200).send(JSON.stringify(resp, null, 2))
                }
            });

    }

    async getStockQuote(req: express.Request, res: express.Response): Promise<void>{
        let ticker: string = req.query.symbol;
        var resp;
        request
            .get(baseUrl + "/stock/" + ticker.toLowerCase() + "/delayed-quote")
            .set("Accept", "application/json")
            .end(function(error, response){
                if (error || !response.ok){
                    res.status(404).send(JSON.stringify(error, null, 2));

                } else{
                    resp = response.body;
                    var newResp = {
                        "price": resp.delayedPrice
                    }
                    res.status(200).send(JSON.stringify(newResp, null, 2))
                }
            });

    }
    
}
