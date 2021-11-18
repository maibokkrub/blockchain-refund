import { ChainId } from '@usedapp/core'

export const config = { 
    readOnlyChainId: ChainId.Rinkeby, 
    // readOnlyUrls: { 
    //     [ChainId.Rinkeby]: 
    // },
    supportedChains : [ ChainId.Rinkeby, ChainId.BSCTestnet ], 
}