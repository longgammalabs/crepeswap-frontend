import { ChainId, getV3Subgraphs } from '@pancakeswap/chains'
import { OnChainProvider, SubgraphProvider } from '@pancakeswap/smart-router'
import { GraphQLClient } from 'graphql-request'
import { Chain, createPublicClient, http } from 'viem'
import { bsc, bscTestnet, goerli, mainnet } from 'viem/chains'

import { SupportedChainId } from './constants'

const requireCheck = [
  ETH_NODE,
  GOERLI_NODE,
  BSC_NODE,
  BSC_TESTNET_NODE,
  NODE_REAL_SUBGRAPH_API_KEY,
  ETHERLINK_TESTNET_NODE,
  ETHERLINK_NODE,
]
requireCheck.forEach((node) => {
  if (!node) {
    throw new Error('Missing env var')
  }
})

const etherlinkTestnet = {
  id: 128_123,
  name: 'Etherlink Testnet',
  network: 'etherlink-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'tez',
    symbol: 'XTZ',
  },
  rpcUrls: {
    public: { http: ['https://node.ghostnet.etherlink.com'] },
    default: { http: ['https://node.ghostnet.etherlink.com'] },
  },
  blockExplorers: {
    etherscan: { name: 'Testnet Etherscout', url: 'https://testnet.explorer.etherlink.com/' },
    default: { name: 'Testnet Etherscout', url: 'https://testnet.explorer.etherlink.com/' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 220050,
    },
  },
  testnet: true,
} as const satisfies Chain

const etherlink = {
  id: 42_793,
  name: 'Etherlink',
  network: 'etherlink',
  nativeCurrency: {
    decimals: 18,
    name: 'tez',
    symbol: 'XTZ',
  },
  rpcUrls: {
    public: { http: ['https://node.mainnet.etherlink.com'] },
    default: { http: ['https://node.mainnet.etherlink.com'] },
  },
  blockExplorers: {
    etherscan: { name: 'Etherscout', url: 'https://explorer.etherlink.com/' },
    default: { name: 'Etherscout', url: 'https://explorer.etherlink.com/' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 33899,
    },
  },
} as const satisfies Chain

const V3_SUBGRAPHS = getV3Subgraphs({
  noderealApiKey: NODE_REAL_SUBGRAPH_API_KEY,
})

const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(ETH_NODE),
})

const bscClient = createPublicClient({
  chain: bsc,
  transport: http(BSC_NODE),
})

const bscTestnetClient = createPublicClient({
  chain: bscTestnet,
  transport: http(BSC_TESTNET_NODE),
})

const goerliClient = createPublicClient({
  chain: goerli,
  transport: http(GOERLI_NODE),
})

const etherlinkClient = createPublicClient({
  chain: etherlink,
  transport: http(ETHERLINK_NODE),
})

const etherlinkTestnetClient = createPublicClient({
  chain: etherlinkTestnet,
  transport: http(ETHERLINK_TESTNET_NODE),
})

// @ts-ignore
export const viemProviders: OnChainProvider = ({ chainId }: { chainId?: ChainId }) => {
  switch (chainId) {
    case ChainId.ETHEREUM:
      return mainnetClient
    case ChainId.BSC:
      return bscClient
    case ChainId.BSC_TESTNET:
      return bscTestnetClient
    case ChainId.GOERLI:
      return goerliClient
    case ChainId.ETHERLINK_TESTNET:
      return etherlinkTestnetClient
    case ChainId.ETHERLINK:
      return etherlinkClient
    default:
      return bscClient
  }
}

export const v3SubgraphClients: Record<SupportedChainId, GraphQLClient> = {
  [ChainId.ETHEREUM]: new GraphQLClient(V3_SUBGRAPHS[ChainId.ETHEREUM], { fetch }),
  [ChainId.POLYGON_ZKEVM]: new GraphQLClient(V3_SUBGRAPHS[ChainId.POLYGON_ZKEVM], { fetch }),
  [ChainId.ZKSYNC]: new GraphQLClient(V3_SUBGRAPHS[ChainId.ZKSYNC], { fetch }),
  [ChainId.LINEA_TESTNET]: new GraphQLClient(V3_SUBGRAPHS[ChainId.LINEA_TESTNET], { fetch }),
  [ChainId.GOERLI]: new GraphQLClient(V3_SUBGRAPHS[ChainId.GOERLI], { fetch }),
  [ChainId.BSC]: new GraphQLClient(V3_SUBGRAPHS[ChainId.BSC], { fetch }),
  [ChainId.BSC_TESTNET]: new GraphQLClient(V3_SUBGRAPHS[ChainId.BSC_TESTNET], { fetch }),
  [ChainId.ARBITRUM_ONE]: new GraphQLClient(V3_SUBGRAPHS[ChainId.ARBITRUM_ONE], { fetch }),
  [ChainId.LINEA]: new GraphQLClient(V3_SUBGRAPHS[ChainId.LINEA], { fetch }),
  [ChainId.SCROLL_SEPOLIA]: new GraphQLClient(V3_SUBGRAPHS[ChainId.SCROLL_SEPOLIA], { fetch }),
  [ChainId.BASE_TESTNET]: new GraphQLClient(V3_SUBGRAPHS[ChainId.BASE_TESTNET], { fetch }),
  [ChainId.BASE]: new GraphQLClient(V3_SUBGRAPHS[ChainId.BASE], { fetch }),
  [ChainId.OPBNB]: new GraphQLClient(V3_SUBGRAPHS[ChainId.OPBNB], { fetch }),
  [ChainId.ETHERLINK_TESTNET]: new GraphQLClient(V3_SUBGRAPHS[ChainId.ETHERLINK_TESTNET], { fetch }),
  [ChainId.ETHERLINK]: new GraphQLClient(V3_SUBGRAPHS[ChainId.ETHERLINK], { fetch }),
} as const

export const v3SubgraphProvider: SubgraphProvider = ({ chainId = ChainId.BSC }: { chainId?: ChainId }) => {
  return v3SubgraphClients[chainId as SupportedChainId] || v3SubgraphClients[ChainId.BSC]
}
