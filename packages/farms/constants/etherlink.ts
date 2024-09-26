import { etherlinkTokens } from '@iguanadex/tokens'
import { FeeAmount } from '@iguanadex/v3-sdk'
import { SerializedFarmConfig } from '..'
import { defineFarmV3Configs } from '../src/defineFarmV3Configs'

export const farmsV3 = defineFarmV3Configs([
  {
    pid: 1,
    lpAddress: '0x99e4913D8e7DEa6DA9839FEC75a5652dF80FDaFD',
    token0: etherlinkTokens.wxtz,
    token1: etherlinkTokens.usdc,
    feeAmount: FeeAmount.MEDIUM,
  },
])

const farms: SerializedFarmConfig[] = []

export default farms
