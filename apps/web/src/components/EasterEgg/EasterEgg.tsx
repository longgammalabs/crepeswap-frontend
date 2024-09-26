import { FallingBunniesProps, useKonamiCheatCode } from '@iguanadex/uikit'
import dynamic from 'next/dynamic'
import { memo, useCallback, useState } from 'react'

const FallingBunnies = dynamic<FallingBunniesProps>(
  () => import('@iguanadex/uikit').then((mod) => mod.FallingBunnies),
  { ssr: false },
)

const EasterEgg: React.FC<React.PropsWithChildren<FallingBunniesProps>> = (props) => {
  const [show, setShow] = useState(false)
  const startFalling = useCallback(() => setShow(true), [setShow])
  useKonamiCheatCode(startFalling)

  if (show) {
    return (
      <div onAnimationEnd={() => setShow(false)}>
        <FallingBunnies {...props} />
      </div>
    )
  }
  return null
}

export default memo(EasterEgg)
