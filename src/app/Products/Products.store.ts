import { Product } from "./models/model";
import { signalStore, withState } from '@ngrx/signals';


type ProductsSate = {
  products : Product []
  isLoading: false,

}


const initialState: ProductsSate = {
  products: [],
  isLoading: false,
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState)
);