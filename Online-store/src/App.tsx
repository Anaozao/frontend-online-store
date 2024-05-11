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
import useRatesLocalStorage from './Hooks/useRatesLocalStorage'

function App() {
  const [searchInputValue, setSearchInputValue] = useState({search: ''})
  const [productList, setProductList] = useState<fetchTypes[]>([])
  const [categories, setCategories] = useState<HomeProps['categories']>([])
  const [loading, setLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [category, setCategory] = useState('')
  const [offset, setOffset] = useState(0)
  const [sort, setSort] = useState('')
  const navigate = useNavigate();
  const LOCALSTORAGE = useLocalStorage()
  const RatesLocalStorage = useRatesLocalStorage()

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
    setOffset(0)
    e.preventDefault()
    setProductList([])
    setSearchLoading(true)
    setOffset(0)
    try {
      const response = await getByName(searchInputValue.search, 0)
      console.log(response.results)
      setProductList(response.results)
    } catch (error) {
      console.error(error)
    } finally {
      navigate('')
      setSearchLoading(false)
      setSort('')
    }
  }

  const handleCategory = async (e: string) => {
    setSearchInputValue({search: ''})
    setProductList([])
    setSearchLoading(true)
    setOffset(0)
    try {
      const response = await getCategory(e, 0)
      setProductList(response.results)
    } catch (error) {
      console.error(error)
    } finally {
      setCategory(e)
      setSearchLoading(false)
      setSort('')
    }
  }

  useEffect(() => {
    const getData = async () => {
        setSearchLoading(true)
        try {
          const response = await getByName(searchInputValue.search, offset)
          setProductList((prev) => [...prev, ...response.results])
        } catch (error) {
          console.error(error)
        } finally {
          setSearchLoading(false)
        }
        setSearchLoading(true)
        try {
          const response = await getCategory(category, offset)
          setProductList((prev) => [...prev, ...response.results])
        } catch (error) {
          console.error(error)
        } finally {
          setSearchLoading(false)
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
          LocalStorage={LOCALSTORAGE}
          searchValue={searchInputValue}
          />}
        >
            <Route index element={<Home
              categories={categories}
              loading={loading}
              products={productList}
              setProductList={setProductList}
              searchLoading={searchLoading}
              handleCategory={handleCategory}
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
                  RatesLocalStorage={RatesLocalStorage}
                  LocalStorage={LOCALSTORAGE}
                />}
            />  
      </Route>
    </Routes>
  )
}

export default App
