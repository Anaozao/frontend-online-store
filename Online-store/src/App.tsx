/* eslint-disable react-hooks/exhaustive-deps */

import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import Home from './Pages/Home/Home'
import { getByName, getCategoriesList, getCategory } from './Utils/APIs'
import CartPage from './Pages/CartPage/CartPage'
import { HomeProps, fetchTypes } from './Types/Types'
import ProductPage from './Pages/ProductPage/ProductPage'
import useLocalStorage from './Hooks/useLocalStorage'

function App() {
  const [searchInputValue, setSearchInputValue] = useState({search: ''})
  const [searchByName, setSearchByName] = useState<fetchTypes[]>([])
  const [resultsByCategory, setResultsByCategori] = useState<fetchTypes[]>([])
  const [categories, setCategories] = useState<HomeProps['categories']>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [nameSearch, setNameSearch] = useState(false)
  const [categorySearch, setCategorySearch] = useState(false)
  const [category, setCategory] = useState('')
  const [offset, setOffset] = useState(0)
  const [sort, setSort] = useState('Menor')
  const navigate = useNavigate();
  const LOCALSTORAGE = useLocalStorage()

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
    setOffset(0)
    try {
      const response = await getByName(searchInputValue.search, offset)
      console.log(response.results)
      setSearchByName(response.results)
    } catch (error) {
      console.error(error)
    } finally {
      navigate('')
      setSearchLoading(false)
      setSearch(true)
    }
  }

  const handleCategory = async (e: string) => {
    setSearchLoading(true)
    setCategorySearch(true)
    setNameSearch(false)
    setOffset(0)
    try {
      const response = await getCategory(e, offset)
      setResultsByCategori(response.results)
    } catch (error) {
      console.error(error)
    } finally {
      setCategory(e)
      setSearchLoading(false)
      setSearch(true)
    }
  }

  useEffect(() => {
    const getData = async () => {
      if(nameSearch) {
        setSearchLoading(true)
        setCategorySearch(false)
        try {
          const response = await getByName(searchInputValue.search, offset)
          setSearchByName((prev) => [...prev, ...response.results])
          setNameSearch(true)
        } catch (error) {
          console.error(error)
        } finally {
          setSearchLoading(false)
          setSearch(true)
        }
      }
      if (categorySearch) {
        setSearchLoading(true)
        setNameSearch(false)
        try {
          const response = await getCategory(category, offset)
          setResultsByCategori((prev) => [...prev, ...response.results])
          setCategorySearch(true)
        } catch (error) {
          console.error(error)
        } finally {
          setSearchLoading(false)
          setSearch(true)
        }
      }
    }
    getData()
  }, [offset])

  useEffect(() => {
      const handleScroll = async () => {
      
        const {scrollHeight, clientHeight, scrollTop} = document.documentElement;
        if (scrollTop + clientHeight + 1 >= scrollHeight) {
          setOffset((prev) => prev + 50)
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
          onSearch={handleSearch}
          cartItens={LOCALSTORAGE.cartItens}
          />}
        >
            <Route index element={<Home
              categories={categories}
              loading={loading}
              nameResults={searchByName}
              categoryResults={resultsByCategory}
              search={search}
              searchLoading={searchLoading}
              handleCategory={handleCategory}
              nameSearch={nameSearch}
              categorySearch={categorySearch}
              setSearchByName={setSearchByName}
              setResultsByCategori={setResultsByCategori}
              setSort={setSort}
              sort={sort}
              LocalStorage={LOCALSTORAGE}
              />}
            />
            <Route
              path='/cart'
              element={
                <CartPage
                  LocalStorage={LOCALSTORAGE}
                />
              }/>
            <Route
              path={`product/:id/details`}
              element={
                <ProductPage
                  LocalStorage={LOCALSTORAGE}
                />}
            />  
      </Route>
    </Routes>
  )
}

export default App
