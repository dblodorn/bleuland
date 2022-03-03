import { css } from '@emotion/react'
import { getStaticTokens } from '../services/getStaticTokens'
import { AuctionsList } from '../components/AuctionsList'
import { PageWrapper } from '../styles/components'
import { Head } from '../components/HeadMeta'
import { useContext } from 'react'
import { ContractDataContext } from '../context/ContractDataContext'
import { RawDisplayer } from '../components/utils'

export default function Home({ tokens }: { tokens: any }) {
  const { contractData } = useContext(ContractDataContext)

  return (
    <>
      <div css={css`padding: 0 var(--space-sm);`}>
        <RawDisplayer data={contractData} />
      </div>
      <PageWrapper grid>
        <Head
          title={contractData?.name}
        />
        <AuctionsList tokens={tokens} />
      </PageWrapper>
    </>
  )
}

export const getStaticProps = getStaticTokens
