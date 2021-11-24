import { ChainId, Config } from '@usedapp/core';

export const config: Config = {
    readOnlyUrls: { [ChainId.Mainnet]: "https://mainnet.infura.io/v3/3165a249c65f4198bf57200109b8fadf" },
    readOnlyChainId: ChainId.Mainnet,
};

export const MAIN_CONTRACT_ADDRESS: string = `0x5FbDB2315678afecb367f032d93F642f64180aa3`;