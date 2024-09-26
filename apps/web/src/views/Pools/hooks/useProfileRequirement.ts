import { Token } from '@iguanadex/sdk'
import { Pool } from '@iguanadex/widgets-internal'
import { useMemo } from 'react'
import { useProfile } from 'state/profile/hooks'

export function useProfileRequirement(profileRequirement: Pool.DeserializedPool<Token>['profileRequirement']) {
  const { profile, hasActiveProfile } = useProfile()

  const notMeetRequired = useMemo(
    () => profileRequirement && profileRequirement.required && !hasActiveProfile,
    [profileRequirement, hasActiveProfile],
  )
  const notMeetThreshold = useMemo(
    () =>
      profileRequirement &&
      profileRequirement.thresholdPoints.gt(0) &&
      profileRequirement.thresholdPoints.gt(profile?.points ?? 0),
    [profileRequirement, profile],
  )

  return {
    notMeetRequired,
    notMeetThreshold,
  }
}
