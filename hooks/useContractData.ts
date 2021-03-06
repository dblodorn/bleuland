import { useEffect, useState } from "react";
import { CONTRACT_ADDRESSES } from "../utils/env-vars";

export function useContractData() {
  const [contractData, setContractData] = useState<any>(undefined)
  const [contractABI, setContractABI] = useState<any>(undefined)
  
  useEffect(() => {
    fetch(`https://ether.actor/${CONTRACT_ADDRESSES}.json`).then(response => {
      return response.json();
    }).then(data => {
      setContractABI(data)
    })
  }, [])

  useEffect(() => {
    fetch('https://db13.mypinata.cloud/ipfs/QmRZ4j9HG8nwK8VbF7iav2mWUUYrJiUwobzSQTVixAGvcC').then(response => {
      return response.json();
    }).then(data => {
      setContractData(data)
    })
  }, [])

  return {
    contractData,
    contractABI
  }
}
