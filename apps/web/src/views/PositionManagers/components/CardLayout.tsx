import { CardHeader as CardHeaderComp, FlexLayout } from '@iguanadex/uikit'
import { styled } from 'styled-components'

export const CardLayout = styled(FlexLayout)`
  justify-content: flex-start;
`

export const CardHeader = styled(CardHeaderComp)`
  background: none;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
  padding: 1.5em 1.5em 0 1.5em;
`
