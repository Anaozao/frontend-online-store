import { useState } from "react";
import { CartItensTypes } from "../Types/Types";

function useLocalStorage() {

  const getCartItens = () => {
    return JSON.parse(localStorage.getItem('cartItens') || '[]')
  }
  
  const [cartItens, setCartItens] = useState<CartItensTypes[]>(getCartItens())
  
  const addToCart = (item: CartItensTypes) => {
    setCartItens((prevItens) => {
     const itens =  [...prevItens, item]
     localStorage.setItem('cartItem', JSON.stringify([...itens]))
     return itens;
    }
  
  )}

  const removeItem = (id: string) => {
    const index = cartItens.findIndex((item) => item.id === id)

    if (index !== -1) {
      const newCartItens = [...cartItens];

      newCartItens.splice(index, 1)
      
      localStorage.setItem('cartItem', JSON.stringify(newCartItens))

      setCartItens(newCartItens)
    }
  }

  const removeAll = (id: string) => {
    const itens = cartItens.filter((item) => item.id !== id)

    setCartItens(itens)
    localStorage.setItem('cartItem', JSON.stringify(itens))
    return itens;
  }

  const clearCard = () => {
    setCartItens([])
    localStorage.setItem('cartItem', '[]')
  }

  return {cartItens, addToCart, removeItem, removeAll, getCartItens, clearCard};
}

export default useLocalStorage;