import { Button, Skeleton, useModal } from '@iguanadex/uikit'
import useWhitelistedAddresses from '../hooks/useWhitelistedAddresses'
import WhitelistedBiddersModal from './WhitelistedBiddersModal'

const WhitelistedBiddersButton: React.FC<React.PropsWithChildren> = () => {
  const whitelistedBidders = useWhitelistedAddresses()
  const [onShowWhitelistedBidders] = useModal(<WhitelistedBiddersModal />)

  return whitelistedBidders ? (
    <Button p="0" variant="text" scale="sm" onClick={onShowWhitelistedBidders}>
      {whitelistedBidders.length}
    </Button>
  ) : (
    <Skeleton height="24px" width="46px" />
  )
}

export default WhitelistedBiddersButton
