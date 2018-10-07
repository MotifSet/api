"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SETS = [
    {
        name: 'S&P 500 Index',
        symbol: 'SPY',
        address: '0x2c58a14de96b522502857818e4dcc9b07a3993c4',
        naturalUnits: 10,
        price: Math.random() * 10 + 10,
        components: [
            {
                name: 'S&P 500',
                symbol: 'aSPY',
                address: '0x1d82471142F0aeEEc9FC375fC975629056c26ceE',
                units: 5,
            },
            {
                name: 'Short Eth',
                symbol: 'sEth',
                address: '0xAdB015D61F4bEb2A712D237D9d4c5B75BAFEfd7B',
                units: 5,
            },
        ],
    },
    {
        name: 'Gold',
        symbol: 'GLD',
        address: '0x2c58a14de96b522502857818e4dcc9b07a3993c4',
        naturalUnits: 10,
        price: Math.random() * 10 + 10,
        components: [
            {
                name: 'Gold',
                symbol: 'aGLD',
                address: '0x1d82471142F0aeEEc9FC375fC975629056c26ceE',
                units: 5,
            },
            {
                name: 'Short Eth',
                symbol: 'sETH',
                address: '0xAdB015D61F4bEb2A712D237D9d4c5B75BAFEfd7B',
                units: 5,
            },
        ],
    },
    {
        name: 'FANG+ Index',
        symbol: 'FANG',
        address: '0x2c58a14de96b522502857818e4dcc9b07a3993c4',
        naturalUnits: 10,
        price: Math.random() * 10 + 10,
        components: [
            {
                name: 'FANG+',
                symbol: 'aFANG',
                address: '0x1d82471142F0aeEEc9FC375fC975629056c26ceE',
                units: 5,
            },
            {
                name: 'Short Eth',
                symbol: 'sETH',
                address: '0xAdB015D61F4bEb2A712D237D9d4c5B75BAFEfd7B',
                units: 5,
            },
        ],
    },
    {
        name: 'Biotechnology',
        symbol: 'IBB',
        address: '0x2c58a14de96b522502857818e4dcc9b07a3993c4',
        naturalUnits: 10,
        price: Math.random() * 10 + 10,
        components: [
            {
                name: 'Biotechnology',
                symbol: 'aIBB',
                address: '0x1d82471142F0aeEEc9FC375fC975629056c26ceE',
                units: 5,
            },
            {
                name: 'Short Eth',
                symbol: 'sETH',
                address: '0xAdB015D61F4bEb2A712D237D9d4c5B75BAFEfd7B',
                units: 5,
            },
        ],
    },
    {
        name: 'US Real Estate',
        symbol: 'VNQ',
        address: '0x2c58a14de96b522502857818e4dcc9b07a3993c4',
        naturalUnits: 10,
        price: Math.random() * 10 + 10,
        components: [
            {
                name: 'US Real Estate',
                symbol: 'aVNQ',
                address: '0x1d82471142F0aeEEc9FC375fC975629056c26ceE',
                units: 5,
            },
            {
                name: 'Short Eth',
                symbol: 'sETH',
                address: '0xAdB015D61F4bEb2A712D237D9d4c5B75BAFEfd7B',
                units: 5
            },
        ],
    }
];
//# sourceMappingURL=sets.js.map