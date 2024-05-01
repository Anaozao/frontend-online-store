import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

type LayoutProps = {
  cartCount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch: (e: React.FocusEvent<HTMLButtonElement>) => Promise<void>
}

function Layout({cartCount, onChange, onSearch}: LayoutProps) {
  return (
    <>
      <Header
        cartCount={cartCount}
        onChange={onChange}
        onSearch={onSearch}
      />

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout;