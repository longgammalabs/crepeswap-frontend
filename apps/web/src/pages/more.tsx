import { Image, Link, Text } from '@iguanadex/uikit'
import { Container } from './terms-of-service'

const Agreement = () => {
  return (
    <Container>
      <Image
        src="https://raw.githubusercontent.com/IguanaDEX/assets/main/iguana_brand_assets/iggies-club.webp"
        alt="Iggy"
        width={185}
        height={108}
      />
      <Text as="h1">There is a lot more to Etherlink!</Text>
      <Text as="p">
        The below resources are all directly available from the dropdown menu associated with the More icon. We will
        keep adding more resources as we continue to develop IguanaDEX and all the links should be available here.
      </Text>

      <Text as="h3">1. Bridge</Text>
      <Text as="p">
        <Link href="https://etherlinkbridge.com">https://etherlinkbridge.com</Link>
        The Etherlink Bridge is an easy way to send your tokens to Etherlink from <strong>six major chains</strong>:
        Ethereum, Base, Arbitrum One, OP Mainnet, BNB Chain, and Avalanche.
      </Text>
      <Text as="h3">2. IguanaDEX Documentation</Text>
      <Text as="p">
        <Link href="https://docs.iguanadex.com">https://docs.iguanadex.com</Link>
        This is the most up-to-date source of information on IguanaDEX.
      </Text>
      <Text as="h3">3. Etherlink Documentation</Text>
      <Text as="p">
        <Link href="https://docs.etherlink.com">https://docs.etherlink.com</Link>
        Use this for a wider overview of the Etherlink ecosystem and the inner working of the chain.
      </Text>
    </Container>
  )
}

Agreement.chains = []

export default Agreement
