import {ImageSourcePropType} from 'react-native';

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  image: ImageSourcePropType;
  quantity: number;
};
