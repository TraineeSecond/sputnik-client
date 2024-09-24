import {ImageSourcePropType} from 'react-native';

export type Product = {
  id: number;
  title: string;
  brand?: string;
  price: number;
  totalScore?: number;
  reviewsCount?: number;
  priceWithDiscount?: number;
  image: ImageSourcePropType;
  description: string;
};
