import { TranslateFunction } from '@iguanadex/localization'
import { ManagerFeeType } from '@iguanadex/position-managers'

export function getReadableManagerFeeType(t: TranslateFunction, feeType: ManagerFeeType) {
  switch (feeType) {
    case ManagerFeeType.LP_REWARDS:
      return t('% of LP rewards')
    default:
      return ''
  }
}
