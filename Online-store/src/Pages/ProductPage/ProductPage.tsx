/* eslint-disable react-hooks/exhaustive-deps */
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import styles from './ProductPage.module.css'
import { useEffect, useState } from 'react';
import { LocalStorageType, productDetails } from '../../Types/Types';
import { useParams } from 'react-router-dom';
import { getByIdS } from '../../Utils/APIs';

type ProductPageProps = {
  LocalStorage: LocalStorageType;
}

function ProductPage({LocalStorage}: ProductPageProps) {

  const [quantity, setQuantity] = useState(0)
  const [product, setProduct] = useState<productDetails>()
  const stock = product?.initial_quantity;
  console.log(product)

  const {id} = useParams()

  useEffect(() => {
    window.scrollTo(0, 0);
    const getById = async () => {
      if (id) {
        const response = await getByIdS(id)
        setProduct(response)
      }
    }
    getById()
  }, []);


  const handleAdd= () => {
    if (stock && stock > quantity) {
      setQuantity(quantity + 1)
    }
  }

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity -1)
    }
  }

  const handleAddToCart = () => {
    for (let index =0; index < quantity; index += 1) {
      if (product) {
        LocalStorage.addToCart(product)
      }
    }
  }

  return (
    <section className={styles.productPageSection}>
      <div className={styles.productDiv}>
        <div className={styles.nameAndImage}>
          <h1 className={styles.productName}>{product?.title}</h1>
          <img className={styles.productImg} src={product?.thumbnail} alt="" />
        </div>
        <div className={styles.infoAndPrice}>
          <div className={styles.productInfoDiv}>
             <li>Lorem ipsum dolor sit amet.</li>
             <li>Consectetur adipiscing elit.</li>
             <li>Proin fringilla lectus vehicula.</li>
             <li>Integer rutrum risus at luctus mollis</li>
             <li>Pellentesque vestibulum arcu eu.</li>
             <li>Nulla at mi nec neque dapibus.</li>
             <li>Phasellus maximus leo ut</li>
             <li>Quisque id velit eleifend</li>
          </div>
          <hr />
          <p className={styles.stock}>Em estoque: {stock}</p>
          <div className={styles.productAddDiv}>
            <p>R$ {Number(product?.price).toFixed(2)}</p>
            <div className={styles.addRemoveDiv}>
              <span role='button' onClick={handleRemove}><IoRemoveOutline className={styles.remove} /></span>
              <div className={styles.quantity}>{quantity}</div>
              <span role='button' onClick={handleAdd} ><IoAddOutline className={styles.add}/></span>
            </div>
            <button type='button' onClick={handleAddToCart} className={styles.addToCart}>Adicionar ao carrinho</button>
          </div>
        </div>
      </div>
      <section className={styles.rateSection}>

      </section>
    </section>
  )
}

export default ProductPage;