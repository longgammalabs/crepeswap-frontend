import { Modal } from '@iguanadex/uikit'
import { styled } from 'styled-components'

export const StyledModal = styled(Modal)`
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 350px;
  }
`
