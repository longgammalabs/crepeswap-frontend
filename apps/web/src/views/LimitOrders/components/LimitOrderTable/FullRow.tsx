import { Order } from '@gelatonetwork/limit-orders-lib'
import { IconButton, MoreHorizontalIcon, SyncAltIcon, Td, useModal } from '@iguanadex/uikit'
import React from 'react'

import useFormattedOrderData from 'views/LimitOrders/hooks/useFormattedOrderData'
import CellFormat from './CellFormat'
import CurrencyFormat from './CurrencyFormat'
import { DetailLimitOrderModal } from './DetailLimitOrderModal'
import OrderStatus, { StatusElementType } from './OrderStatus'
import TextIcon from './TextIcon'

const FullRow: React.FC<React.PropsWithChildren<{ order: Order }>> = ({ order }) => {
  const formattedOrder = useFormattedOrderData(order)
  const { inputToken, outputToken, inputAmount, outputAmount, executionPrice } = formattedOrder
  const [openDetailLimitOrderModal] = useModal(<DetailLimitOrderModal order={order} formattedOrder={formattedOrder} />)
  return (
    <tr>
      <Td>
        <CellFormat firstRow={inputAmount} secondRow={<CurrencyFormat bold currency={inputToken} />} />
      </Td>
      <Td>
        <CellFormat firstRow={outputAmount} secondRow={<CurrencyFormat bold currency={outputToken} />} />
      </Td>
      <Td>
        <CellFormat
          firstRow={executionPrice}
          secondRow={<TextIcon text={`${outputToken?.symbol}/${inputToken?.symbol}`} icon={<SyncAltIcon />} />}
        />
      </Td>
      <Td>
        <OrderStatus formattedOrder={formattedOrder} showOpenTag element={StatusElementType.TEXT} />
      </Td>
      <Td>
        <IconButton variant="text" onClick={openDetailLimitOrderModal}>
          <MoreHorizontalIcon />
        </IconButton>
      </Td>
    </tr>
  )
}

export default FullRow
