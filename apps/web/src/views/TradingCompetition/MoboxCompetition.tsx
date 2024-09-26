import { ChainId } from '@iguanadex/chains'
import { useTranslation } from '@iguanadex/localization'
import { Box, PageSection, useMatchBreakpoints } from '@iguanadex/uikit'
import { API_PROFILE, TC_MOBOX_SUBGRAPH } from 'config/constants/endpoints'
import {
  CLAIM,
  CompetitionPhases,
  FINISHED,
  LIVE,
  OVER,
  REGISTRATION,
  SmartContractPhases,
} from 'config/constants/trading-competition/phases'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { useTradingCompetitionContractMobox } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import orderBy from 'lodash/orderBy'
import { useEffect, useState } from 'react'
import { useProfile } from 'state/profile/hooks'
import Footer from './Footer'
import BattleCta from './components/BattleCta'
import Countdown from './components/Countdown'
import HowToJoin from './components/HowToJoin'
import PrizesInfoSection from './components/PrizesInfoSection'
import RibbonWithImage from './components/RibbonWithImage'
import Rules from './components/Rules'
import TeamRanksWithParticipants from './components/TeamRanks/TeamRanksWithParticipants'
import MoboxBattleBanner from './mobox/components/BattleBanner/MoboxBattleBanner'
import MoboxPrizesInfo from './mobox/components/PrizesInfo/MoboxPrizesInfo'
import MoboxYourScore from './mobox/components/YourScore/MoboxYourScore'
import { MIDBLUEBG, MIDBLUEBG_DARK, TRADINGCOMPETITIONBANNER } from './pageSectionStyles'
import MoboxCakerBunny from './pngs/mobox-cakers.png'
import StormBunny from './pngs/mobox-storm-bunny.png'
import { BannerFlex, CompetitionPage } from './styles'
import { RulesIcon } from './svgs'
import RanksIcon from './svgs/RanksIcon'
import { UserTradingInformation, initialUserLeaderboardInformation, initialUserTradingInformation } from './types'
import { useRegistrationClaimStatus } from './useRegistrationClaimStatus'
import { useTeamInformation } from './useTeamInformation'

