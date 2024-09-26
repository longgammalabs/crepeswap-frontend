import { TradeType } from '@iguanadex/sdk'
import { SmartRouterTrade } from '@iguanadex/smart-router'
import { useUserSlippage } from '@iguanadex/utils/user'
import { useMemo } from 'react'
import { computeSlippageAdjustedAmounts } from '../utils/exchange'

export function useSlippageAdjustedAmounts(
  trade?: Pick<SmartRouterTrade<TradeType>, 'inputAmount' | 'outputAmount' | 'tradeType'> | null,
) {
  const [allowedSlippage] = useUserSlippage()
  return useMemo(() => computeSlippageAdjustedAmounts(trade, allowedSlippage), [allowedSlippage, trade])
}
