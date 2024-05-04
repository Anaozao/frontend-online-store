import { productDetails } from "../Types/Types";

export const getByName = async (item: string, offset: number = 0) => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${item}&offset=${offset}`)
  if(!response.ok) {
    throw new Error('Erro ao realizar a requisição')
  }
  const data = response.json();

  return data

}

export const getByIdS = async (itemId: string) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${itemId}`)
  if (!response.ok) {
    throw new Error('Erro ao realizar a requisição')
  }
  const data = response.json();

  return data as unknown as productDetails
}

export const getCategoriesList = async () => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/categories`)
  if (!response.ok) {
    throw new Error('Erro ao realizar a requisição')
  }
  const data = response.json();

  return data
}

export const getCategory = async (categoryId: string, offset: number = 0) => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&offset=${offset}`)
  if (!response.ok) {
    throw new Error('Erro ao realizar a requisição')
  }
  const data = response.json();

  return data
}

export const getCategoryAtributes = async (categoryId: string) => {
  const response = await fetch(`https://api.mercadolibre.com/categories/${categoryId}/attributes`)
  if (!response.ok) {
    throw new Error('Erro ao realizar a requisição')
  }
  const data = response.json();

  return data
}