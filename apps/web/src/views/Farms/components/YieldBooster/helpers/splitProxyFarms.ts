import isUndefinedOrNull from '@iguanadex/utils/isUndefinedOrNull'
import { SerializedFarmConfig } from 'config/constants/types'
import groupBy from 'lodash/groupBy'

interface SplitProxyFarmsResponse {
  normalFarms: SerializedFarmConfig[]
  farmsWithProxy: SerializedFarmConfig[]
}

export default function splitProxyFarms(farms: SerializedFarmConfig[]): SplitProxyFarmsResponse {
  const { false: normalFarms, true: farmsWithProxy } = groupBy(farms, (farm) =>
    isUndefinedOrNull(farm.boosted) ? false : farm.boosted,
  )

  return { normalFarms, farmsWithProxy }
}
