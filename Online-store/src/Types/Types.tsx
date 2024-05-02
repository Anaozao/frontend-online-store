export type CartProductsCardProps = {
  quantity: number | undefined;
  name: string;
  price: number;
  image: string;
  setCartItens: React.Dispatch<React.SetStateAction<never[]>>;
  cartItens: {
    id: number;
    price: number;
    image: string;
    title: string;
    quantity?: number | undefined;

  }[]
  iten: cartItensProps
}

export type cartItensProps = {
  id: number;
  price: number;
  thumbnail: string;
  title: string
  quantity?: number | undefined
}

export type HeaderProps = {
  cartCount: number;
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
  resultsByCategory: {
    title: string;
    price: number;
    thumbnail: string;
    id: string;
  }[];
  search: boolean;
  searchLoading: boolean;
  setCartItens: React.Dispatch<React.SetStateAction<never[]>>;
  handleCategory: (e: string) => void
}