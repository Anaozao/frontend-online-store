import styles from './WaitingToSearch.module.css'

function WaitingToSearch() {
  return (
    <div className={styles.waitingDiv}>
        <h1 className={styles.waitingTitle}>
          VOCÊ AINDA NÃO REALIZOU UMA BUSCA
        </h1>
        <p className={styles.waitingPhrase}>Digite algum termo de pesquisa ou escolha uma categoria</p>
    </div>
  )
}

export default WaitingToSearch