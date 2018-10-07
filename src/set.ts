import SetProtocol from 'setprotocol.js';
import * as Web3 from 'web3';
import { BigNumber } from '@0xproject/utils';

// Kovan Config
const config = {
  coreAddress: '0xdd7d1deb82a64af0a6265951895faf48fc78ddfc',
  setTokenFactoryAddress: '0x7497d12488ee035f5d30ec716bbf41735554e3b1',
  transferProxyAddress: '0xa0929aba843ff1a1af4451e52d26f7dde3d40f82',
  vaultAddress: '0x76aae6f20658f763bd58f5af028f925e7c5319af',
  rebalancingSetTokenFactoryAddress: '0xc1be2c0bb387aa13d5019a9c518e8bc93cb53360',
};

const injectedWeb3 = window.web3 || undefined;
let provider;
try {
  // Use MetaMask/Mist provider
  provider = injectedWeb3.currentProvider;
} catch (err) {
  // Throws when user doesn't have MetaMask/Mist running
  throw new Error(`No injected web3 found when initializing setProtocol: ${err}`);
}

const setProtocol = new SetProtocol(provider, config);

const createDEXSet = async function(allocation: BigNumber[], name: string, symbol: string) {
    const sethAddress = '0x4bd91508c38baeea8027a17bc6a27e3869a9671c';
    const shareAddress = '0x46d1e2bfbfb7449d4389acea5403051d3882dc47';
  
    const componentAddresses = [sethAddress, shareAddress];
    const { units, naturalUnit } = await setProtocol.calculateSetUnitsAsync(
      componentAddresses,
      [new BigNumber(0.0001), new BigNumber(1)],   // ZRX and KNC are $0.60 and $0.40, respectively
      allocation,                                   // Allocations passed in
      new BigNumber(10),                           // DEXSet will have a $100 target price
    );
  
    const txOpts = {
      from: '0x4bec3189dc9bb989106c6e770abe1a371a7d219c',
      gas: 4000000,
      gasPrice: 8000000000,
    };
  
    const txHash = await setProtocol.createSetAsync(
      componentAddresses,
      units,
      naturalUnit,
      name,
      symbol,
      txOpts,
    );
    return await setProtocol.getSetAddressFromCreateTxHashAsync(txHash);
  };
  
  // Initial Set is 50/50 allocation of ZRX and KNC


  ; async () =>{
    const initialAllocation = [new BigNumber(0.50), new BigNumber(0.50)];
    const initialSetAddress = await createDEXSet(initialAllocation, 'S&P 500', 'SPY');

    console.log(initialSetAddress)
  }
  
//   const createDynamicDEXSet = async function() {
//     const manager = '0xYourMetaMaskAddress';      // Make yourself the manager!
//     const initialSet = [initialSetAddress];       // Must be an array to conform to create interface
//     const unitShares = [new BigNumber(10**10)];   // Must be an array to conform to create interface
  
//     // Calculate and set proposalPeriod and rebalanceInterval; must be calculated in seconds because
//     // that is the unit of Ethereum timestamps, Though not relevant for this example, there is a
//     // minimum rebalanceInterval and proposalPeriod of one day
//     const ONE_WEEK_IN_SECONDS = 60*60*24*7;
//     const THREE_MONTHS_IN_SECONDS = 60*60*24*30*3; // Assuming 30 days in a month
//     const proposalPeriod = new BigNumber(ONE_WEEK_IN_SECONDS);
//     // In order to rebalance every quarter we must allow for the one week proposal period
//     const rebalanceInterval = new BigNumber(THREE_MONTHS_IN_SECONDS - ONE_WEEK_IN_SECONDS);
  
//     const name = 'S&P 500 Index';
//     const symbol = 'SPY';
//     const txOpts = {
//       from: '0x4bec3189dc9bb989106c6e770abe1a371a7d219c',
//       gas: 4000000,
//       gasPrice: 8000000000,
//     };
  
//     const txHash = await setProtocol.createRebalancingSetTokenAsync(
//       manager,
//       initialSet,
//       unitShares,
//       proposalPeriod,
//       rebalanceInterval,
//       name,
//       symbol,
//       txOpts,
//     );
//     return await setProtocol.getSetAddressFromCreateTxHashAsync(txHash);
//   };
  
//   // Create the dynamic DEX Set
//   const dynamicDEXSetAddress = await createDynamicDEXSet();