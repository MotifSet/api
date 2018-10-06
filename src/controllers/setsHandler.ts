import { Provider } from '@0xproject/subproviders';
import wrap = require('express-async-wrap');
import SetProtocol, { Address } from 'setprotocol.js';

import { SETS } from '../utils/sets';
import { constants } from '../utils/constants';
import { COMPONENTS } from '../utils/components';

const { PUBLIC_ADDRESS } = constants;

export interface ComponentDetail {
    name: string;
    symbol: string;
    address: Address;
    decimals: number;
    price_usd: string;
};

export class SetsHandler {
    private setProtocol: SetProtocol;
    private provider: Provider;

    constructor(setProtocol: SetProtocol, provider: Provider) {
        this.setProtocol = setProtocol;
        this.provider = provider;
    }

    async getSets(req: express.Request, res: express.Response): Promise<void> {

        res.status(200).send(JSON.stringify(SETS, null, 2));
    }

    async getAvailableComponents(req: express.Request, res: express.Response): Promise<void> {
        const components: ComponentDetail[] = COMPONENTS;

        res.status(200).send(JSON.stringify(components, null, 2));
    }
}