import { SerializedPool } from '../../types'

export const livePools: SerializedPool[] = []
//   {
//     sousId: 1,
//     stakingToken: etherlinkTokens.wxtz,
//     earningToken: etherlinkTokens.usdc,
//     contractAddress: '0x0E7F3D246d4D376F6096655D6f305adFeDC062aB',
//     poolCategory: PoolCategory.CORE,
//     tokenPerSecond: '0.01',
//     version: 3,
//   },
//   {
//     sousId: 2,
//     stakingToken: etherlinkTokens.weth,
//     earningToken: etherlinkTokens.wxtz,
//     contractAddress: '0x9644e26Ef0Ec0659E453dD8035d6b2A169Eb65aa',
//     poolCategory: PoolCategory.CORE,
//     tokenPerSecond: '0.01',
//     version: 3,
//   },
//   {
//     sousId: 3,
//     stakingToken: etherlinkTokens.wbtc,
//     earningToken: etherlinkTokens.wxtz,
//     contractAddress: '0x7fE6e89EAFA7DE640445aD5Ae170930CB502749B',
//     poolCategory: PoolCategory.CORE,
//     tokenPerSecond: '0.01',
//     version: 3,
//   },
//   {
//     sousId: 4,
//     stakingToken: etherlinkTokens.usdt,
//     earningToken: etherlinkTokens.usdc,
//     contractAddress: '0x09528f03C9D23500c15a852aCc537E0316392331',
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
