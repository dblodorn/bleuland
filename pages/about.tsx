import { css } from '@emotion/react'
import { Head } from '../components/HeadMeta'
import readMe from '../README.md'
import { useContext } from 'react'
import { ContractDataContext } from '../context/ContractDataContext'
import { MarkDown } from '../components/utils'
import { PageWrapper } from '../styles/components'

export default function About() {

  const { contractData } = useContext(ContractDataContext)
  return (
    <>
      <Head title={'About'} />
      <PageWrapper>
        
        <p>{contractData?.description}</p>
        {/*<MarkDown markdown={readMe} />*/}
      </PageWrapper>
    </>
  )
}
