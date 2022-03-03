<<<<<<< HEAD
import { css } from '@emotion/react'
import { useContext } from 'react'
import { NavLink } from './utils/NavLink'
import { ConnectWallet } from './ConnectWallet'
import { useWalletButton } from '@zoralabs/simple-wallet-provider'
import { ContractDataContext } from '../context/ContractDataContext'

export const Header = () => {
  const { account } = useWalletButton()
  const { contractData } = useContext(ContractDataContext)
=======
import { NavLink } from './utils/NavLink'
import { ConnectWallet } from './ConnectWallet'
import { APP_TITLE } from "../utils/env-vars";

export const Header = () => {
>>>>>>> 8da4a1d8aeb7ad0bc7c9cf8e2c87f2934c99d1ae
  return (
    <>
      <header>
        <div className='flex-row'>
          <NavLink passHref href='/'>
<<<<<<< HEAD
            <a>{contractData?.name}</a>
=======
            <a>{APP_TITLE}</a>
>>>>>>> 8da4a1d8aeb7ad0bc7c9cf8e2c87f2934c99d1ae
          </NavLink>
          <NavLink passHref href='/about'>
            <a>About</a>
          </NavLink>
        </div>
        <div className='flex-row'>
          <NavLink passHref href='/manage'>
            <a>Manage</a>
          </NavLink>
          <ConnectWallet />
        </div>
      </header>
    </>
  )
}
