import {
  createContext,
  ReactElement,
  useEffect,
  useState
} from 'react'
import { useContractABI } from '../hooks/useContractABI'

import { CONTRACT_ADDRESSES } from '../utils/env-vars'

export type ContractDataContextProps = {
  children?: ReactElement
}

export const ContractDataContext = createContext<any>(undefined);

export const ContractDataProvider: React.FC<ContractDataContextProps> = ({
  children
}) => {
  const { abi } = useContractABI()
  const [contractData, setContractData] = useState<any>(undefined)
  
  console.log('abi', abi)

  return (
    <ContractDataContext.Provider value={{
      children,
      contractData,
      setContractData,
      contractABI: abi
    }}>
      {children}
    </ContractDataContext.Provider>
  );
}
