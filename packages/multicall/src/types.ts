import { BigintIsh } from '@iguanadex/sdk'
import type { Address } from 'viem'

export type MulticallRequest = {
  target: Address
  callData: string
}

export type MulticallRequestWithGas = MulticallRequest & {
  gasLimit: BigintIsh
}
