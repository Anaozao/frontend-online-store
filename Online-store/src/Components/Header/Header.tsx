import { FaCartShopping } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import styles from './Header.module.css';

type HeaderProps = {
  cartCount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FocusEvent<HTMLButtonElement>) => Promise<void>;
}

function Header({cartCount, onChange, onSearch}: HeaderProps) {
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
      <div className={styles.logoDiv}>
        Logo e nome aqui
      </div>
      <div className={styles.cartDiv}>
        <div className={styles.cartNumber}>{cartCount}</div>
        <FaCartShopping className={styles.cartIcon}/>
      </div>
    </header>
  )
}

export default Header;