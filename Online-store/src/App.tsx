
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import Home from './Pages/Home/Home'
import { getByName, getCategoriesList, getCategory } from './Utils/APIs'
import CartPage from './Pages/CartPage/CartPage'
import { HomeProps } from './Types/Types'

function App() {
  const [searchInputValue, setSearchInputValue] = useState({search: ''})
  const [searchByName, setSearchByName] = useState({results: []})
  const [resultsByCategory, setResultsByCategori] = useState({results: []})
  const [cartCount, setCartCount] = useState(0)
  const [categories, setCategories] = useState<HomeProps['categories']>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [cartItens, setCartItens] = useState([])
  const [nameSearch, setNameSearch] = useState(false)
  const [categorySearch, setCategorySearch] = useState(false)
  // const [page, setPage] = useState(0)

  useEffect(() => {
    setCartCount(cartItens.length)
  }, [cartItens])

  useEffect(() => {
    setLoading(true)
    const fetchCategories = async () => {
      try {
        const response = await getCategoriesList()
        setCategories(response)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])
  
  const handleSeachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue((prevState) => (
      {
        ...prevState,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleSearch = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchLoading(true)
    setCategorySearch(false)
    setNameSearch(true)
    try {
      const response = await getByName(searchInputValue.search)
      setSearchByName(response)
    } catch (error) {
      console.error(error)
    } finally {
      setSearchLoading(false)
      setSearch(true)
    }
  }

  const handleCategory = async (e: string) => {
    setSearchLoading(true)
    setCategorySearch(true)
    setNameSearch(false)
    try {
      const response = await getCategory(e)
      setResultsByCategori(response)
    } catch (error) {
      console.error(error)
    } finally {
      setSearchLoading(false)
      setSearch(true)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const {scrollHeight, clientHeight, scrollTop} = document.documentElement;
      if (scrollTop + clientHeight + 1 >= scrollHeight) {
        console.log('chegou ao fim')
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[])


  return (
    <Routes >
      <Route 
        path='/' 
        element={<Layout
          onChange={handleSeachChange}
          cartCount={cartCount}
          onSearch={handleSearch}
          />}
        >
            <Route index element={<Home
              categories={categories}
              loading={loading}
              nameResults={searchByName.results}
              categoryResults={resultsByCategory}
              search={search}
              searchLoading={searchLoading}
              setCartItens={setCartItens}
              handleCategory={handleCategory}
              nameSearch={nameSearch}
              categorySearch={categorySearch}
              />}
            />
            <Route
              path='/cart'
              element={
                <CartPage
                  cartItens={cartItens}
                  setCartItens={setCartItens}
                />
              }/>
      </Route>
    </Routes>
  )
}

export default App
