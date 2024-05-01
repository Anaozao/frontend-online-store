import Loading from '../../Components/Loading/Loading';
import ProductCard from '../../Components/ProductCard/ProductCard';
import WaitingToSearch from '../../Components/WaitingToSearch/WaitingToSearch';
import { HomeProps } from '../../Types/Types';
import styles from './Home.module.css';

type categoryType = {
  id: string;
  name: string
}

function Home({ results, categories, loading, search, searchLoading, setCartItens}: HomeProps) {

  console.log(results)

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
          {searchLoading && <Loading />}
          { !search ? <WaitingToSearch/> : (
            results.map((item) => (
              <ProductCard
                key={item.id}
                setCartItens={setCartItens}
                item={item}
                image={item.thumbnail}
                name={item.title}
                price={item.price}
              />
            ))
          ) }
        </section>
    </section>
  )
}

export default Home;