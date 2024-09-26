import { ChainId } from '@iguanadex/chains'
import { WBNB, WETH9, WXTZ } from '@iguanadex/sdk'
import { IGN, SHIB, USDC, USDT, WAVAX, WBTC } from './common'

export const etherlinkTokens = {
  wxtz: WXTZ[ChainId.ETHERLINK],
  ign: IGN[ChainId.ETHERLINK],
  usdt: USDT[ChainId.ETHERLINK],
  usdc: USDC[ChainId.ETHERLINK],
  weth: WETH9[ChainId.ETHERLINK],
  wbtc: WBTC[ChainId.ETHERLINK],
  wbnb: WBNB[ChainId.ETHERLINK],
  wavax: WAVAX[ChainId.ETHERLINK],
  shib: SHIB[ChainId.ETHERLINK],
}
