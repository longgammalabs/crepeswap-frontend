import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | IguanaDEX',
  defaultTitle: 'IguanaDEX',
  description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@IguanaDEX',
    site: '@IguanaDEX',
  },
  openGraph: {
    title: "🦎 IguanaDEX - Everyone's Favorite DEX",
    description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
    images: [{ url: 'https://iguanadex.com/images/hero.jpg' }],
  },
}
