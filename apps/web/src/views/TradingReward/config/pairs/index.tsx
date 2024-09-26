import { ChainId } from '@iguanadex/chains'
import { farmsV3 as arbitrumFarm } from '@iguanadex/farms/constants/arb'
import { farmsV3 as baseFarm } from '@iguanadex/farms/constants/base'
import { farmsV3 as bscFarm } from '@iguanadex/farms/constants/bsc'
import { farmsV3 as farm97 } from '@iguanadex/farms/constants/bscTestnet'
import { farmsV3 as ethFarm } from '@iguanadex/farms/constants/eth'
import { farmsV3 as etherlinkFarm } from '@iguanadex/farms/constants/etherlink'
import { farmsV3 as etherlinkTestnetFarm } from '@iguanadex/farms/constants/etherlinkTestnet'
import { farmsV3 as farm5 } from '@iguanadex/farms/constants/goerli'
import { farmsV3 as lineaFarm } from '@iguanadex/farms/constants/linea'
import { farmsV3 as opBNBFarms } from '@iguanadex/farms/constants/opBNB'
import { farmsV3 as opBNBTestnetFarms } from '@iguanadex/farms/constants/opBnbTestnet'
import { farmsV3 as zkEvmFarm } from '@iguanadex/farms/constants/polygonZkEVM'
import { farmsV3 as zkSyncFarm } from '@iguanadex/farms/constants/zkSync'
import { ComputedFarmConfigV3, FarmV3SupportedChainId } from '@iguanadex/farms/src'

// Edge Case Farms
import { tradingRewardBaseV3Pair } from './edgeCasesFarms/baseFarm'
import { tradingRewardBscV3Pair } from './edgeCasesFarms/bscFarm'
import { tradingRewardLineaV3Pair } from './edgeCasesFarms/lineaFarm'
import { tradingRewardZkEvmV3Pair } from './edgeCasesFarms/zkEVMFarm'
import { tradingRewardZkSyncV3Pair } from './edgeCasesFarms/zkSyncFarm'

export const tradingRewardPairConfigChainMap: Record<FarmV3SupportedChainId, ComputedFarmConfigV3[]> = {
  [ChainId.ETHEREUM]: ethFarm,
  [ChainId.GOERLI]: farm5,
  [ChainId.BSC]: [...bscFarm, ...tradingRewardBscV3Pair],
  [ChainId.BSC_TESTNET]: farm97,
  [ChainId.POLYGON_ZKEVM]: [...zkEvmFarm, ...tradingRewardZkEvmV3Pair],
  [ChainId.POLYGON_ZKEVM_TESTNET]: [],
  [ChainId.ZKSYNC]: [...zkSyncFarm, ...tradingRewardZkSyncV3Pair],
  [ChainId.ZKSYNC_TESTNET]: [],
  [ChainId.ARBITRUM_ONE]: arbitrumFarm,
  [ChainId.LINEA]: [...lineaFarm, ...tradingRewardLineaV3Pair],
  [ChainId.BASE]: [...baseFarm, ...tradingRewardBaseV3Pair],
  [ChainId.OPBNB_TESTNET]: opBNBTestnetFarms,
  [ChainId.OPBNB]: opBNBFarms,
  [ChainId.ETHERLINK_TESTNET]: etherlinkTestnetFarm,
  [ChainId.ETHERLINK]: etherlinkFarm,
}
