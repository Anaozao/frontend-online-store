import { Link} from 'react-router-dom';
import styles from './ProductCard.module.css'
import { LocalStorageType } from '../../Types/Types';

type ProductCardProps = {
  image: string;
  name: string;
  price: number;
  item: {
    title: string;
    price: number;
    thumbnail: string;
    id: string;
  };
  LocalStorage: LocalStorageType
}

function ProductCard({LocalStorage, image, name, price, item}:ProductCardProps) {

  return (
    <div className={styles.productCard}>
      <Link className={styles.productLink} to={`/product/${item.id}/details`}>
        <img className={styles.productImage} src={image} alt={`Imagem de ${name}`} />
        <h4 className={styles.productName}>{name}</h4>
        <p className={styles.productPrice}>R${Number(price).toFixed(2)}</p>
      </Link>
      <button
        className={styles.productCardButton}
        type='button'
        onClick={() => LocalStorage.addToCart(item)}
        >
          Adicionar ao carrinho
        </button>
    </div>
  )
}

export default ProductCard;