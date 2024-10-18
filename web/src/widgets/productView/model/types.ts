import { ProductImage } from 'entities/product/model/types';

export interface ProductViewStore {
  currentImage: ProductImage | null;
  setCurrentImage: (image: ProductImage | null) => void;
}
