import { ContextApi } from '@iguanadex/localization'
import memoize from 'lodash/memoize'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'IguanaDEX',
  description: 'One-stop decentralized trading',
  image: `https://iguanadex.com/images/hero.jpg`,
}

interface PathList {
  paths: { [path: string]: { title: string; basePath?: boolean; description?: string; image?: string } }
  defaultTitleSuffix: string
}

const getPathList = (t: ContextApi['t']): PathList => {
  return {
    paths: {
      '/': { title: t('Home') },
      '/swap': { basePath: true, title: t('Exchange'), image: `https://iguanadex.com/images/hero.jpg` },
      '/limit-orders': { basePath: true, title: t('Limit Orders'), image: `https://iguanadex.com/images/hero.jpg` },
      '/add': { basePath: true, title: t('Add Liquidity'), image: `https://iguanadex.com/images/hero.jpg` },
      '/remove': { basePath: true, title: t('Remove Liquidity'), image: `https://iguanadex.com/images/hero.jpg` },
      '/liquidity': { title: t('Liquidity'), image: `https://iguanadex.com/images/hero.jpg` },
      '/find': { title: t('Import Pool') },
      '/competition': { title: t('Trading Battle') },
      '/prediction': { title: t('Prediction'), image: `https://iguanadex.com/images/hero.jpg` },
      '/prediction/leaderboard': { title: t('Leaderboard'), image: `https://iguanadex.com/images/hero.jpg` },
      '/farms': { title: t('Farms'), image: `https://iguanadex.com/images/hero.jpg` },
      '/farms/auction': { title: t('Farm Auctions'), image: `https://iguanadex.com/images/hero.jpg` },
      '/pools': { title: t('Pools'), image: `https://iguanadex.com/images/hero.jpg` },
      '/lottery': { title: t('Lottery'), image: `https://iguanadex.com/images/hero.jpg` },
      '/ifo': { title: t('Initial Farm Offering'), image: `https://iguanadex.com/images/hero.jpg` },
      '/teams': { basePath: true, title: t('Leaderboard'), image: `https://iguanadex.com/images/hero.jpg` },
      '/voting': { basePath: true, title: t('Voting'), image: `https://iguanadex.com/images/hero.jpg` },
      '/voting/proposal': { title: t('Proposals'), image: `https://iguanadex.com/images/hero.jpg` },
      '/voting/proposal/create': { title: t('Make a Proposal'), image: `https://iguanadex.com/images/hero.jpg` },
      '/info': {
        title: `${t('Overview')} - ${t('Info')}`,
        description: 'View IguanaDEX Volume/TVL stats.',
        image: `https://iguanadex.com/images/hero.jpg`,
      },
      '/info/pairs': {
        title: `${t('Pairs')} - ${t('Info')}`,
        description: 'View IguanaDEX Volume/TVL stats.',
        image: `https://iguanadex.com/images/hero.jpg`,
      },
      '/info/tokens': {
        title: `${t('Tokens')} - ${t('Info')}`,
        description: 'View IguanaDEX Volume/TVL stats.',
        image: `https://iguanadex.com/images/hero.jpg`,
      },
      '/nfts': { title: t('NFT Marketplace'), image: `https://iguanadex.com/images/hero.jpg` },
      '/nfts/collections': { basePath: true, title: t('Collections'), image: `https://iguanadex.com/images/hero.jpg` },
      '/nfts/activity': { title: t('Activity'), image: `https://iguanadex.com/images/hero.jpg` },
      '/profile': { basePath: true, title: t('Profile') },
      '/pancake-squad': { basePath: true, title: t('Pancake Squad') },
      '/pottery': { basePath: true, title: t('Pottery'), image: `https://iguanadex.com/images/hero.jpg` },
    },
    defaultTitleSuffix: t('IguanaDEX'),
  }
}

export const getCustomMeta = memoize(
  (path: string, t: ContextApi['t'], _: string): PageMeta | null => {
    const pathList = getPathList(t)
    const basePath = Object.entries(pathList.paths).find(([url, data]) => data.basePath && path.startsWith(url))?.[0]
    const pathMetadata = pathList.paths[path] ?? (basePath && pathList.paths[basePath])

    if (pathMetadata) {
      return {
        title: `${pathMetadata.title}`,
        ...(pathMetadata.description && { description: pathMetadata.description }),
        image: pathMetadata.image,
      }
    }
    return null
  },
  (path, t, locale) => `${path}#${locale}`,
)
