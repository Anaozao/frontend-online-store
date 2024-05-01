
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import Home from './Pages/Home/Home'
import { getByName, getCategoriesList } from './Utils/APIs'

function App() {
  const [searchInputValue, setSearchInputValue] = useState({search: ''})
  const [searchResults, setSearchResults] = useState({})
  const [cartCount, setCartCount] = useState(0)
  const [categories, setCategories] = useState<object[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)

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

  const handleSearch = async (e: React.FocusEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchLoading(true)
    try {
      const response = await getByName(searchInputValue.search)
      setSearchResults(response)
    } catch (error) {
      console.error(error)
    } finally {
      setSearchLoading(false)
      setSearch(true)
    }
  }
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
              results={searchResults.results}
              search={search}
              searchLoading={searchLoading}
              />}
            />
      </Route>
    </Routes>
  )
}

export default App
