import { FaCartShopping } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import styles from './Header.module.css';
import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi";
import { HeaderProps } from "../../Types/Types";

function Header({LocalStorage, onChange, onSearch}: HeaderProps) {

  const quantity = LocalStorage.cartItens.reduce((acc, item) => {
    return acc += item.quantity || 1
  }, 0)

  return (
    <header className={styles.header}>
      <div className={styles.searchDiv}>
        <form className={styles.searchForm}>
          <label htmlFor="search-input"></label>
          <input
            onChange={onChange}
            className={styles.searchInput}
            type="text"
            id="search-input"
            name="search"
            placeholder="Digite o que você busca"
          />
          <button
            type="submit"
            className={styles.searchButton}
            onClick={onSearch}
            >
              <IoSearch />
            </button>
        </form>
      </div>
      <Link to='/' className={styles.logoDiv}>
        <HiShoppingBag className={styles.logo} />
        <div className={styles.nameDiv}>
          <h1>FRONT-END</h1>
          <p>online store</p>
        </div>
      </Link>
      <div className={styles.cartDiv}>
        <Link to='/cart' className={styles.cartNumber}>{quantity}</Link>
        <Link className={styles.cartLink} to='/cart'><FaCartShopping className={styles.cartIcon}/></Link>
      </div>
    </header>
  )
}

export default Header;