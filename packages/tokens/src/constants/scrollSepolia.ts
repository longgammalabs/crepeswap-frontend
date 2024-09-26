import { ChainId } from '@iguanadex/chains'
import { WETH9 } from '@iguanadex/sdk'
import { USDC } from './common'

export const scrollSepoliaTokens = {
  weth: WETH9[ChainId.SCROLL_SEPOLIA],
  usdc: USDC[ChainId.SCROLL_SEPOLIA],
}
