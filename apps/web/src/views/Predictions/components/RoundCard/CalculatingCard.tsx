import { useTranslation } from '@iguanadex/localization'
import { BetPosition } from '@iguanadex/prediction'
import { Card, CardBody, Flex, InfoIcon, Spinner, TooltipText, useTooltip, WaitIcon } from '@iguanadex/uikit'
import useTheme from 'hooks/useTheme'
import { NodeRound } from 'state/types'
import { RoundResultBox } from '../RoundResult'
import CardHeader, { getBorderBackground } from './CardHeader'
import MultiplierArrow from './MultiplierArrow'

interface CalculatingCardProps {
  round: NodeRound
  hasEnteredUp: boolean
  hasEnteredDown: boolean
}

const CalculatingCard: React.FC<React.PropsWithChildren<CalculatingCardProps>> = ({
  round,
  hasEnteredUp,
  hasEnteredDown,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('This round’s closing transaction has been submitted to the blockchain, and is awaiting confirmation.'),
    { placement: 'bottom' },
  )

  return (
    <>
      <Card borderBackground={getBorderBackground(theme, 'calculating')}>
        <CardHeader
          status="calculating"
          icon={<WaitIcon mr="4px" width="21px" />}
          title={t('Calculating')}
          epoch={round.epoch}
        />
        <CardBody p="16px">
          <MultiplierArrow isDisabled hasEntered={hasEnteredUp} />
          <RoundResultBox>
            <Flex alignItems="center" justifyContent="center" flexDirection="column">
              <Spinner size={96} />
              <Flex mt="8px" ref={targetRef}>
                <TooltipText>{t('Calculating')}</TooltipText>
                <InfoIcon ml="4px" />
              </Flex>
            </Flex>
          </RoundResultBox>
          <MultiplierArrow betPosition={BetPosition.BEAR} isDisabled hasEntered={hasEnteredDown} />
        </CardBody>
      </Card>
      {tooltipVisible && tooltip}
    </>
  )
}

export default CalculatingCard
