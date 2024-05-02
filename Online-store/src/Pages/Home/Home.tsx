import { useEffect } from 'react';
import Loading from '../../Components/Loading/Loading';
import ProductCard from '../../Components/ProductCard/ProductCard';
import WaitingToSearch from '../../Components/WaitingToSearch/WaitingToSearch';
import { HomeProps } from '../../Types/Types';
import styles from './Home.module.css';

type categoryType = {
  id: string;
  name: string
}

function Home(
  { 
    setProduct,
    setSort,
    sort,
    categorySearch,
    nameSearch,
    nameResults,
    categoryResults,
    categories,
    loading,
    search,
    searchLoading,
    handleCategory,
    setCartItens,
    setSearchByName,
    setResultsByCategori
  }: HomeProps) {

  const sortByPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSort(e.target.value)
      handleSort(e.target.value)
  }

  const handleSort = (option: string) => {
      if (nameSearch) {
        const newItens = [...nameResults];
        newItens.sort((a, b) => {
          if (option === 'Menor') {
            return a.price - b.price;
          } else {
            return b.price - a.price
          }
        });
        setSearchByName(newItens)
      }
      if (categorySearch) {
        const newItens = [...categoryResults];
        newItens.sort((a, b) => {
          if (sort === 'Maior') {
            return a.price - b.price;
          } else {
            return b.price - a.price
          }
        });
        setResultsByCategori(newItens)
      }
  }

  useEffect(() => {

  },[search])
  
  if(loading) return <Loading />


  return (
    <section className={styles.homeSection}>
      <aside className={styles.categoriesAside}>
        <div className={styles.categoryTitle}>
          <h1>
            Categorias
          </h1>
        </div>
        <div className={styles.categories}>
          { categories.map((category: categoryType) => (
            <p
              role='button'
              onClick={() => handleCategory(category.id)}
              key={category.id}
              id={category.id}
              className={styles.categoryName}
            >
              {category.name}
            </p>
          ))}
        </div>
      </aside>
        <section className={styles.searchedProductsSection}>
          { (!search && !searchLoading) && <WaitingToSearch/> }
          <div className={styles.productsSection}>
            <div className={styles.selectDiv}>
              <select
                onChange={sortByPrice}
                name="price-sort"
                defaultValue=''
                id=""
                className={styles.selectContainer}
              >
                <option value='' disabled className={styles.selectOptions}>Ordenar por preço</option>
                <option value="Maior" className={styles.selectOptions}>Maior</option>
                <option value="Menor" className={styles.selectOptions}>Menor</option>
              </select>
            </div>
            <div className={styles.products}>
              {nameSearch && (
                nameResults.map((item) => (
                  <ProductCard
                  key={item.id}
                  setCartItens={setCartItens}
                  item={item}
                  image={item.thumbnail}
                  name={item.title}
                  price={item.price}
                  setProduct={setProduct}
                />
                ))
              )}
              {categorySearch && (
                categoryResults.map((procuct) => (
                  <ProductCard
                  key={procuct.id}
                  setCartItens={setCartItens}
                  item={procuct}
                  image={procuct.thumbnail}
                  name={procuct.title}
                  price={procuct.price}
                  setProduct={setProduct}
                />
                ))
              )}
              {searchLoading && <Loading />}
              </div>
            </div>
        </section>
    </section>
  )
}

export default Home;