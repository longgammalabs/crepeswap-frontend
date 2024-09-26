import { useTranslation } from '@iguanadex/localization'
import { styled } from 'styled-components'
import RibbonWithImage from '../../../components/RibbonWithImage'
import ScoreCard from '../../../components/YourScore/ScoreCard'
import ScoreHeader from '../../../components/YourScore/ScoreHeader'
import CakersShare from '../../../pngs/fan-token-cakers-share.png'
import FlippersShare from '../../../pngs/fan-token-flippers-share.png'
import StormShare from '../../../pngs/fan-token-storm-share.png'
import { YourScoreProps } from '../../../types'
import FanTokenUserPrizeGrid from './FanTokenUserPrizeGrid'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 24px auto 0;
  max-width: 768px;
`

const FanTokenYourScore: React.FC<React.PropsWithChildren<YourScoreProps>> = ({
  hasRegistered = false,
  account,
  userTradingInformation,
  profile,
  isLoading,
  userLeaderboardInformation,
  currentPhase,
  userCanClaimPrizes,
  finishedAndPrizesClaimed,
  finishedAndNothingToClaim,
  onClaimSuccess,
}) => {
  const { t } = useTranslation()
  const showRibbon = !account || hasRegistered

  return (
    <Wrapper>
      {showRibbon && (
        <RibbonWithImage
          imageComponent={<ScoreHeader profile={profile} isLoading={isLoading} />}
          ribbonDirection="down"
          isCardHeader
        >
          {t('Your Score')}
        </RibbonWithImage>
      )}
      <ScoreCard
        userPrizeGrid={<FanTokenUserPrizeGrid userTradingInformation={userTradingInformation} />}
        flippersShareImage={FlippersShare}
        cakersShareImage={CakersShare}
        stormShareImage={StormShare}
        hasRegistered={hasRegistered}
        account={account}
        userTradingInformation={userTradingInformation}
        profile={profile}
        isLoading={isLoading}
        userLeaderboardInformation={userLeaderboardInformation}
        currentPhase={currentPhase}
        userCanClaimPrizes={userCanClaimPrizes}
        finishedAndPrizesClaimed={finishedAndPrizesClaimed}
        finishedAndNothingToClaim={finishedAndNothingToClaim}
        onClaimSuccess={onClaimSuccess}
      />
    </Wrapper>
  )
}

export default FanTokenYourScore
