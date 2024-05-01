import styles from './EmptyCart.module.css'

function EmptyCart() {
  return (
    <div className={styles.emtyCartDiv}>
      <h1>Carrinho vazio!</h1>
      <p>Adicione novos itens para continuar</p>
    </div>
  )
}

export default EmptyCart;