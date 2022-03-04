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
import { ContractDataProvider, ContractDataContext } from '../context/ContractDataContext'
import { useContext, useEffect, ReactElement, Fragment } from 'react'
import { useContractRead, WagmiProvider } from 'wagmi'
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { vars } from "../vanilla/vars.css";

function ContractData({
  ABI,
  children
}: {
  ABI: any,
  children?: ReactElement
}) {
  const { setContractData, contractData } = useContext(ContractDataContext)

  const [{ data }] = useContractRead(
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
    return (
      <>
        <GlobalStyles theme={contractData?.project_content?.theme} />
        <div
          id="theme-wrapper"
          style={assignInlineVars({
            [vars.test]: contractData?.project_content?.theme.colors.primary
          })}
        >
          {children}
        </div>
      </>
    )
  }
}

function ThemeWrapper({
  children
}: {
  children?: ReactElement
}) {
  const { contractABI } = useContext(ContractDataContext)
  if (!contractABI) {
    return null
  } else {
    return (
      <ContractData ABI={contractABI?.abi}>
        {children}
      </ContractData>
    )
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
          <MediaConfiguration
            networkId={NETWORK_ID as NetworkIDs}
            style={mediaConfigurationStyles}
          >
            <ThemeWrapper>
              <Fragment>
                <Header />
                <NProgress color='#000000' showAfterMs={300} spinner={false} />
                <main>
                  <Component {...pageProps} />
                </main>
              </Fragment>
            </ThemeWrapper>
          </MediaConfiguration>
        </ContractDataProvider>
      </Web3ConfigProvider>
    </WagmiProvider>
  )
}
