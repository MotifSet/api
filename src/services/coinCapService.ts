import * as request from 'superagent';
import * as express from 'express';
const baseUrl = "https://api.coinmarketcap.com/v2/";

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

    async getTokenInfo(req: express.Request, res: express.Response): Promise<void>{
        var token = req.query.symbol;
        var resp;
        var tokenId: number = coinTickerIdMap[token];
        request
            .get(baseUrl + "ticker/" + coinTickerIdMap[token] + "/")
            .set("Accept", "application/json")
            .end(function(error, response){
                if (error || !response.ok){
                    res.status(404).send(JSON.stringify(res, null, 2));

                } else{
                    resp = response.body;
                    var formattedResp = {
                        "symbol": resp["Symbol"],
                        "price": resp["quotes"]["price"]
                    }
                    res.status(200).send(JSON.stringify(formattedResp, null, 2))
                }
            });

    }
}
