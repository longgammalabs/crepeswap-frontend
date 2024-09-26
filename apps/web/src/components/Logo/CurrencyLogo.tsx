import { ChainId } from '@iguanadex/chains'
import { useHttpLocations } from '@iguanadex/hooks'
import { Currency } from '@iguanadex/sdk'
import { WrappedTokenInfo } from '@iguanadex/token-lists'
import { BinanceIcon, TokenLogo } from '@iguanadex/uikit'
import { ASSET_CDN, PANCAKE_ASSET_CDN } from 'config/constants/endpoints'
import { useMemo } from 'react'
import { styled } from 'styled-components'
import getTokenLogoURL from '../../utils/getTokenLogoURL'

const StyledLogo = styled(TokenLogo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`

interface LogoProps {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}

export function FiatLogo({ currency, size = '24px', style }: LogoProps) {
  return (
    <StyledLogo
      size={size}
      srcs={[`/images/currencies/${currency?.symbol?.toLowerCase()}.png`]}
      width={size}
      style={style}
    />
  )
}

export default function CurrencyLogo({ currency, size = '24px', style }: LogoProps) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency?.isNative) return []

    if (currency?.isToken) {
      const tokenLogoURL = getTokenLogoURL(currency)

      if (currency instanceof WrappedTokenInfo) {
        if (!tokenLogoURL) return [...uriLocations]
        return [...uriLocations, tokenLogoURL]
      }
      if (!tokenLogoURL) return []
      return [tokenLogoURL]
    }
    return []
  }, [currency, uriLocations])

  if (currency?.isNative) {
    if (currency.chainId === ChainId.BSC) {
      return <BinanceIcon width={size} style={style} />
    }
    if (currency.chainId === ChainId.ETHERLINK) {
      return (
        <StyledLogo
          size={size}
          srcs={[`${ASSET_CDN}/assets/0xc9B53AB2679f573e480d01e0f49e2B5CFB7a3EAb.png`]}
          width={size}
          style={style}
        />
      )
    }
    return (
      <StyledLogo
        size={size}
        srcs={[`${PANCAKE_ASSET_CDN}/web/native/${currency.chainId}.png`]}
        width={size}
        style={style}
      />
    )
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
