import { IProductImage } from 'entities/product/model/types';

export interface IProductViewStore {
  currentImage: IProductImage | null;
  showDeleteConfirm: boolean;
  setCurrentImage: (image: IProductImage | null) => void;
  setShowDeleteConfirm: (value: boolean) => void;
}
