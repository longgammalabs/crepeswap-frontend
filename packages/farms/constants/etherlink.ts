import { etherlinkTokens } from '@pancakeswap/tokens'
import { FeeAmount } from '@pancakeswap/v3-sdk'
import { SerializedFarmConfig } from '..'
import { defineFarmV3Configs } from '../src/defineFarmV3Configs'

export const farmsV3 = defineFarmV3Configs([
  {
    pid: 1,
    lpAddress: '0x508060A01f11d6a2Eb774B55aEba95931265E0cc',
    token0: etherlinkTokens.wxtz,
    token1: etherlinkTokens.usdc,
    feeAmount: FeeAmount.LOW,
  },
])

const farms: SerializedFarmConfig[] = []

export default farms
