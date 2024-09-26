import { useTranslation } from '@iguanadex/localization'
import { styled } from 'styled-components'
import RibbonWithImage from '../../../components/RibbonWithImage'
import ScoreCard from '../../../components/YourScore/ScoreCard'
import ScoreHeader from '../../../components/YourScore/ScoreHeader'
import CakersShare from '../../../pngs/easter-cakers-share.png'
import FlippersShare from '../../../pngs/easter-flippers-share.png'
import StormShare from '../../../pngs/easter-storm-share.png'
import { YourScoreProps } from '../../../types'
import EasterUserPrizeGrid from './EasterUserPrizeGrid'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 24px auto 0;
  max-width: 768px;
`

const EasterYourScore: React.FC<React.PropsWithChildren<YourScoreProps>> = ({
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
  const showRibbon = !account || isLoading || hasRegistered

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
        userPrizeGrid={<EasterUserPrizeGrid userTradingInformation={userTradingInformation} />}
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

export default EasterYourScore
