import { resultsType } from '../../Pages/Home/Home';
import styles from './ProductCard.module.css'
type ProductCardProps = {
  image: string;
  name: string;
  price: number;
  item: resultsType;
  setCartItens: React.Dispatch<React.SetStateAction<never[]>>
}

function ProductCard({image, name, price, item, setCartItens}:ProductCardProps) {

  const handleAddToCart = () => {
    setCartItens((prevItens) => [...prevItens, item])
  }

  return (
    <div className={styles.productCard}>
      <img className={styles.productImage} src={image} alt={`Imagem de ${name}`} />
      <h4 className={styles.productName}>{name}</h4>
      <p className={styles.productPrice}>R${price}</p>
      <button
        className={styles.productCardButton}
        type='button'
        onClick={handleAddToCart}
        >
          Adicionar ao carrinho
        </button>
    </div>
  )
}

export default ProductCard;