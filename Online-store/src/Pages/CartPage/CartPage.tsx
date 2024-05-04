import { TiArrowBack } from 'react-icons/ti';
import styles from './CartPage.module.css'
import CartProductsCard from '../../Components/CartProductCard/CartProductCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EmptyCart from '../../Components/EmptyCart/EmptyCart';
import { CartItensTypes, LocalStorageType } from '../../Types/Types';

type CartPageProps = {
  LocalStorage: LocalStorageType

}


function CartPage({LocalStorage}: CartPageProps) {

  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const total = LocalStorage.cartItens.map((item) => item.price).reduce((acc, price) => acc += price, 0)
    setTotalValue(total)
    
  }, [LocalStorage.cartItens])

  const uniqueItem = LocalStorage.cartItens.reduce((unique: CartItensTypes[], item) => {
    const existingItem = unique.find((uniqueItem) => uniqueItem.id === item.id);

    if(existingItem) {
      if (existingItem.quantity){
        existingItem.quantity += 1;
      }
    } else {
      unique.push({...item, quantity: 1})
    }

    return unique
  },[])

  return (
    <section className={styles.cartSection}>
      <div className={styles.cartProductsWindow}>
        <div className={styles.cartProductsDiv}>
          <div className={styles.cartPageTopButtons}>
            <Link to='/' className={styles.goBack} ><TiArrowBack className={styles.goBackIcon}/> Voltar</Link>
            <button className={styles.clearButton} type='button' onClick={LocalStorage.clearCard}>Limpar</button>
          </div>
          {uniqueItem.map((iten: CartItensTypes) => (
            <CartProductsCard
              key={iten.id}
              name={iten.title}
              price={iten.price}
              thumbnail={iten.thumbnail ? iten.thumbnail : ''}
              LocalStorage={LocalStorage}
              item={iten}
              quantity={iten.quantity}
            />
          ))}
        </div>
      </div>
      { LocalStorage.cartItens.length < 1 ? <EmptyCart /> :
        <div className={styles.cartFinishDiv}>
          <p>Valor total da compra:</p>
          <p>R${Number(totalValue).toFixed(2)}</p>
          <button type='button'>Finalizar compra</button>
        </div>
      }
    </section>
  )
}

export default CartPage;