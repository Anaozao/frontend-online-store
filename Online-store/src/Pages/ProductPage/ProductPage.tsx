/* eslint-disable react-hooks/exhaustive-deps */
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import styles from './ProductPage.module.css'
import React, { useEffect, useState } from 'react';
import { ProductPageProps, productDetails } from '../../Types/Types';
import { useParams } from 'react-router-dom';
import { getByIdS } from '../../Utils/APIs';

function ProductPage({LocalStorage, RatesLocalStorage }: ProductPageProps,) {

  const [quantity, setQuantity] = useState(0)
  const [product, setProduct] = useState<productDetails>()
  const stock = product?.initial_quantity;
  const {id} = useParams()
  const {rateInfos, rates, setRateInfos, handleRate} = RatesLocalStorage

  const productRates = rates.filter((rate) => rate.productId === product?.id)

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
    for (let index = 0; index < quantity; index += 1) {
      if (product) {
        LocalStorage.addToCart(product)
      }
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRateInfos((prevInfos) => (
      {
        ...prevInfos,
        [e.target.name]: e.target.value,
        productId: product?.id
      }
    ))
  }

  const validateForm = () => {
    const regexEmail = /^[\w\\.-]+@[a-zA-Z\d\\.-]+\.[a-zA-Z]{2,}$/
    const {rateEmail, rateTextarea, rateName} = rateInfos
    return (
      ! regexEmail.test(rateEmail)
      || rateName.length < 3
      || rateTextarea.length < 5
    )
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
            <div>
              <button
                type='button'
                onClick={handleAddToCart}
                className={styles.addToCart}
              >
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.rateSection}>
        <h3 className={styles.rateTitle}>Avaliações</h3>
        <form className={styles.rateForm}>
          <div className={styles.selInfos}>
            <div>
              <label htmlFor="rate-email">E-mail:</label>
              <input
                onChange={handleChange}
                type="email"
                name="rateEmail"
                id="rate-email"
                value={rateInfos.rateEmail}
                className={styles.rateEmail}
                placeholder='exemplo@exemplo.com'
              />
            </div>
            <div>
              <label htmlFor="rate-name">Nome:</label>
              <input
                value={rateInfos.rateName}
                onChange={handleChange}
                type="text" name='rateName'
                id='rate-name'
                className={styles.rateName}
              />
            </div>
          </div>
          <textarea
            onChange={handleChange}
            className={styles.rateTextarea}
            name="rateTextarea"
            id="rate-area"
            rows={15}
            cols={50}
            maxLength={1000}
            value={rateInfos.rateTextarea}
          />
          <div className={styles.rateBtnDiv}>
            <button
              onClick={handleRate}
              className={styles.rateBtn}
              disabled={validateForm()}
            >
              Enviar Avaliação
            </button>
          </div>
        </form>
        <section className={styles.rates}>
          {productRates.map((rate, index) => (
            <div key={index} className={styles.rateDiv}>
              <div className={styles.rate}>
                <p>{rate.rateName}</p>
                <p>{rate.rateEmail}</p>
                <p>{rate.rateTextarea}</p>
              </div>
            </div>
          ))}
        </section>
      </section>
    </section>
  )
}

export default ProductPage;