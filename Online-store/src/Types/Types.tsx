export type CartProductsCardProps = {
  quantity: number | undefined;
  name: string;
  price: number;
  thumbnail: string;
  item: cartItensProps
  LocalStorage: LocalStorageType
}

export type HeaderProps = {
  LocalStorage: LocalStorageType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent<HTMLButtonElement>) => Promise<void>;
  searchValue: {
    search: string
  }
}

export type HomeProps = {
  categories: {
    id: string;
    name: string;
  }[];
  loading: boolean;
  products: fetchTypes[]
  searchLoading: boolean;
  setProductList: React.Dispatch<React.SetStateAction<fetchTypes[]>>;
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
  initial_quantity: number
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
  clearCart: () => void;
}

export type RateTypes = {
  rateName: string;
  rateEmail: string
  rateTextarea: string;
  productId: string | undefined
}

export type GetRatesType = {
  getLocalStorageRates: () => RateTypes[]
}

export type ProductPageProps = {
  LocalStorage: LocalStorageType;
  RatesLocalStorage: {
    setRateInfos: React.Dispatch<React.SetStateAction<RateTypes>>;
    rates: RateTypes[];
    rateInfos: RateTypes;
    handleRate: (e: React.FormEvent<HTMLButtonElement>) => void;
  }
}

export type FinishTypes = {
  LocalStorage: LocalStorageType
  setFinish: React.Dispatch<React.SetStateAction<boolean>>
}