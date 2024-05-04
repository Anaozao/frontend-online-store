import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { CartItensTypes } from "../../Types/Types";

type LayoutProps = {
  cartItens: CartItensTypes[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>
}

function Layout({cartItens, onChange, onSearch}: LayoutProps) {
  return (
    <>
      <Header
        onChange={onChange}
        onSearch={onSearch}
        cartItens={cartItens}
      />

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout;