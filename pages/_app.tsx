import '../styles/reset.css'
import type { AppProps } from 'next/app'
import NProgress from 'next-nprogress-emotion'
import { NetworkIDs } from '@zoralabs/nft-hooks'
import { MediaConfiguration } from '@zoralabs/nft-components'
import { Web3ConfigProvider } from '@zoralabs/simple-wallet-provider'
import { mediaConfigurationStyles, web3ProviderStyles } from '../styles/theme'
import GlobalStyles from '../styles/GlobalStyles'
import { NETWORK_ID, RPC_URL } from '../utils/env-vars'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ContractDataProvider, ContractDataContext } from '../context/ContractDataContext'

import { useContractData } from '../hooks/useContractData'
import { useContext } from 'react'

function Styles() {
  const { contractData } = useContext(ContractDataContext)
  if (!contractData) {
    return null
  } else {
    return (
      <GlobalStyles theme={contractData?.project_content?.theme} />
    )
  }
}

export default function CreateMarketplaceApp({
  Component,
  pageProps,
}: AppProps) {

  return (
    <ContractDataProvider>
      <Web3ConfigProvider
        networkId={parseInt(NETWORK_ID as string, 10)}
        rpcUrl={(RPC_URL as string) || undefined}
        theme={web3ProviderStyles}
      >
        <Styles />
        <MediaConfiguration
          networkId={NETWORK_ID as NetworkIDs}
          style={mediaConfigurationStyles}
        >
          <Header />
          <NProgress color='#000000' showAfterMs={300} spinner={false} />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </MediaConfiguration>
      </Web3ConfigProvider>
    </ContractDataProvider>
  )
}
