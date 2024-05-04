export type CartProductsCardProps = {
  quantity: number | undefined;
  name: string;
  price: number;
  thumbnail: string;
  item: cartItensProps
  LocalStorage: LocalStorageType
}

export type HeaderProps = {
  cartItens: CartItensTypes[]
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
}

export type HomeProps = {
  categorySearch: boolean;
  nameSearch: boolean;
  categories: {
    id: string;
    name: string;
  }[];
  loading: boolean;
  nameResults: {
    title: string;
    price: number;
    thumbnail: string;
    id: string;
  }[];
  categoryResults: {
    title: string;
    price: number;
    thumbnail: string;
    id: string;
  }[];
  search: boolean;
  searchLoading: boolean;
  setResultsByCategori: React.Dispatch<React.SetStateAction<fetchTypes[]>>;
  setSearchByName: React.Dispatch<React.SetStateAction<fetchTypes[]>>;
  handleCategory: (e: string) => void;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  LocalStorage: LocalStorageType
}

export type productDetails = {
  title: string;
  price: number;
  thumbnail: string;
  id: string;
}

export type fetchTypes = {
  title: string;
  price: number;
  thumbnail: string;
  id: string;
}

export type cartItensProps = {
  id: string;
  price: number;
  thumbnail: string
  title: string;
}

export type CartItensTypes = cartItensProps & {
  quantity?: number;
};
export type CartPageProps = {
  LocalStorage: LocalStorageType

}

export type LocalStorageType = {
  cartItens: CartItensTypes[];
  addToCart: (item: CartItensTypes) => void;
  removeItem: (id: string) => void;
  removeAll: (id: string) => CartItensTypes[];
  getCartItens: () => CartItensTypes[];
  clearCart: () => void
}