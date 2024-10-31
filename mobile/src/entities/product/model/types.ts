import {ImageSourcePropType} from 'react-native';

import {User} from 'entities/user';

export type ImageOwn = {
  id: number;
  image: ImageSourcePropType;
};

export type Product = {
  id: number;
  category: string;
  description: string;
  name: string;
  price: number;
  new_price: number;
  user: User;
  images: ImageOwn[];
  rating: number;
  reviewerscount: number;
};

export type AppelsProduct = {
  id: string;
  sellerId: number | undefined;
  name: string;
};
