import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import styles from './ProductPage.module.css'

function ProductPage({product}) {
  return (
    <section className={styles.productPageSection}>
      <div className={styles.productDiv}>
        <div className={styles.nameAndImage}>
          <h1 className={styles.productName}>{product.title}</h1>
          <img className={styles.productImg} src={product.thumbnail} alt="" />
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
          <div className={styles.productAddDiv}>
            <p>R$ {product.price}</p>
            <div className={styles.addRemoveDiv}>
              <span><IoRemoveOutline /></span>
              <div>Q</div>
              <span><IoAddOutline /></span>
            </div>
            <button type='button' className={styles.addToCart}>Adicionar ao carrinho</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPage;