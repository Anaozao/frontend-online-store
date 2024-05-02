import { RxCross2 } from 'react-icons/rx';
import styles from './CartProductCard.module.css'
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import { CartProductsCardProps } from '../../Types/Types';

function CartProductsCard({quantity, name, price, image, cartItens, iten, setCartItens}: CartProductsCardProps) {

  const handleRemove = () => {
    const index = cartItens.findIndex((item) => item.id === iten.id)

    if (index !== -1) {
      const newCartItens = [...cartItens];

      newCartItens.splice(index, 1)

      setCartItens(newCartItens)
    }
  }

  const handleRemoveAll = () => {
    const index = cartItens.filter((item) => item.id !== iten.id)

    console.log(index)

    setCartItens(index)
    
  }

  const handleAdd = () => {
      setCartItens((prevItens) => [...prevItens, iten])
  }

  return (
    <div className={styles.productCard}>
      <span role='button' onClick={handleRemoveAll} className={styles.removeItem}><RxCross2 /></span>
      <img className={styles.productImage} src={image} alt={`Imagem de: ${name}`} />
      <p className={styles.productName}>{name}</p>
      <span  role='button' onClick={handleRemove} className={styles.remove}><IoRemoveOutline /></span>
      <div className={styles.count}>{quantity}</div>
      <span role='button' onClick={handleAdd} className={styles.add}><IoAddOutline /></span>
      <p className={styles.price}>R$ {price}</p>
    </div>
  )
}

export default CartProductsCard;