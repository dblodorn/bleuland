import { css } from '@emotion/react'
import { useContext } from 'react'
import { ContractDataContext } from '../context/ContractDataContext'
import { NavLink } from './utils/NavLink'
import { ConnectWallet } from './ConnectWallet'
import { useWalletButton } from '@zoralabs/simple-wallet-provider'

export const Header = () => {
  const { account } = useWalletButton()
  const { contractData } = useContext(ContractDataContext)
  return (
    <>
      <header className='flex flex-row justify-between'>
        <div className='flex flex-row'>
          <NavLink passHref href='/'>
            <a>{contractData?.name}</a>
          </NavLink>
          <NavLink passHref href='/about'>
            <a>About</a>
          </NavLink>
        </div>
        <div className='flex flex-row'>
          {account && (
            <>
              <NavLink passHref href='/mint'>
                <a>Mint</a>
              </NavLink>
              <NavLink passHref href='/manage'>
                <a>Manage</a>
              </NavLink>
            </>
          )}
          <ConnectWallet />
        </div>
      </header>
    </>
  )
}
