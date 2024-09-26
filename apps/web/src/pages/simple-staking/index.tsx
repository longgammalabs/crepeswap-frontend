import { ChainId } from '@iguanadex/chains'
import FixedStaking from 'views/FixedStaking'

const FixedStakingPage = () => {
  return <FixedStaking />
}

FixedStakingPage.chains = [ChainId.ETHERLINK]

export default FixedStakingPage
