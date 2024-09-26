import { ChainId } from '@iguanadex/chains'
import { isCakeVaultSupported } from '@iguanadex/pools'
import { Flex } from '@iguanadex/uikit'
import { useMemo } from 'react'
import { Address } from 'viem'

import { useActiveChainId } from 'hooks/useActiveChainId'

import IfoVesting from './IfoVesting/index'
import { VeCakeCard } from './VeCakeCard'

type Props = {
  ifoBasicSaleType?: number
  ifoAddress?: Address
  ifoChainId?: ChainId
}

const IfoPoolVaultCard = ({ ifoBasicSaleType, ifoAddress }: Props) => {
  const { chainId } = useActiveChainId()
  const cakeVaultSupported = useMemo(() => isCakeVaultSupported(chainId), [chainId])

  const vault = <VeCakeCard ifoAddress={ifoAddress} />

  return (
    <Flex width="100%" maxWidth={400} alignItems="center" flexDirection="column">
      {cakeVaultSupported ? vault : null}
      <IfoVesting ifoBasicSaleType={ifoBasicSaleType} />
    </Flex>
  )
}

export default IfoPoolVaultCard
