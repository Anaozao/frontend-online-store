import { RxCross2 } from 'react-icons/rx';
import styles from './CartProductCard.module.css'
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import { CartProductsCardProps } from '../../Types/Types';
import { Link } from 'react-router-dom';

function CartProductsCard({LocalStorage, quantity, name, price, thumbnail, item}: CartProductsCardProps) {


  return (
    <div className={styles.productCard}>
      <span role='button' onClick={() => LocalStorage.removeAll(item.id)} className={styles.removeItem}><RxCross2 /></span>
      <Link className={styles.itemLink} to={`/product/${item.id}/details`}>
        <img className={styles.productImage} src={thumbnail} alt={`Imagem de: ${name}`} />
        <p className={styles.productName}>{name}</p>
      </Link>
      <span  role='button' onClick={() => LocalStorage.removeItem(item.id)} className={styles.remove}><IoRemoveOutline /></span>
      <div className={styles.count}>{quantity}</div>
      <span role='button' onClick={() => LocalStorage.addToCart(item)} className={styles.add}><IoAddOutline /></span>
      <p className={styles.price}>R$ {price}</p>
    </div>
  )
}

export default CartProductsCard;