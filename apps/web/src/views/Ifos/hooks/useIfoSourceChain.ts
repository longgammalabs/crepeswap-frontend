import { ChainId } from '@iguanadex/chains'
import { getSourceChain } from '@iguanadex/ifos'
import { useMemo } from 'react'

// By deafult source chain is the first chain that supports native ifo
export function useIfoSourceChain(chainId?: ChainId) {
  return useMemo(() => getSourceChain(chainId) || ChainId.BSC, [chainId])
}
