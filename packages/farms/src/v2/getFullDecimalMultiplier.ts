import { BIG_TEN } from '@iguanadex/utils/bigNumber'
import BN from 'bignumber.js'
import memoize from 'lodash/memoize'

export const getFullDecimalMultiplier = memoize((decimals: number): BN => {
  return BIG_TEN.pow(decimals)
})
