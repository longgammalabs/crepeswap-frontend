import { ChainId } from '@iguanadex/chains'
import { Token, WNATIVE } from '@iguanadex/sdk'

export function getNativeWrappedToken(chainId: ChainId): Token | null {
  return WNATIVE[chainId] ?? null
}
