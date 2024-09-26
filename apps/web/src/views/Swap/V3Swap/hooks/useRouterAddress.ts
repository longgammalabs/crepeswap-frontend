import { TradeType } from '@iguanadex/sdk'
import { RouteType, SMART_ROUTER_ADDRESSES, SmartRouterTrade } from '@iguanadex/smart-router'

import { V2_ROUTER_ADDRESS } from 'config/constants/exchange'

export function useRouterAddress(trade?: SmartRouterTrade<TradeType>) {
  if (!trade) {
    return ''
  }

  const { routes, inputAmount } = trade
  const {
    currency: { chainId },
  } = inputAmount
  if (routes.length === 1 && routes[0].type === RouteType.V2) {
    return V2_ROUTER_ADDRESS[chainId]
  }
  return SMART_ROUTER_ADDRESSES[chainId]
}
