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
    categorySearch,
    nameSearch,
    nameResults,
    categoryResults,
    categories,
    loading,
    search,
    searchLoading,
    handleCategory,
    setCartItens}: HomeProps) {

   console.log(nameResults)   

   const handleFilter = () => {
    if (nameSearch) {
      nameResults.sort((a, b) => a.price - b.price)
    }
    if (categorySearch) {
      categoryResults.sort((a, b) => a.price - b.price)
    }
   }

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
          <div className={styles.selectDiv}>
            <select name="price-sort" id="" className={styles.selectContainer}>
              <option disabled className={styles.selectOptions}>Ordenar por preço</option>
              <option value="Maior" className={styles.selectOptions}>Maior</option>
              <option value="Menor" onSelect={handleFilter} className={styles.selectOptions}>Menor</option>
            </select>
          </div>
          <div className={styles.products}>
          { (!search && !searchLoading) && <WaitingToSearch/> }
          {nameSearch && (
            nameResults.map((result) => result.map((item) => (
              <ProductCard
              key={item.id}
              setCartItens={setCartItens}
              item={item}
              image={item.thumbnail}
              name={item.title}
              price={item.price}
            />
            )))
          )}
          {categorySearch && (
            categoryResults.map((item) => item.map((procuct) => (
              <ProductCard
              key={procuct.id}
              setCartItens={setCartItens}
              item={procuct}
              image={procuct.thumbnail}
              name={procuct.title}
              price={procuct.price}
            />
            )))
          )}
          {searchLoading && <Loading />}
          </div>
        </section>
    </section>
  )
}

export default Home;