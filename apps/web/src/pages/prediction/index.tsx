import { SUPPORTED_CHAIN_IDS } from '@iguanadex/prediction'
import Predictions from '../../views/Predictions'
import PredictionConfigProviders from '../../views/Predictions/context/PredictionConfigProviders'

export default function Prediction() {
  return <Predictions />
}

Prediction.Layout = PredictionConfigProviders
Prediction.chains = SUPPORTED_CHAIN_IDS
