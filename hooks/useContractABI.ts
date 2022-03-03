import { useEffect, useState } from "react";
import { CONTRACT_ADDRESSES } from "../utils/env-vars";

export function useContractABI() {
  const [contractABI, setContractABI] = useState<any>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  
  useEffect(() => {
    fetch(`https://ether.actor/${CONTRACT_ADDRESSES}.json`).then(response => {
      return response.json();
    }).then(data => {
      setContractABI(data)
      setLoading(false)
    }).catch(err => {
      setLoading(false)
      setError(err)
    })
  }, [])

  return {
    loading,
    error,
    abi: contractABI
  }
}
