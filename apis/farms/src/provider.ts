import { ChainId } from '@iguanadex/chains'
import { Chain, createPublicClient, http, PublicClient } from 'viem'
import { arbitrum, bsc, bscTestnet, goerli, mainnet } from 'viem/chains'

const requireCheck = [
  ETH_NODE,
  GOERLI_NODE,
  BSC_NODE,
  BSC_TESTNET_NODE,
  POLYGON_ZKEVM_NODE,
  ZKSYNC_NODE,
  ARBITRUM_ONE_NODE,
  LINEA_NODE,
  BASE_NODE,
  OPBNB_NODE,
  OPBNB_TESTNET_NODE,
  ETHERLINK_NODE,
  ETHERLINK_TESTNET_NODE,
  NODE_REAL_SUBGRAPH_API_KEY,
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

const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(ETH_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
})

export const bscClient: PublicClient = createPublicClient({
  chain: bsc,
  transport: http(BSC_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
})

export const bscTestnetClient: PublicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(BSC_TESTNET_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
})

const goerliClient = createPublicClient({
  chain: goerli,
  transport: http(GOERLI_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
})

const arbitrumOneClient = createPublicClient({
  chain: arbitrum,
  transport: http(ARBITRUM_ONE_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
})

export const etherlinkTestnetClient: PublicClient = createPublicClient({
  chain: etherlinkTestnet,
  transport: http(ETHERLINK_TESTNET_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
})

export const etherlinkClient: PublicClient = createPublicClient({
  chain: etherlink,
  transport: http(ETHERLINK_NODE),
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
})

export const viemProviders = ({ chainId }: { chainId?: ChainId }): PublicClient => {
  switch (chainId) {
    case ChainId.ETHEREUM:
      return mainnetClient
    case ChainId.BSC:
      return bscClient
    case ChainId.BSC_TESTNET:
      return bscTestnetClient
    case ChainId.GOERLI:
      return goerliClient
    case ChainId.ARBITRUM_ONE:
      return arbitrumOneClient
    case ChainId.ETHERLINK_TESTNET:
      return etherlinkTestnetClient
    case ChainId.ETHERLINK:
      return etherlinkClient
    default:
      return bscClient
  }
}
