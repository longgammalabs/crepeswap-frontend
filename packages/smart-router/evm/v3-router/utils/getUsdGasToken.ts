import { ChainId } from '@iguanadex/chains'
import { Token } from '@iguanadex/sdk'

import { usdGasTokensByChain } from '../../constants'

export function getUsdGasToken(chainId: ChainId): Token | null {
  return usdGasTokensByChain[chainId]?.[0] ?? null
}
