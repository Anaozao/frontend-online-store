import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { LocalStorageType } from "../../Types/Types";

type LayoutProps = {
  LocalStorage: LocalStorageType
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>
}

function Layout({LocalStorage, onChange, onSearch}: LayoutProps) {
  return (
    <>
      <Header
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