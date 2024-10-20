import {ImageURISource} from 'react-native';

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

export type EditingProduct = {
  name: string;
  description: string;
  price: string;
  category: string;
  userId: number;
  images?: {image: ImageURISource | number}[];
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
  updateProduct: (productId: number, product: EditingProduct) => Promise<void>;
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

  updateProduct: async (productId: number, product: EditingProduct) => {
    //TODO: пока что на бэке возможно только добавить картинки

    // запрос идет по очереди пачкой добавить нельзя

    set({loading: true, error: null});

    if (product.images) {
      for (const [index, image] of product.images.entries()) {
        const imageUri = image.image as string;

        if (typeof imageUri === 'string' && imageUri.startsWith('file://')) {
          const formData = new FormData();

          formData.append('image', {
            uri: imageUri,
            name: `image${index + 1}.jpg`,
            type: 'image/jpeg',
          });

          try {
            await axios.post(
              `https://domennameabcdef.ru/api/productimage/${productId}`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              },
            );
          } catch (error) {
            set({error: `Ошибка`, loading: false});
          }
        }
      }
    }

    set({loading: false});
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
