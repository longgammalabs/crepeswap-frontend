/* eslint-disable jsx-a11y/anchor-is-valid */
import { useTranslation } from '@iguanadex/localization'
import { Box, Breadcrumbs, Link, Text } from '@iguanadex/uikit'
import NextLink from 'next/link'

const Crumbs = () => {
  const { t } = useTranslation()

  return (
    <Box mb="24px">
      <Breadcrumbs>
        <NextLink href="/" passHref>
          <Link>{t('Home')}</Link>
        </NextLink>
        <NextLink href="/prediction" passHref>
          <Link>{t('Prediction')}</Link>
        </NextLink>
        <Text>{t('Leaderboard')}</Text>
      </Breadcrumbs>
    </Box>
  )
}

export default Crumbs
