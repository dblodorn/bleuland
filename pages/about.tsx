import { Head } from '../components/HeadMeta'
import { useContext } from 'react'
import { ContractDataContext } from '../context/ContractDataContext'
import { PageWrapper } from '../styles/components'

export default function About() {
  const { contractData } = useContext(ContractDataContext)
  return (
    <>
      <Head title={'About'} />
      <PageWrapper>
        {contractData && <p>{contractData?.description}</p>}
      </PageWrapper>
    </>
  )
}
