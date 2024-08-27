import shuffle from 'lodash/shuffle'
import { ReactElement, useMemo } from 'react'
import CompetitionBanner from '../CompetitionBanner'
import EtherlinkBanner from '../EtherlinkBanner'
import IguanaBanner from '../IguanaBanner'
import PerpetualBanner from '../PerpetualBanner'
import useIsRenderCompetitionBanner from './useIsRenderCompetitionBanner'
import useIsRenderIfoBanner from './useIsRenderIFOBanner'

interface IBannerConfig {
  shouldRender: boolean
  banner: ReactElement
}

/**
 * make your custom hook to control should render specific banner or not
 * add new campaign banner easily
 *
 * @example
 * ```ts
 *  {
 *    shouldRender: isRenderIFOBanner,
 *    banner: <IFOBanner />,
 *  },
 * ```
 */

export const useMultipleBannerConfig = () => {
  const isRenderIFOBanner = useIsRenderIfoBanner()
  const isRenderCompetitionBanner = useIsRenderCompetitionBanner()

  return useMemo(() => {
    const NO_SHUFFLE_BANNERS: IBannerConfig[] = [
      { shouldRender: true, banner: <IguanaBanner /> },
      { shouldRender: true, banner: <EtherlinkBanner /> },
    ]

    const SHUFFLE_BANNERS: IBannerConfig[] = [
      {
        shouldRender: isRenderCompetitionBanner,
        banner: <CompetitionBanner />,
      },
      {
        shouldRender: false, // set to TRUE later
        banner: <PerpetualBanner />,
      },
    ]
    return [...NO_SHUFFLE_BANNERS, ...shuffle(SHUFFLE_BANNERS)]
      .filter((bannerConfig: IBannerConfig) => bannerConfig.shouldRender)
      .map((bannerConfig: IBannerConfig) => bannerConfig.banner)
  }, [isRenderIFOBanner, isRenderCompetitionBanner])
}
