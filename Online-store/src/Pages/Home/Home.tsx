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
    LocalStorage,
    setSort,
    sort,
    products,
    setProductList,
    categories,
    loading,
    searchLoading,
    handleCategory,
  }: HomeProps) {

  const sortByPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value)
    handleSort(e.target.value)
  }

  const handleSort = (option: string) => {
    const newItens = [...products];
    newItens.sort((a, b) => {
      if (option === 'Menor') {
        return a.price - b.price;
      } else {
        return b.price - a.price
      }
    });
    setProductList(newItens)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loading />


  return (
    <section className={styles.homeSection}>
      <aside className={styles.categoriesAside}>
        <div className={styles.categoryTitle}>
          <h1>
            Categorias
          </h1>
        </div>
        <div className={styles.categories}>
          {categories.map((category: categoryType) => (
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
        {(products.length === 0 && !searchLoading) && <WaitingToSearch />}
        <div className={styles.productsSection}>
          {products.length !== 0 && (
            <div className={styles.selectDiv}>
              <select
                onChange={sortByPrice}
                name="price-sort"
                value={sort}
                id=""
                className={styles.selectContainer}
              >
                <option value='' className={styles.selectOptions}>Ordenar por preço</option>
                <option value="Maior" className={styles.selectOptions}>Maior</option>
                <option value="Menor" className={styles.selectOptions}>Menor</option>
              </select>
            </div>
          )}
          {searchLoading && <Loading />}     
            <div className={styles.products}>
              {products.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  image={item.thumbnail}
                  name={item.title}
                  price={item.price}
                  LocalStorage={LocalStorage}
                />
              ))}
              {(searchLoading && products.length !== 0) && <Loading />}
            </div>
        </div>
      </section>
    </section>
  )
}

export default Home;