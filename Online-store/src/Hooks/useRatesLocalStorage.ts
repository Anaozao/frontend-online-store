import { useState } from "react";
import { RateTypes } from "../Types/Types";

function useRatesLocalStorage() {

  const [rateInfos, setRateInfos] = useState<RateTypes>(
    {rateEmail: '',
    rateName: '',
    rateTextarea: '',
    productId: ''})
  
  const getLocalStorageRates = () => {
    return JSON.parse(localStorage.getItem('rates') || '[]');
  }
  const [rates, setRates] = useState<RateTypes[]>(getLocalStorageRates())

  const handleRate = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setRates((prevRates) => {
      const itens = [...prevRates, rateInfos]
      localStorage.setItem('rates', JSON.stringify((itens)))
      return itens
    })
    setRateInfos({rateName: '', rateEmail: '', rateTextarea: '', productId: ''})
  }

  return {rates, handleRate, rateInfos, setRateInfos}
  
}

export default useRatesLocalStorage;