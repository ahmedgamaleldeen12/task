export type Product  = {
  id: number,
  name: string,
  category: string,
  price: number,
  stock: number,
  photo: string
}


export type PagedProducts = {
  items: Product[];
  totalCount: number;
};
