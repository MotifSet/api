import { Provider } from '@0xproject/subproviders';
import { BigNumber } from '@0xproject/utils';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import wrap = require('express-async-wrap');
import * as _ from 'lodash';
import SetProtocol, { Address } from 'setprotocol.js';

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
        const result = [
            {
                name: 'Stable Set',
                symbol: 'STBL',
                address: '0x2c58a14de96b522502857818e4dcc9b07a3993c4',
                naturalUnits: 10,
                components: [
                    {
                        name: 'Dai',
                        symbol: 'DAI',
                        address: '0x1d82471142F0aeEEc9FC375fC975629056c26ceE',
                        units: 5,
                    },
                    {
                        name: 'TrueUSD',
                        symbol: 'TUSD',
                        address: '0xAdB015D61F4bEb2A712D237D9d4c5B75BAFEfd7B',
                        units: 5,
                    },
                ],
            },
        ];

        res.status(200).send(JSON.stringify(result, null, 2));
    }

    async getAvailableComponents(req: express.Request, res: express.Response): Promise<void> {
        const components: ComponentDetail[] = COMPONENTS;

        res.status(200).send(JSON.stringify(components, null, 2));
    }
}