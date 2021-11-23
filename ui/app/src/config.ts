import { ChainId, Config } from '@usedapp/core'

export const config: Config = { 
    readOnlyChainId: ChainId.Localhost, 
    // readOnlyUrls: { 
    //     [ChainId.Localhost]: 'http://localhost:4845'
    // },
    supportedChains : [ ChainId.Rinkeby, ChainId.BSCTestnet, ChainId.Localhost ], 
}