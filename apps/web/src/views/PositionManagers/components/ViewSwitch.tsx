import { ToggleView } from '@iguanadex/uikit'
import { memo } from 'react'

import { useViewMode } from '../hooks'

export const ViewSwitch = memo(function ViewSwitch() {
  const { mode, setViewMode } = useViewMode()

  return <ToggleView idPrefix="positionManagers" viewMode={mode} onToggle={setViewMode} />
})
