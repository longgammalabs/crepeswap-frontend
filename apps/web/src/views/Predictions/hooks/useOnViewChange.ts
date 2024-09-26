import { usePreviousValue } from '@iguanadex/hooks'
import { useEffect } from 'react'
import { PageView } from '../types'
import useSwiper from './useSwiper'

/**
 * Hooks for actions to be performed when the view changes (mobile)
 */
const useOnViewChange = (liveSwiperIndex: number, view?: PageView) => {
  const { swiper } = useSwiper()
  const prevView = usePreviousValue(view)

  useEffect(() => {
    if (swiper && view !== prevView && swiper.activeIndex !== liveSwiperIndex) {
      swiper.slideTo(liveSwiperIndex, 0.1)
    }
  }, [swiper, prevView, view, liveSwiperIndex])
}

export default useOnViewChange
