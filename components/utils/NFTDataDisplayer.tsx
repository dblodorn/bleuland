import { useContext } from 'react'
import { NFTDataContext } from '@zoralabs/nft-components'

export const NFTDataDisplayer = () => {
  const { nft } = useContext(NFTDataContext)
  if (!nft) {
    return null
  }
  return (
    <div className='code-wrapper'>
      <code>
        <pre>{JSON.stringify(nft, null, 2)}</pre>
      </code>
    </div>
  )
}
