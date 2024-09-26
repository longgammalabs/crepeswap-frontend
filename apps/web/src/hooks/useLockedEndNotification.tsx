import { StyledLink, Text, useToast } from '@iguanadex/uikit'
import { NextLinkFromReactRouter } from '@iguanadex/widgets-internal'

import { useTranslation } from '@iguanadex/localization'
import isUndefinedOrNull from '@iguanadex/utils/isUndefinedOrNull'
import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import atomWithStorageWithErrorCatch from 'utils/atomWithStorageWithErrorCatch'
import { useAccount } from 'wagmi'
import { useUserCakeLockStatus } from './useUserCakeLockStatus'

const lockedNotificationShowAtom = atomWithStorageWithErrorCatch('lockedNotificationShow', true, () => sessionStorage)
function useLockedNotificationShow() {
  return useAtom(lockedNotificationShowAtom)
}

const LockedEndDescription: React.FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <Text>{t('The locked staking duration has ended.')}</Text>
      <NextLinkFromReactRouter to="/pools" prefetch={false}>
        <StyledLink color="primary">{t('Go to Pools')}</StyledLink>
      </NextLinkFromReactRouter>
    </>
  )
}

const useLockedEndNotification = () => {
  const { t } = useTranslation()
  const { toastInfo } = useToast()
  const queryClient = useQueryClient()
  const { address: account } = useAccount()
  const isUserLockedEnd = useUserCakeLockStatus()
  const [lockedNotificationShow, setLockedNotificationShow] = useLockedNotificationShow()

  useEffect(() => {
    if (account) {
      if (!isUndefinedOrNull(isUserLockedEnd)) {
        setLockedNotificationShow(true)
        queryClient.invalidateQueries({
          queryKey: ['userCakeLockStatus', account],
        })
      }
    } else {
      setLockedNotificationShow(true)
    }
  }, [setLockedNotificationShow, account, queryClient, isUserLockedEnd])

  useEffect(() => {
    if (toastInfo && isUserLockedEnd && lockedNotificationShow) {
      toastInfo(t('Cake Syrup Pool'), <LockedEndDescription />)
      setLockedNotificationShow(false) // show once
    }
  }, [isUserLockedEnd, toastInfo, lockedNotificationShow, setLockedNotificationShow, t])
}

export default useLockedEndNotification
