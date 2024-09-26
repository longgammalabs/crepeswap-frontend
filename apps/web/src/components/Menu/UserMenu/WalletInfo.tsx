import { ChainId } from '@iguanadex/chains'
import { useTranslation } from '@iguanadex/localization'
import { WNATIVE } from '@iguanadex/sdk'
import {
  Box,
  Button,
  CopyAddress,
  Flex,
  FlexGap,
  InfoFilledIcon,
  InjectedModalProps,
  LinkExternal,
  Message,
  ScanLink,
  Skeleton,
  Text,
  TooltipText,
  useTooltip,
} from '@iguanadex/uikit'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { FetchStatus } from 'config/constants/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'
import useNativeCurrency from 'hooks/useNativeCurrency'
import useTokenBalance, { useBSCCakeBalance } from 'hooks/useTokenBalance'

import { formatBigInt, getFullDisplayBalance } from '@iguanadex/utils/formatBalance'
import InternalLink from 'components/Links'
import { useDomainNameForAddress } from 'hooks/useDomain'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { getBlockExploreLink, getBlockExploreName } from 'utils'
import { Address, useBalance } from 'wagmi'

const COLORS = {
  ETH: '#627EEA',
  BNB: '#14151A',
  XTZ: `${({ theme }) => theme.colors.primary}`,
}

