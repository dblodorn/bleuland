import { css } from '@emotion/react'
import { getStaticTokens } from '../services/getStaticTokens'
import { AuctionsList } from '../components/AuctionsList'
import { PageWrapper } from '../styles/components'
import { Head } from '../components/HeadMeta'
import { useContext } from 'react'
import { ContractDataContext } from '../context/ContractDataContext'
import { RawDisplayer } from '../components/utils'

/* VANILLA */
import * as styles from "../vanilla/styles.css";

export default function Home({ tokens }: { tokens: any }) {
  const { contractData } = useContext(ContractDataContext)

  return (
    <>
      <PageWrapper grid>
        <Head
          title={contractData?.name}
        />
        <AuctionsList tokens={tokens} />
      </PageWrapper>
      <div className={styles.card}>
        <RawDisplayer data={contractData} />
      </div>
    </>
  )
}

export const getStaticProps = getStaticTokens
