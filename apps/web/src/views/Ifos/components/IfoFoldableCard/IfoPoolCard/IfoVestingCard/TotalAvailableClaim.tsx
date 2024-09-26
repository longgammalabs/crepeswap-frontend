import { Ifo } from '@iguanadex/ifos'
import { useTranslation } from '@iguanadex/localization'
import { Box, Flex, Text } from '@iguanadex/uikit'
import { getFullDisplayBalance } from '@iguanadex/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { LightGreyCard } from 'components/Card'
import { TokenImage } from 'components/TokenImage'
import { useMemo } from 'react'

interface TotalAvailableClaimProps {
  ifo: Ifo
  amountAvailableToClaim: BigNumber
}

const TotalAvailableClaim: React.FC<React.PropsWithChildren<TotalAvailableClaimProps>> = ({
  ifo,
  amountAvailableToClaim,
}) => {
  const { t } = useTranslation()
  const { token } = ifo

  const amountAvailable = useMemo(
    () => (amountAvailableToClaim.gt(0) ? getFullDisplayBalance(amountAvailableToClaim, token.decimals, 4) : '0'),
    [token, amountAvailableToClaim],
  )

  return (
    <LightGreyCard mt="24px" mb="8px">
      <Flex>
        <TokenImage mr="16px" width={32} height={32} token={token} style={{ alignSelf: 'flex-start' }} />
        <Box>
          <Text bold color="secondary" fontSize="12px" textTransform="uppercase">
            {t('%symbol% available to claim', { symbol: token.symbol })}
          </Text>
          <Text as="span" bold fontSize="20px">
            {amountAvailable}
          </Text>
        </Box>
      </Flex>
    </LightGreyCard>
  )
}

export default TotalAvailableClaim
