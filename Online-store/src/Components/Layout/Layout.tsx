import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { LocalStorageType } from "../../Types/Types";

type LayoutProps = {
  LocalStorage: LocalStorageType
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>
  searchValue: {
    search: string;
}
}

function Layout({LocalStorage, onChange, onSearch, searchValue}: LayoutProps) {
  return (
    <>
      <Header
        searchValue={searchValue}
        onChange={onChange}
        onSearch={onSearch}
        LocalStorage={LocalStorage}
      />

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout;