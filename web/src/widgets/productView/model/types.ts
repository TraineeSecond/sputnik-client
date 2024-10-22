import { IProductImage } from 'entities/product/model/types';

export interface IProductViewStore {
  currentImage: IProductImage | null;
  setCurrentImage: (image: IProductImage | null) => void;
}
