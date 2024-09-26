import { ChainId } from '@iguanadex/chains'
import { WETH9, WXTZ } from '@iguanadex/sdk'
import { IGN, USDC, USDT, eUSD, tzBTC } from './common'

export const etherlinkTestnetTokens = {
  wxtz: WXTZ[ChainId.ETHERLINK_TESTNET],
  ign: IGN[ChainId.ETHERLINK_TESTNET],
  eusd: eUSD[ChainId.ETHERLINK_TESTNET],
  usdt: USDT[ChainId.ETHERLINK_TESTNET],
  usdc: USDC[ChainId.ETHERLINK_TESTNET],
  weth: WETH9[ChainId.ETHERLINK_TESTNET],
  tzbtc: tzBTC[ChainId.ETHERLINK_TESTNET],
}
