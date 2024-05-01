import styles from './ProductCard.module.css'
type ProductCardProps = {
  image: string;
  name: string;
  price: number;
}

function ProductCard({image, name, price}:ProductCardProps) {
  return (
    <div className={styles.productCard}>
      <img className={styles.productImage} src={image} alt={`Imagem de ${name}`} />
      <h4 className={styles.productName}>{name}</h4>
      <p className={styles.productPrice}>R${price}</p>
      <button className={styles.productCardButton} type='button'>Adicionar ao carrinho</button>
    </div>
  )
}

export default ProductCard;