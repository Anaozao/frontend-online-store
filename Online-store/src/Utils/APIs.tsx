export const getByName = async (item: string) => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q={${item}}`)
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

  return data
}

export const getCategoriesList = async () => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/categories`)
  if (!response.ok) {
    throw new Error('Erro ao realizar a requisição')
  }
  const data = response.json();

  return data
}

export const getCategory = async (categoryId: string) => {
  const response = await fetch(`https://api.mercadolibre.com/categories/{${categoryId}}`)
  if (!response.ok) {
    throw new Error('Erro ao realizar a requisição')
  }
  const data = response.json();

  return data
}

export const getCategoryAtributes = async (categoryId: string) => {
  const response = await fetch(`https://api.mercadolibre.com/categories/{${categoryId}}/attributes`)
  if (!response.ok) {
    throw new Error('Erro ao realizar a requisição')
  }
  const data = response.json();

  return data
}