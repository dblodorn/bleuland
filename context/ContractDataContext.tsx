import React, {
  createContext,
  ReactElement,
} from 'react'
import { useContractData } from '../hooks/useContractData'

export type ContractDataContextProps = {
  children?: ReactElement
}

export const ContractDataContext = createContext<any>(undefined);

export const ContractDataProvider: React.FC<ContractDataContextProps> = ({
  children
}) => {
  const contractData = useContractData()

  return (
    <ContractDataContext.Provider value={{
      children,
      contractData
    }}>
      {children}
    </ContractDataContext.Provider>
  );
}
