import { ChainId } from '@iguanadex/chains'
import { useTranslation } from '@iguanadex/localization'
import { useToast } from '@iguanadex/uikit'
import { useQueryClient } from '@tanstack/react-query'
import BigNumber from 'bignumber.js'
import { ToastDescriptionWithTx } from 'components/Toast'
import { TRADING_REWARD_API } from 'config/constants/endpoints'
import useCatchTxError from 'hooks/useCatchTxError'
import { useTradingRewardContract, useTradingRewardTopTraderContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { encodePacked, keccak256, parseEther } from 'viem'
import { Qualification, RewardType } from 'views/TradingReward/hooks/useAllTradingRewardPair'
import { UserCampaignInfoDetail } from 'views/TradingReward/hooks/useAllUserCampaignInfo'
import { useAccount } from 'wagmi'

interface UseClaimAllRewardProps {
  campaignIds: Array<string>
  unclaimData: UserCampaignInfoDetail[]
  qualification: Qualification
  type: RewardType
}

export const useClaimAllReward = ({ campaignIds, unclaimData, qualification, type }: UseClaimAllRewardProps) => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { toastSuccess } = useToast()
  const queryClient = useQueryClient()
  const { fetchWithCatchTxError, loading: isPending } = useCatchTxError()
  const tradingRewardContract = useTradingRewardContract({ chainId: ChainId.BSC })
  const tradingRewardTopTradersContract = useTradingRewardTopTraderContract({ chainId: ChainId.BSC })
  const contract = type === RewardType.CAKE_STAKERS ? tradingRewardContract : tradingRewardTopTradersContract

  const handleClaim = useCallback(async () => {
    const claimCampaignIds = unclaimData.map((i) => i.campaignId)
    const tradingFee = unclaimData.map((i) => {
      const isQualification = new BigNumber(i.totalTradingFee).gt(new BigNumber(qualification.minAmountUSD).div(1e18))
      const totalFee = isQualification ? i.totalTradingFee.toFixed(8) : i.totalTradingFee.toString()
      return BigInt(new BigNumber(totalFee).times(1e18).toString())
    })

    const merkleProofs = await Promise.all(
      unclaimData.map(async (i) => {
        const isQualification = new BigNumber(i.totalTradingFee).gt(new BigNumber(qualification.minAmountUSD).div(1e18))
        const totalFee = isQualification ? i.totalTradingFee.toFixed(8) : i.totalTradingFee.toString()
        const value = parseEther(totalFee as `${number}`)
        const originHash = keccak256(keccak256(encodePacked(['address', 'uint256'], [account || '0x', value])))

        const response = await fetch(
          `${TRADING_REWARD_API}/hash/campaignId/${i.campaignId}/originHash/${originHash}/type/${type}`,
        )
        const result = await response.json()
        return result.data.merkleProof
      }),
    )

    const receipt = await fetchWithCatchTxError(() =>
      contract.write.claimRewardMulti([claimCampaignIds, merkleProofs, tradingFee], {
        account: contract.account || '0x',
        chain: contract.chain,
      }),
    )

    if (receipt?.status) {
      await queryClient.invalidateQueries({
        queryKey: ['tradingReward', 'all-campaign-id-info', account, campaignIds],
      })
      toastSuccess(
        t('Success!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('You have successfully claimed available tokens.')}
        </ToastDescriptionWithTx>,
      )
    }
    return null
  }, [
    account,
    campaignIds,
    contract,
    fetchWithCatchTxError,
    queryClient,
    qualification.minAmountUSD,
    t,
    toastSuccess,
    type,
    unclaimData,
  ])

  return { isPending, handleClaim }
}
