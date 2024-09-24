import {ImageSourcePropType} from 'react-native';

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  image: ImageSourcePropType;
  quantity: number;
};
