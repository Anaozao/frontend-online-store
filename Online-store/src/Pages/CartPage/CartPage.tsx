import { TiArrowBack } from 'react-icons/ti';
import styles from './CartPage.module.css'
import CartProductsCard from '../../Components/CartProductCard/CartProductCard';
import { Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import EmptyCart from '../../Components/EmptyCart/EmptyCart';
import { CartItensTypes, CartPageProps } from '../../Types/Types';
import FinishWindow from '../../Components/FinishWindow/FinishWindow';

function CartPage({LocalStorage}: CartPageProps) {

  const [totalValue, setTotalValue] = useState(0)
  const [finish, setFinish] = useState(false)

  


  


  useEffect(() => {
    window.scrollTo(0, 0);
    setFinish(false)
  }, []);

  useEffect(() => {
    const total = LocalStorage.cartItens.map((item) => item.price * (item.quantity || 1)).reduce((acc, price) => acc += price, 0)
    setTotalValue(total)
    
  }, [LocalStorage.cartItens])

  return (
    <section className={styles.cartSection}>
      <div className={styles.cartProductsWindow}>
        <div className={styles.cartProductsDiv}>
          <div className={styles.cartPageTopButtons}>
            <Link to='/' className={styles.goBack} ><TiArrowBack className={styles.goBackIcon}/> Voltar</Link>
            <button className={styles.clearButton} type='button' onClick={LocalStorage.clearCart}>Limpar</button>
          </div>
          {LocalStorage.cartItens.map((iten: CartItensTypes) => (
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
      { LocalStorage.cartItens.length < 1 ? <EmptyCart /> : (
        !finish ? (
          <div className={styles.cartFinishDiv}>
          <p>Valor total da compra:</p>
          <p>R${Number(totalValue).toFixed(2)}</p>
          <button type='button' onClick={() => setFinish(true)}>Finalizar compra</button>
        </div>
        ) :

        <FinishWindow LocalStorage={LocalStorage}/>
      )
      }
    </section>
  )
}

export default CartPage;