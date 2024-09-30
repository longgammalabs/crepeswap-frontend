import { languageList, useTranslation } from '@pancakeswap/localization'
import { Menu as UikitMenu, footerLinks, useModal } from '@pancakeswap/uikit'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
// import { usePhishingBanner } from '@pancakeswap/utils/user'
import { NextLinkFromReactRouter } from '@pancakeswap/widgets-internal'
import USCitizenConfirmModal from 'components/Modal/USCitizenConfirmModal'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import PhishingWarningBanner from 'components/PhishingWarningBanner'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useCakePrice } from 'hooks/useCakePrice'
import useTheme from 'hooks/useTheme'
import { IdType } from 'hooks/useUserIsUsCitizenAcknowledgement'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import GlobalSettings from './GlobalSettings'
import { SettingsMode } from './GlobalSettings/types'
import UserMenu from './UserMenu'
import { useMenuItems } from './hooks/useMenuItems'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'

const LinkComponent = (linkProps) => {
  return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
}

const Menu = (props) => {
  const { chainId } = useActiveChainId()
  const { isDark, setTheme } = useTheme()
  const cakePrice = useCakePrice()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useRouter()

  const [onUSCitizenModalPresent] = useModal(
    <USCitizenConfirmModal title={t('IguanaDEX Perpetuals')} id={IdType.PERPETUALS} />,
    true,
    false,
    'usCitizenConfirmModal',
  )
  const [showPhishingWarningBanner] = [false] // usePhishingBanner()

  const menuItems = useMenuItems(onUSCitizenModalPresent)

  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  const getFooterLinks = useMemo(() => {
    return footerLinks(t)
  }, [t])

  return (
    <>
      <UikitMenu
        linkComponent={LinkComponent}
        rightSide={
          <>
            <GlobalSettings mode={SettingsMode.GLOBAL} />
            <NetworkSwitcher />
            <UserMenu />
          </>
        }
        chainId={chainId}
        banner={showPhishingWarningBanner && typeof window !== 'undefined' && <PhishingWarningBanner />}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        cakePriceUsd={cakePrice.eq(BIG_ZERO) ? undefined : cakePrice}
        links={menuItems}
        subLinks={activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
        footerLinks={getFooterLinks}
        activeItem={activeMenuItem?.href}
        activeSubItem={activeSubMenuItem?.href}
        buyCakeLabel={t('Buy XTZ')}
        buyCakeLink={`https://iguanadex.com/swap?outputCurrency=XTZ&chainId=${chainId}`}
        {...props}
      />
    </>
  )
}

export default Menu