interface WalletInfoProps {
  hasLowNativeBalance: boolean
  switchView: (newIndex: number) => void
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowNativeBalance, onDismiss }) => {
  const { t } = useTranslation()
  const { account, chainId, chain } = useActiveWeb3React()
  const { domainName } = useDomainNameForAddress(account ?? '')
  const isEtherlink = chainId === ChainId.ETHERLINK
  const xtzBalance = useBalance({ address: account ?? undefined, chainId: ChainId.ETHERLINK })
  const nativeBalance = useBalance({ address: account ?? undefined, enabled: !isEtherlink })
  const native = useNativeCurrency()
  const wNativeToken = !isEtherlink ? WNATIVE[chainId as ChainId] : null
  const wXTZToken = WNATIVE[ChainId.ETHERLINK]
  const { balance: wNativeBalance, fetchStatus: wNativeFetchStatus } = useTokenBalance(wNativeToken?.address as Address)
  const { balance: wXTZBalance, fetchStatus: wXTZFetchStatus } = useTokenBalance(wXTZToken?.address, true)
  const { balance: cakeBalance, fetchStatus: cakeFetchStatus } = useBSCCakeBalance()
  const [mobileTooltipShow, setMobileTooltipShow] = useState(false)
  const { logout } = useAuth()

  const handleLogout = () => {
    onDismiss?.()
    logout()
  }
  const {
    tooltip: buyCryptoTooltip,
    tooltipVisible: buyCryptoTooltipVisible,
    targetRef: buyCryptoTargetRef,
  } = useTooltip(
    <>
      <Box maxWidth="140px">
        <FlexGap gap="8px" flexDirection="column" justifyContent="space-between">
          <Text as="p">
            {t('%currency% Balance Low. You need %currency% for transaction fees.', {
              currency: native?.symbol,
            })}
          </Text>
          <InternalLink href="/buy-crypto" onClick={() => onDismiss?.()}>
            <Button height="30px">{t('Buy %currency%', { currency: native?.symbol })}</Button>
          </InternalLink>
        </FlexGap>
      </Box>
    </>,
    {
      isInPortal: false,
      placement: isMobile ? 'top' : 'bottom',
      trigger: isMobile ? 'focus' : 'hover',
      ...(isMobile && { manualVisible: mobileTooltipShow }),
    },
  )

  const showXtzEntryPoint = Number(xtzBalance?.data?.value) === 0
  const showNativeEntryPoint = Number(nativeBalance?.data?.value) === 0

  return (
    <>
      <Text color="secondary" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
        {t('Your Address')}
      </Text>
      <FlexGap flexDirection="column" mb="24px" gap="8px">
        <CopyAddress tooltipMessage={t('Copied')} account={account ?? undefined} />
        {domainName ? <Text color="textSubtle">{domainName}</Text> : null}
      </FlexGap>
      {hasLowNativeBalance && (
        <Message variant="warning" mb="24px">
          <Box>
            <Text fontWeight="bold">
              {t('%currency% Balance Low', {
                currency: native.symbol,
              })}
            </Text>
            <InternalLink href="/buy-crypto" onClick={() => onDismiss?.()}>
              <Text color="primary">
                {t('You need %currency% for transaction fees.', {
                  currency: native.symbol,
                })}
              </Text>
            </InternalLink>
          </Box>
        </Message>
      )}
      {!isEtherlink && chain && (
        <Box mb="12px">
          <Flex justifyContent="space-between" alignItems="center" mb="8px">
            <Flex bg={COLORS.ETH} borderRadius="16px" pl="4px" pr="8px" py="2px">
              <ChainLogo chainId={chain.id} />
              <Text color="white" ml="4px">
                {chain.name}
              </Text>
            </Flex>
            <LinkExternal href={getBlockExploreLink(account, 'address', chainId)}>
              {getBlockExploreName(chainId)}
            </LinkExternal>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="textSubtle">
              {native.symbol} {t('Balance')}
            </Text>
            {!nativeBalance.isFetched ? (
              <Skeleton height="22px" width="60px" />
            ) : (
              <Flex>
                <Text
                  color={showNativeEntryPoint ? 'warning' : 'text'}
                  fontWeight={showNativeEntryPoint ? 'bold' : 'normal'}
                >
                  {formatBigInt(nativeBalance?.data?.value ?? 0n, 6)}
                </Text>
                {showNativeEntryPoint ? (
                  <TooltipText
                    ref={buyCryptoTargetRef}
                    onClick={() => setMobileTooltipShow(false)}
                    display="flex"
                    style={{ justifyContent: 'center' }}
                  >
                    <InfoFilledIcon pl="2px" fill="#000" color="#D67E0A" width="22px" />
                  </TooltipText>
                ) : null}
                {buyCryptoTooltipVisible && (!isMobile || mobileTooltipShow) && buyCryptoTooltip}
              </Flex>
            )}
          </Flex>
          {wNativeBalance && wNativeBalance.gt(0) && (
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="textSubtle">
                {wNativeToken?.symbol} {t('Balance')}
              </Text>
              {wNativeFetchStatus !== FetchStatus.Fetched ? (
                <Skeleton height="22px" width="60px" />
              ) : (
                wNativeToken?.decimals && (
                  <Text>{getFullDisplayBalance(wNativeBalance, wNativeToken?.decimals, 6)}</Text>
                )
              )}
            </Flex>
          )}
        </Box>
      )}

      <Box mb="24px">
        <Flex justifyContent="space-between" alignItems="center" mb="8px">
          <Flex bg={COLORS.XTZ} borderRadius="16px" pl="4px" pr="8px" py="2px">
            <ChainLogo chainId={ChainId.ETHERLINK} />
            <Text color="white" ml="4px">
              Etherlink
            </Text>
          </Flex>
          <ScanLink useBscCoinFallback href={getBlockExploreLink(account, 'address', ChainId.ETHERLINK)}>
            {getBlockExploreName(ChainId.ETHERLINK)}
          </ScanLink>
        </Flex>
        {chainId === 42793 ? (
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="textSubtle">XTZ {t('Balance')}</Text>
            {!xtzBalance.isFetched ? (
              <Skeleton height="22px" width="60px" />
            ) : (
              <Flex alignItems="center" justifyContent="center">
                <Text
                  fontWeight={showXtzEntryPoint ? 'bold' : 'normal'}
                  color={showXtzEntryPoint ? 'warning' : 'normal'}
                >
                  {formatBigInt(xtzBalance?.data?.value ?? 0n, 6)}
                </Text>
                {showXtzEntryPoint ? (
                  <TooltipText
                    ref={buyCryptoTargetRef}
                    onClick={() => setMobileTooltipShow(false)}
                    display="flex"
                    style={{ justifyContent: 'center' }}
                  >
                    <InfoFilledIcon pl="2px" fill="#000" color="#D67E0A" width="22px" />
                  </TooltipText>
                ) : null}
                {buyCryptoTooltipVisible && (!isMobile || mobileTooltipShow) && buyCryptoTooltip}
              </Flex>
            )}
          </Flex>
        ) : null}
        {wXTZBalance.gt(0) && (
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="textSubtle">WXTZ {t('Balance')}</Text>
            {wXTZFetchStatus !== FetchStatus.Fetched ? (
              <Skeleton height="22px" width="60px" />
            ) : (
              <Text>{getFullDisplayBalance(wXTZBalance, wXTZToken.decimals, 6)}</Text>
            )}
          </Flex>
        )}
        {/* <Flex alignItems="center" justifyContent="space-between">
          <Text color="textSubtle">{t('IGN Balance')}</Text>
          {cakeFetchStatus !== FetchStatus.Fetched ? (
            <Skeleton height="22px" width="60px" />
          ) : (
            <Text>{formatBigInt(cakeBalance, 3)}</Text>
          )}
        </Flex> */}
      </Box>
      <Button variant="secondary" width="100%" minHeight={48} onClick={handleLogout}>
        {t('Disconnect Wallet')}
      </Button>
    </>
  )
}

export default WalletInfo
