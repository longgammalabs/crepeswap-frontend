import { Token } from '@iguanadex/sdk'
import { Pool } from '@iguanadex/widgets-internal'
import StakeModal from '../../Modals/StakeModal'

export default Pool.withStakeActions<Token>(StakeModal)
