import {User} from 'entities/user';
import {ImageSourcePropType} from 'react-native';

export type Product = {
  id: number;
  category: string;
  description: string;
  name: string;
  price: number;
  new_price: number;
  user: User;
  image?: ImageSourcePropType;
};
