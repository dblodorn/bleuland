import '../styles/reset.css'
import type { AppProps } from 'next/app'
import NProgress from 'next-nprogress-emotion'
import { NetworkIDs } from '@zoralabs/nft-hooks'
import { MediaConfiguration } from '@zoralabs/nft-components'
import { Web3ConfigProvider } from '@zoralabs/simple-wallet-provider'
import { mediaConfigurationStyles, web3ProviderStyles } from '../styles/theme'
import GlobalStyles from '../styles/GlobalStyles'
import { NETWORK_ID, RPC_URL, CONTRACT_ADDRESSES } from '../utils/env-vars'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { ContractDataProvider, ContractDataContext } from '../context/ContractDataContext'
import { useContext, useEffect } from 'react'
import { useContractRead, WagmiProvider } from 'wagmi'

function ContractData({ABI}: {ABI: any}) {
  const { setContractData, contractData } = useContext(ContractDataContext)

  const [{ data, error, loading }, read] = useContractRead(
    {
      addressOrName: CONTRACT_ADDRESSES,
      contractInterface: ABI,
    },
    'contractURI',
  )

  useEffect(() => {
    if (data) {
      /* @ts-ignore */
      fetch(data).then(response => {
        return response.json();
      }).then(data => {
        setContractData(data)
      })
    }
  }, [data])

  if (!contractData) {
    return null
  } else {
    return <GlobalStyles theme={contractData?.project_content?.theme} />
  }
}

function Styles() {
  const { contractABI } = useContext(ContractDataContext)
  if (!contractABI) {
    return null
  } else {
    return <ContractData ABI={contractABI?.abi}/>
  }
}

export default function CreateMarketplaceApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <WagmiProvider>
      <Web3ConfigProvider
        networkId={parseInt(NETWORK_ID as string, 10)}
        rpcUrl={(RPC_URL as string) || undefined}
        theme={web3ProviderStyles}
      > 
        <ContractDataProvider>
          <div>
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
              {/*<Footer />*/}
            </MediaConfiguration>
          </div>
        </ContractDataProvider>
      </Web3ConfigProvider>
    </WagmiProvider>
  )
}
