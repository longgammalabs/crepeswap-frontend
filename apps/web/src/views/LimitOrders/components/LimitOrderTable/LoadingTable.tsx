import { Skeleton, Table, Td } from '@iguanadex/uikit'
import { memo } from 'react'

const LoadingTable = () => (
  <Table>
    <tbody>
      <tr>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
      </tr>
      <tr>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
      </tr>
      <tr>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
        <Td>
          <Skeleton />
        </Td>
      </tr>
    </tbody>
  </Table>
)

export default memo(LoadingTable)
