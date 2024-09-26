import { ChainId } from '@iguanadex/chains'
import chunk from 'lodash/chunk'
import { PublicClient, parseUnits } from 'viem'
import { SerializedStableFarmConfig } from '../types'

const stableSwapAbi = [
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'coins',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'balances',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'i', type: 'uint256' },
      { internalType: 'uint256', name: 'j', type: 'uint256' },
      { internalType: 'uint256', name: 'dx', type: 'uint256' },
    ],
    name: 'get_dy',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export async function fetchStableFarmData(
  farms: SerializedStableFarmConfig[],
  chainId = ChainId.BSC,
  provider: ({ chainId }: { chainId: number }) => PublicClient,
) {
  const calls = farms.flatMap(
    (f) =>
      [
        {
          abi: stableSwapAbi,
          address: f.stableSwapAddress,
          functionName: 'balances',
          args: [BigInt(0)],
        },
        {
          abi: stableSwapAbi,
          address: f.stableSwapAddress,
          functionName: 'balances',
          args: [BigInt(1)],
        },
        {
          abi: stableSwapAbi,
          address: f.stableSwapAddress,
          functionName: 'get_dy',
          args: [BigInt(0), BigInt(1), parseUnits('1', f.token.decimals)],
        },
        {
          abi: stableSwapAbi,
          address: f.stableSwapAddress,
          functionName: 'get_dy',
          args: [BigInt(1), BigInt(0), parseUnits('1', f.quoteToken.decimals)],
        },
      ] as const,
  )

  const chunkSize = calls.length / farms.length

  const results = await provider({ chainId }).multicall({
    contracts: calls,
    allowFailure: false,
  })

  return chunk(results, chunkSize)
}
