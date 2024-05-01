import Loading from '../../Components/Loading/Loading';
import ProductCard from '../../Components/ProductCard/ProductCard';
import WaitingToSearch from '../../Components/WaitingToSearch/WaitingToSearch';
import styles from './Home.module.css';

type categoryType = {
  id: string;
  name: string
}

type resultsType = {
  image: string;
  title: string;
  id: number
  price: number
  thumbnail: string
}

function Home({categories, loading, results, search, searchLoading}: any) {

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
            results.map((item: resultsType) => (
              <ProductCard
                key={item.id}
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