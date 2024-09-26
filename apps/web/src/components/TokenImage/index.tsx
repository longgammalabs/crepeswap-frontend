import { ChainId } from '@iguanadex/chains'
import { Token } from '@iguanadex/sdk'
import {
  ImageProps,
  TokenImage as UIKitTokenImage,
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
} from '@iguanadex/uikit'
import { ASSET_CDN, PANCAKE_ASSET_CDN } from 'config/constants/endpoints'

interface TokenPairImageProps extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> {
  primaryToken: Token
  secondaryToken: Token
}

export const tokenImageChainNameMapping = {
  [ChainId.BSC]: '',
  [ChainId.ETHEREUM]: 'eth/',
  [ChainId.POLYGON_ZKEVM]: 'polygon-zkevm/',
  [ChainId.ZKSYNC]: 'zksync/',
  [ChainId.ARBITRUM_ONE]: 'arbitrum/',
  [ChainId.LINEA]: 'linea/',
  [ChainId.BASE]: 'base/',
  [ChainId.OPBNB]: 'opbnb/',
  [ChainId.ETHERLINK]: 'etherlink/',
}

export const getImageUrlFromToken = (token: Token) => {
  const address = token?.isNative ? token.wrapped.address : token.address

  if (token.chainId === ChainId.ETHERLINK_TESTNET || token.chainId === ChainId.ETHERLINK) {
    return `${ASSET_CDN}/assets/${address}.png`
  }

  return token?.isNative && token.chainId !== ChainId.BSC
    ? `${PANCAKE_ASSET_CDN}/web/native/${token.chainId}.png`
    : `https://tokens.pancakeswap.finance/images/${tokenImageChainNameMapping[token.chainId]}${address}.png`
}

export const TokenPairImage: React.FC<React.PropsWithChildren<TokenPairImageProps>> = ({
  primaryToken,
  secondaryToken,
  ...props
}) => {
  return (
    <UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />
  )
}

interface TokenImageProps extends ImageProps {
  token: Token
}

export const TokenImage: React.FC<React.PropsWithChildren<TokenImageProps>> = ({ token, ...props }) => {
  return <UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />
}
