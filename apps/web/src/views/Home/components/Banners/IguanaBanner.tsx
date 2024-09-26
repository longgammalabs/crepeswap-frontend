import { useTranslation } from '@iguanadex/localization'
import { Button, Flex, OpenNewIcon, Text, useMatchBreakpoints } from '@iguanadex/uikit'
import { NextLinkFromReactRouter } from '@iguanadex/widgets-internal'
import Image from 'next/legacy/image'
import { memo } from 'react'
import styled, { css } from 'styled-components'
import * as S from './Styled'
import { flyingAnim } from './animations'

const RightWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  overflow: visible;

  > span:nth-child(2) {
    // TradingRewardButter
    position: absolute !important;
    top: -15%;
    right: 3%;

    ${({ theme }) => theme.mediaQueries.sm} {
      top: 5%;
      right: -7%;
    }

    ${({ theme }) => theme.mediaQueries.lg} {
      top: -15%;
      right: 3%;
    }
  }

  > span:nth-child(3) {
    // TradingRewardButter2
    position: absolute !important;
    right: 0;
    top: -24%;
    animation: ${flyingAnim} 2.5s ease-in-out infinite;
    z-index: 2;

    ${({ theme }) => theme.mediaQueries.lg} {
      right: 12%;
    }
  }
`

const Header = styled.div`
  padding-right: 100px;
  position: relative;
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 98%;
  letter-spacing: 0.01em;
  color: #ffffff;
  margin-top: 18px;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

const sharedStyle = css`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    border-radius: 16px;
    padding: 12px 24px;
  }
`

const StyledButtonLeft = styled(Button)`
  ${sharedStyle}
  > div {
    color: ${({ theme }) => theme.colors.white};
  }
`

const BGWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: -2px;
  left: 0;
  overflow: hidden;
  border-radius: 32px;
  span {
    // liquidStakingBunnyBg1
    position: absolute !important;
    top: 0px;
    right: 0px;
    max-width: none !important;
    min-width: 300px !important;
    width: 100% !important;
    height: 196px !important;
    ${({ theme }) => theme.mediaQueries.sm} {
      top: -2px;
      right: 0;
      width: 1126px !important;
      height: 194px !important;
    }
  }
`

const IguanaBanner = () => {
  const { t } = useTranslation()
  const { isMobile, isDesktop } = useMatchBreakpoints()

  const title = isDesktop ? t('The Crypto Trading Hub') : t('Crypto Trading Hub')

  return (
    <S.Wrapper
    // style={{
    //   background:
    //     'linear-gradient(130.14deg, rgba(0, 90, 225, 0.2) 15.11%, rgba(87, 221, 218, 0.2) 82.57%), linear-gradient(249.98deg, #53DEE9 32.16%, #31D0AA 91.27%), linear-gradient(117.08deg, rgba(99, 255, 254, 0.2) 11.95%, rgba(54, 210, 179, 0.2) 96.2%), linear-gradient(182.28deg, rgba(104, 220, 233, 0.8) -44.21%, rgba(104, 220, 233, 0) 87.24%)',
    // }}
    >
      <S.Inner>
        <S.LeftWrapper>
          {/* <Flex alignItems="center" style={{ gap: isMobile ? 4 : 12 }} mb="8px">
            <Image
              src={pancakeSwapLogo}
              alt="pancakeSwapLogo"
              width={isMobile ? 90 : 132}
              height={isMobile ? 13 : 20}
              unoptimized
            />
            <Devider />
            <Image src={galxeLogo} alt="galxeLogo" width={isMobile ? 52 : 77} height={isMobile ? 9 : 14} unoptimized />
          </Flex> */}
          <Header data-text={title}>{title}</Header>
          {!isMobile && (
            <Text color="#18E764" fontSize={24} fontWeight={700} mb="0px" mt="10px">
              {t('A liquidity hub for all assets on Etherlink')}
            </Text>
          )}
          <Flex mt="28px">
            <NextLinkFromReactRouter to="/swap">
              <StyledButtonLeft scale={['xs', 'sm', 'md']}>
                <Text bold fontSize={['12px', '16px']} mr="4px">
                  {t('Get Started')}
                </Text>
                <OpenNewIcon color="white" />
              </StyledButtonLeft>
            </NextLinkFromReactRouter>
          </Flex>
        </S.LeftWrapper>
        <RightWrapper>
          <BGWrapper>
            <div style={{ borderRadius: '0px', overflow: 'hidden' }}>
              <Image
                src="https://raw.githubusercontent.com/IguanaDEX/assets/main/iguana_brand_assets/bg-header.webp"
                alt="Background header"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </BGWrapper>
        </RightWrapper>
      </S.Inner>
    </S.Wrapper>
  )
}

export default memo(IguanaBanner)
