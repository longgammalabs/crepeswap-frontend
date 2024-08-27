import { SerializedPool } from '../../types'

// known finished pools
export const livePools: SerializedPool[] = []

// export const livePools: SerializedPool[] = [
//   {
//     sousId: 1,
//     stakingToken: etherlinkTestnetTokens.wxtz,
//     earningToken: etherlinkTestnetTokens.usdc,
//     contractAddress: '0xcAB9D88386b38D6bE216113350dEa4B65Ab8c33B',
//     poolCategory: PoolCategory.CORE,
//     tokenPerSecond: '0.01',
//     version: 3,
//   },
// ].map((p) => ({
//   ...p,
//   contractAddress: getAddress(p.contractAddress),
//   stakingToken: p.stakingToken.serialize,
//   earningToken: p.earningToken.serialize,
// }))

// known finished pools
export const finishedPools: SerializedPool[] = []

export const pools: SerializedPool[] = [...livePools, ...finishedPools]
