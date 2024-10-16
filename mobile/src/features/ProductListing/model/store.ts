import axios from 'axios';
import {Product} from 'entities/product';
import {create} from 'zustand';

export type ListingProduct = {
  name: string;
  description: string;
  price: string;
  category: string;
  userId: number;
  image?: string;
};

type ProductListingStore = {
  loading: boolean;
  error: string | null;
  currentProduct: ListingProduct;
  setCurrentProductField: (
    field: keyof ListingProduct,
    value: string | number,
  ) => void;
  clearProduct: () => void;
  addProduct: (product: ListingProduct) => Promise<void>;
};

export const useProductListingStore = create<ProductListingStore>(set => ({
  loading: false,
  error: null,
  currentProduct: {
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    userId: 1,
  },

  setCurrentProductField: (field, value) =>
    set(state => ({
      currentProduct: {...state.currentProduct, [field]: value},
    })),

  addProduct: async (product: ListingProduct) => {
    set({loading: true, error: null});
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('userId', product.userId.toString());

    if (product.image) {
      formData.append('image', {
        uri: product.image,
        name: 'firstImage.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      await axios.post<Product>(
        'https://domennameabcdef.ru/api/product',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      set({loading: false});
    } catch (error) {
      console.error(error);
      set({error: 'Ошибка', loading: false});
    }
  },

  clearProduct: () =>
    set({
      currentProduct: {
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        userId: 1,
      },
    }),
}));
