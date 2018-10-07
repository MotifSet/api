import * as express from 'express';
import wrap = require('express-async-wrap');
import * as _ from 'lodash';

import { SETS } from '../utils/sets';

export class SetsHandler {

    async getSets(req: express.Request, res: express.Response): Promise<void> {
        console.log(SETS);
        
        res.status(200).send(JSON.stringify(SETS, null, 2));
    }
}