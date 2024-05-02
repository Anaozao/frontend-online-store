import { TiArrowBack } from 'react-icons/ti';
import styles from './CartPage.module.css'
import CartProductsCard from '../../Components/CartProductCard/CartProductCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EmptyCart from '../../Components/EmptyCart/EmptyCart';
import { cartItensProps } from '../../Types/Types';

type CartPageProps = {
  setCartItens: React.Dispatch<React.SetStateAction<never[]>>
  cartItens: {
    id: number;
    price: number;
    image: string;
    title: string
    quantity?: number;

  }[];

}

function CartPage({cartItens, setCartItens}: CartPageProps) {

  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    console.log(cartItens);
    const total = cartItens.map((iten) => iten.price).reduce((acc, price) => acc += price, 0)
    setTotalValue(total)
    
  }, [cartItens])

  const uniqueItem = cartItens.reduce((unique, item) => {
    const existingItem = unique.find((uniqueItem: cartItensProps) => uniqueItem.id === item.id);

    if(existingItem) {
      existingItem.quantity += 1;
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
            <button className={styles.clearButton} type='button' onClick={() => setCartItens([])}>Limpar</button>
          </div>
          {uniqueItem.map((iten: cartItensProps) => (
            <CartProductsCard
              key={iten.id}
              name={iten.title}
              price={iten.price}
              image={iten.thumbnail}
              cartItens={cartItens}
              iten={iten}
              quantity={iten.quantity}
              setCartItens={setCartItens}
            />
          ))}
        </div>
      </div>
      { cartItens.length < 1 ? <EmptyCart /> :
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