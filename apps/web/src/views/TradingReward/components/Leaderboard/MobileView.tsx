import { useTranslation } from '@iguanadex/localization'
import { Box, PaginationButton, Text } from '@iguanadex/uikit'
import MobileResult, { StyledMobileRow } from 'views/TradingReward/components/Leaderboard/MobileResult'
import { RankListDetail } from 'views/TradingReward/hooks/useRankList'

interface LeaderBoardMobileViewProps {
  data: RankListDetail[]
  maxPage: number
  isLoading: boolean
  currentPage: number
  setCurrentPage: (value: number) => void
}

const LeaderBoardMobileView: React.FC<React.PropsWithChildren<LeaderBoardMobileViewProps>> = ({
  data,
  isLoading,
  currentPage,
  maxPage,
  setCurrentPage,
}) => {
  const { t } = useTranslation()

  return (
    <Box>
      {isLoading ? (
        <StyledMobileRow>
          <Text padding="48px 0px" textAlign="center">
            {t('Loading...')}
          </Text>
        </StyledMobileRow>
      ) : (
        <>
          {!data || data?.length === 0 ? (
            <StyledMobileRow>
              <Text padding="48px 0px" textAlign="center">
                {t('No results')}
              </Text>
            </StyledMobileRow>
          ) : (
            <>
              {data?.map((rank) => (
                <MobileResult key={rank.rank} rank={rank} />
              ))}
            </>
          )}
        </>
      )}
      {data?.length > 0 && (
        <PaginationButton showMaxPageText currentPage={currentPage} maxPage={maxPage} setCurrentPage={setCurrentPage} />
      )}
    </Box>
  )
}

export default LeaderBoardMobileView
