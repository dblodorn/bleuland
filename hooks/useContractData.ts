import { useEffect, useState } from "react";

export function useContractData() {
  const [contractData, setContractData] = useState<any>(undefined)
  
  useEffect(() => {
    fetch('https://db13.mypinata.cloud/ipfs/QmRZ4j9HG8nwK8VbF7iav2mWUUYrJiUwobzSQTVixAGvcC').then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      setContractData(data)
    })
  }, [])

  if (!contractData) {
    return undefined
  } else {
    return contractData
  }
}
