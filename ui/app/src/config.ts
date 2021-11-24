import { ChainId, Config } from '@usedapp/core'

export const config: Config = { 
    readOnlyChainId: ChainId.Localhost,
    multicallAddresses: '',
    supportedChains : [ ChainId.Localhost ], 
}

export const MAIN_CONTRACT_ADDRESS: string = `0x5FbDB2315678afecb367f032d93F642f64180aa3`;