const MoboxCompetition = () => {
  const { account, chainId } = useAccountActiveChain()
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { profile, isLoading: isProfileLoading } = useProfile()
  const { isDark, theme } = useTheme()
  const tradingCompetitionContract = useTradingCompetitionContractMobox()
  const [currentPhase, setCurrentPhase] = useState(() => {
    const now = Date.now()
    const actualPhase = orderBy(
      Object.values(CompetitionPhases).filter(
        (competitionPhase) => competitionPhase.ends && now < competitionPhase.ends,
      ),
      'endsIn',
      'asc',
    )[0]

    if (!actualPhase) {
      return CompetitionPhases.FINISHED
    }
    return actualPhase
  })
  const { registrationSuccessful, claimSuccessful, onRegisterSuccess, onClaimSuccess } = useRegistrationClaimStatus()
  const [userTradingInformation, setUserTradingInformation] =
    useState<UserTradingInformation>(initialUserTradingInformation)
  const [userLeaderboardInformation, setUserLeaderboardInformation] = useState(initialUserLeaderboardInformation)

  const {
    globalLeaderboardInformation,
    team1LeaderboardInformation,
    team2LeaderboardInformation,
    team3LeaderboardInformation,
  } = useTeamInformation(3)

  const isCompetitionLive = currentPhase.state === LIVE
  const hasCompetitionEnded =
    currentPhase.state === FINISHED || currentPhase.state === CLAIM || currentPhase.state === OVER

  const {
    hasUserClaimed,
    isUserActive,
    userCakeRewards,
    userMoboxRewards,
    userPointReward,
    canClaimMysteryBox,
    canClaimNFT,
  } = userTradingInformation

  const userCanClaimPrizes =
    currentPhase.state === CLAIM &&
    isUserActive &&
    !hasUserClaimed &&
    (userCakeRewards !== '0' ||
      userMoboxRewards !== '0' ||
      userPointReward !== '0' ||
      canClaimMysteryBox ||
      canClaimNFT)
  const finishedAndPrizesClaimed = hasCompetitionEnded && account && hasUserClaimed
  const finishedAndNothingToClaim = hasCompetitionEnded && account && !userCanClaimPrizes
  useEffect(() => {
    const fetchCompetitionInfoContract = async () => {
      const competitionStatus = await tradingCompetitionContract.read.currentStatus()
      setCurrentPhase(SmartContractPhases[competitionStatus])
    }

    const fetchUserContract = async () => {
      try {
        const user = await tradingCompetitionContract.read.claimInformation([account || '0x'])
        const userObject = {
          isLoading: false,
          account,
          hasRegistered: user[0],
          isUserActive: user[1],
          hasUserClaimed: user[2],
          userRewardGroup: user[3].toString(),
          userCakeRewards: user[4].toString(),
          userMoboxRewards: user[5].toString(),
          userPointReward: user[6].toString(),
          canClaimMysteryBox: user[7],
          // canClaimNFT: user[8],
          // NOTE: Mobox Trading competition has a bug in claimInformation
          // that returns wrong canClaimNFT.
          // The bug is only in view function though, all other code is OK
          // recalculating canClaimNFT here to get proper boolean
          canClaimNFT: user[3] > 1n,
        }
        setUserTradingInformation(userObject)
      } catch (error) {
        console.error(error)
        setUserTradingInformation({ ...initialUserTradingInformation, isLoading: false })
      }
    }

    if (chainId === ChainId.BSC) {
      fetchCompetitionInfoContract()
      if (account) {
        setUserTradingInformation({ ...initialUserTradingInformation })
        fetchUserContract()
      } else {
        setUserTradingInformation({ ...initialUserTradingInformation, isLoading: false })
      }
    }
  }, [chainId, account, registrationSuccessful, claimSuccessful, tradingCompetitionContract])

  useEffect(() => {
    const fetchUserTradingStats = async () => {
      const res = await fetch(`${API_PROFILE}/api/users/${userTradingInformation.account}`)
      const data = await res.json()
      setUserLeaderboardInformation(data.leaderboard_mobox)
    }
    // If user has not registered, user trading information will not be displayed and should not be fetched
    if (userTradingInformation.account && userTradingInformation.hasRegistered) {
      fetchUserTradingStats()
    } else {
      setUserLeaderboardInformation({ ...initialUserLeaderboardInformation })
    }
  }, [userTradingInformation])

  const isLoading = isProfileLoading || userTradingInformation.isLoading

  // Don't hide when loading. Hide if the account is connected && the user hasn't registered && the competition is live or finished
  const shouldHideCta =
    !isLoading &&
    userTradingInformation.account &&
    !userTradingInformation.hasRegistered &&
    (isCompetitionLive || hasCompetitionEnded)

  return (
    <>
      <CompetitionPage id="pcs-competition-page">
        <PageSection
          style={{ paddingTop: '0px' }}
          innerProps={{ style: { paddingTop: isMobile ? '30px' : '28px' } }}
          background={TRADINGCOMPETITIONBANNER}
          hasCurvedDivider={false}
          index={1}
        >
          <BannerFlex mb={shouldHideCta ? '0px' : '48px'}>
            <Countdown currentPhase={currentPhase} hasCompetitionEnded={hasCompetitionEnded} />
            <MoboxBattleBanner />
          </BannerFlex>
        </PageSection>
        <PageSection
          containerProps={{ style: { marginTop: '-30px' } }}
          background={isDark ? MIDBLUEBG_DARK : MIDBLUEBG}
          concaveDivider
          clipFill={{ light: '#CCD8F0', dark: '#434575' }}
          dividerPosition="top"
          index={2}
          dividerComponent={
            shouldHideCta ? null : (
              <BattleCta
                userTradingInformation={userTradingInformation}
                currentPhase={currentPhase}
                account={account}
                isCompetitionLive={isCompetitionLive}
                hasCompetitionEnded={hasCompetitionEnded}
                userCanClaimPrizes={userCanClaimPrizes}
                finishedAndPrizesClaimed={finishedAndPrizesClaimed}
                finishedAndNothingToClaim={finishedAndNothingToClaim}
                profile={profile}
                isLoading={isLoading}
                onRegisterSuccess={onRegisterSuccess}
                onClaimSuccess={onClaimSuccess}
              />
            )
          }
        >
          <Box mt={shouldHideCta ? '0px' : ['94px', null, '36px']} mb="64px">
            {/* If competition has not yet started, render HowToJoin component - if not, render YourScore */}
            {currentPhase.state === REGISTRATION ? (
              <HowToJoin />
            ) : (
              <MoboxYourScore
                currentPhase={currentPhase}
                hasRegistered={userTradingInformation.hasRegistered}
                userTradingInformation={userTradingInformation}
                account={account}
                profile={profile}
                isLoading={isLoading}
                userLeaderboardInformation={userLeaderboardInformation}
                userCanClaimPrizes={userCanClaimPrizes}
                finishedAndPrizesClaimed={finishedAndPrizesClaimed}
                finishedAndNothingToClaim={finishedAndNothingToClaim}
                onClaimSuccess={onClaimSuccess}
              />
            )}
          </Box>
        </PageSection>
        {currentPhase.state !== REGISTRATION && (
          <PageSection
            containerProps={{ style: { marginTop: '-20px' } }}
            index={3}
            concaveDivider
            clipFill={{ light: theme.colors.background }}
            dividerPosition="top"
            dividerComponent={
              <RibbonWithImage imageComponent={<RanksIcon width="175px" />} ribbonDirection="up">
                {t('Team Ranks')}
              </RibbonWithImage>
            }
          >
            <Box my="64px">
              <TeamRanksWithParticipants
                image={MoboxCakerBunny}
                team1LeaderboardInformation={team1LeaderboardInformation as any}
                team2LeaderboardInformation={team2LeaderboardInformation as any}
                team3LeaderboardInformation={team3LeaderboardInformation as any}
                globalLeaderboardInformation={globalLeaderboardInformation as any}
                participantSubgraphAddress={TC_MOBOX_SUBGRAPH}
                subgraphName="pancakeswap/trading-competition-v3"
              />
            </Box>
          </PageSection>
        )}
        <PrizesInfoSection prizesInfoComponent={<MoboxPrizesInfo />} />
        <PageSection
          containerProps={{ style: { marginTop: '-1px' } }}
          index={5}
          dividerPosition="top"
          clipFill={{
            light: 'linear-gradient(139.73deg, #ecf5ff 0%, #f2effe 100%)',
            dark: 'linear-gradient(139.73deg, #383357 0%, #3d2b53 100%)',
          }}
          dividerComponent={
            <RibbonWithImage imageComponent={<RulesIcon width="175px" />} ribbonDirection="up">
              {t('Rules')}
            </RibbonWithImage>
          }
        >
          <Box mt="64px">
            <Rules />
          </Box>
        </PageSection>
        <Footer
          shouldHideCta={Boolean(shouldHideCta)}
          image={StormBunny}
          userTradingInformation={userTradingInformation}
          currentPhase={currentPhase}
          account={account}
          isCompetitionLive={isCompetitionLive}
          hasCompetitionEnded={hasCompetitionEnded}
          userCanClaimPrizes={userCanClaimPrizes}
          finishedAndPrizesClaimed={finishedAndPrizesClaimed}
          finishedAndNothingToClaim={finishedAndNothingToClaim}
          profile={profile}
          isLoading={isLoading}
          onRegisterSuccess={onRegisterSuccess}
          onClaimSuccess={onClaimSuccess}
        />
      </CompetitionPage>
    </>
  )
}

export default MoboxCompetition
