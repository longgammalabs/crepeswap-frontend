import { etherlinkTestnetTokens } from '@iguanadex/tokens'
import { FeeAmount } from '@iguanadex/v3-sdk'
import { SerializedFarmConfig } from '..'
import { defineFarmV3Configs } from '../src/defineFarmV3Configs'

export const farmsV3 = defineFarmV3Configs([
  {
    pid: 1,
    lpAddress: '0x0E7F3D246d4D376F6096655D6f305adFeDC062aB',
    token0: etherlinkTestnetTokens.wxtz,
    token1: etherlinkTestnetTokens.usdc,
    feeAmount: FeeAmount.MEDIUM,
  },
])

const farms: SerializedFarmConfig[] = []

export default farms
