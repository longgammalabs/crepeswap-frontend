import { useTranslation } from '@iguanadex/localization'
import { Box, PageSection } from '@iguanadex/uikit'
import useTheme from 'hooks/useTheme'
import { ReactNode } from 'react'
import { LIGHTBLUEBG, LIGHTBLUEBG_DARK } from '../pageSectionStyles'
import PrizesIcon from '../svgs/PrizesIcon'
import RibbonWithImage from './RibbonWithImage'

interface PrizesInfoSectionProps {
  prizesInfoComponent: ReactNode
}

const PrizesInfoSection: React.FC<React.PropsWithChildren<PrizesInfoSectionProps>> = ({ prizesInfoComponent }) => {
  const { isDark } = useTheme()
  const { t } = useTranslation()

  return (
    <>
      <PageSection
        containerProps={{ style: { marginTop: '-30px' } }}
        dividerComponent={
          <RibbonWithImage imageComponent={<PrizesIcon width="175px" />} ribbonDirection="up">
            {t('Prizes')}
          </RibbonWithImage>
        }
        concaveDivider
        clipFill={{
          light: 'linear-gradient(139.73deg, #e5fcfe 0%, #ecf6ff 100%)',
          dark: 'linear-gradient(139.73deg, #303d5b 0%, #363457 100%)',
        }}
        dividerPosition="top"
        background={isDark ? LIGHTBLUEBG_DARK : LIGHTBLUEBG}
        index={4}
      >
        <Box my="64px">{prizesInfoComponent}</Box>
      </PageSection>
    </>
  )
}

export default PrizesInfoSection
