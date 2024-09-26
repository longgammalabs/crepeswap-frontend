import { useTranslation } from '@iguanadex/localization'
import { Box, Button, CalculateIcon, Flex, Tag, Text, useModal } from '@iguanadex/uikit'
import { useMemo } from 'react'
import { usePotteryData } from 'state/pottery/hook'
import WinRateModal from 'views/Pottery/components/WinRateModal'

const WinRate: React.FC<React.PropsWithChildren> = () => {
  const { t } = useTranslation()
  const { publicData, userData } = usePotteryData()

  const [openWinRateModal] = useModal(
    <WinRateModal stakingTokenBalance={userData.stakingTokenBalance} totalSupply={publicData.totalSupply} />,
  )

  const percentage = useMemo(() => {
    return userData.stakingTokenBalance.div(publicData.totalSupply).times(100).toNumber()
  }, [userData, publicData])

  const isSuccess = useMemo(() => percentage >= 50, [percentage])

  return (
    <>
      {userData.stakingTokenBalance.gt(0) && (
        <Box>
          <Flex alignItems="center" justifyContent="flex-end" onClick={openWinRateModal}>
            <Tag variant={isSuccess ? 'success' : 'failure'}>{`${percentage.toFixed(2)}%`}</Tag>
            <Button variant="text" width="20px" height="20px" padding="0px" marginLeft="4px">
              <CalculateIcon color="textSubtle" width="20px" />
            </Button>
          </Flex>
          <Text fontSize="12px" color="textSubtle" mt="4px" textAlign="right">
            {t('Chance of winning next round')}
          </Text>
        </Box>
      )}
    </>
  )
}

export default WinRate
