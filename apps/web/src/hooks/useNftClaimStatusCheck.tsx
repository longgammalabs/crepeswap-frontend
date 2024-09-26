import { useModal } from '@iguanadex/uikit'
import ClaimNftModal from 'components/ClaimNftModal/ClaimNftModal'
import noop from 'lodash/noop'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const useNftClaimStatusCheck = () => {
  const [hasDisplayedModal, setHasDisplayedModal] = useState(false)
  const { address: account } = useAccount()
  const [onPresentNftClaimModal] = useModal(<ClaimNftModal />)

  useEffect(() => {
    const checkClaimStatus = async () => {
      try {
        const canClaim = /* await getBunnySpecialXmasContract(bscRpcProvider).canClaim(account) */ true
        if (canClaim) {
          onPresentNftClaimModal()
          setHasDisplayedModal(true)
        }
      } catch (error) {
        // User not registered throws here
        noop()
      }
    }
    if (account && !hasDisplayedModal) {
      checkClaimStatus()
    }
  }, [account, hasDisplayedModal, onPresentNftClaimModal])

  // Reset when account changes
  useEffect(() => {
    setHasDisplayedModal(false)
  }, [account])
}

export default useNftClaimStatusCheck
