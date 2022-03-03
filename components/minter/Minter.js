import { useState, useCallback, useEffect } from 'react'
import { useInput } from '../../hooks/useInput'
import { useWalletButton } from '@zoralabs/simple-wallet-provider'
import { useContractInfo } from '../../hooks/useContractInfo'
import { css } from '@emotion/react'
import { inputStyle } from '../../styles/mixins'

const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_RPC_URL)

const mintNFT = async (tokenURI, contractABI, contractAddress, userAddress) => {
  if (tokenURI.trim() === '') {
    return {
      success: false,
      status: '❗Please enter a valid metadata URI.',
    }
  }

  const nftContract = await new web3.eth.Contract(
    contractABI.abi,
    contractAddress
  )

  const transactionParameters = {
    to: contractAddress,
    from: userAddress,
    data: nftContract.methods.mint(tokenURI).encodeABI(),
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    })
    return {
      success: true,
      status: txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    }
  }
}

export const Minter = () => {
  const [status, setStatus] = useState('')
  const [success, setSuccess] = useState(false)
  const [contract, setContract] = useState(undefined)

  const { value: tokenURI, bind: bindTokenURI } = useInput('')

  const contractABI = useContractInfo(
    process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS
  )
  const { account } = useWalletButton()

  const onMint = useCallback(async () => {
    const { success, status } = await mintNFT(
      tokenURI,
      contractABI,
      process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS,
      account.address
    )
    setStatus(status)
    setSuccess(success)
  }, [contractABI, tokenURI, account])

  useEffect(() => {
    async function getContract() {
      try {
        const nftContract = await new web3.eth.Contract(
          contractABI.abi,
          process.env.NEXT_PUBLIC_TARGET_CONTRACT_ADDRESS
        )
        setContract(nftContract)
      } catch (err) {
        console.log(err)
      }
    }
    getContract()
  }, [contractABI])

  useEffect(() => {
    console.log(contract)
  }, [contract])

  return (
    <div className='Minter'>
      <form>
        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0 20px',
            height: 40,
            width: '100%',
            borderRadius: 4,
            position: 'relative',
            backgroundColor: '#fff',
            marginBottom: 20,
          }}
        >
          <input
            {...bindTokenURI}
            type='text'
            placeholder='Enter your NFT tokenURI'
            css={{ ...inputStyle }}
          />
        </div>
      </form>
      <button className='button' id='mintButton' onClick={onMint}>
        Mint NFT
      </button>
      <div
        css={css`
          margin-top: 20px;
          text-align: center;
        `}
        style={{ color: success ? 'blue' : 'red' }}
      >
        {success ? (
          <p>
            Congratulations your nft has been minted
            <br />
            Check out your transaction on Etherscane:{' '}
            <a href={`https://rinkeby.etherscan.io/tx/${status}`}>
              tx: {status}
            </a>
          </p>
        ) : (
          <p>{status}</p>
        )}
      </div>
    </div>
  )
}
