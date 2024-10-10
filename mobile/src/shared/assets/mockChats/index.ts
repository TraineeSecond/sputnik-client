import {Chat, IMessage} from 'entities/chat';
import {Product} from 'entities/product';
import {User} from 'entities/user';

const users: User[] = [
  {
    id: 1,
    name: 'Ярослав',
    surname: 'Бимбыч',
    email: 'yaro@mail.com',
    role: 'buyer',
  },
  {
    id: 2,
    name: 'Кабан',
    surname: 'Кабаныч',
    email: 'kaban@mail.com',
    role: 'seller',
  },
  {
    id: 3,
    name: 'Олег',
    surname: 'Теннис',
    email: 'tennis@rur.com',
    role: 'buyer',
  },
];

const products: Product[] = [
  {
    id: 1,
    category: 'электроника',
    description:
      'Аааааааааааааааааааааааааааааааааааааааа фывфвфвфывфывфывфывфывфвфывфв фывфвфыв',
    name: 'Смартфон',
    price: 60000,
    new_price: 55000,
    user: users[1],
    images: [],
    rating: 4.8,
    reviewerscount: 200,
  },
  {
    id: 2,
    category: 'техника',
    description:
      'Аааааааааааааааааааааааааааааааааааааааа фывфвфвфывфывфывфывфывфвфывфв фывфвфыв',
    name: 'Холодильник',
    price: 40000,
    new_price: 38000,
    user: users[1],
    images: [],
    rating: 4.5,
    reviewerscount: 150,
  },
];

const messagesChat1: IMessage[] = [
  {
    id: 1,
    message:
      'Аааааааааааааааааааааааааааааааааааааааа фывфвфвфывфывфывфывфывфвфывфв фывфвфыв',
    author: users[0],
    reactions: null,
    images: null,
    createdAt: '2023-10-01T09:00:00Z',
    updatedAt: '2023-10-01T09:00:00Z',
  },
  {
    id: 2,
    message:
      'Аааааааааааааааааааааааааааааааааааааааа фывфвфвфывфывфывфывфывфвфывфв фывфвфыв',
    author: users[1],
    reactions: null,
    images: null,
    createdAt: '2023-10-01T09:05:00Z',
    updatedAt: '2023-10-01T09:05:00Z',
  },
  {
    id: 3,
    message:
      'Аааааааааааааааааааааааааааааааааааааааа фывфвфвфывфывфывфывфывфвфывфв фывфвфыв',
    author: users[0],
    reactions: null,
    images: null,
    createdAt: '2023-10-01T09:10:00Z',
    updatedAt: '2023-10-01T09:10:00Z',
  },
];

const messagesChat2: IMessage[] = [
  {
    id: 4,
    message:
      'Аааааааааааааааааааааааааааааааааааааааа фывфвфвфывфывфывфывфывфвфывфв фывфвфыв',
    author: users[2],
    reactions: null,
    images: null,
    createdAt: '2023-10-02T10:00:00Z',
    updatedAt: '2023-10-02T10:00:00Z',
  },
  {
    id: 5,
    message:
      'Аааааааааааааааааааааааааааааааааааааааа фывфвфвфывфывфывфывфывфвфывфв фывфвфыв',
    author: users[1],
    reactions: null,
    images: null,
    createdAt: '2023-10-02T10:05:00Z',
    updatedAt: '2023-10-02T10:05:00Z',
  },
  {
    id: 6,
    message:
      'Аааааааааааааааааааааааааааааааааааааааа фывфвфвфывфывфывфывфывфвфывфв фывфвфыв',
    author: users[2],
    reactions: null,
    images: null,
    createdAt: '2023-10-02T10:10:00Z',
    updatedAt: '2023-10-02T10:10:00Z',
  },
];

const messagesChat3: IMessage[] = [
  {
    id: 7,
    message:
      'Аааааааааааааааааааааааааааааааааааааааа фывфвфвфывфывфывфывфывфвфывфв фывфвфыв',
    author: users[0],
    reactions: null,
    images: null,
    createdAt: '2023-10-03T11:00:00Z',
    updatedAt: '2023-10-03T11:00:00Z',
  },
  {
    id: 8,
    message:
      'Аааааааааааааааааааааааааааааааааааааааа фывфвфвфывфывфывфывфывфвфывфв фывфвфыв',
    author: users[1],
    reactions: null,
    images: null,
    createdAt: '2023-10-03T11:05:00Z',
    updatedAt: '2023-10-03T11:05:00Z',
  },
];

export const chats: Chat[] = [
  {
    id: 1,
    product: products[0],
    messages: messagesChat1,
  },
  {
    id: 2,
    product: products[1],
    messages: messagesChat2,
  },
  {
    id: 3,
    product: products[0],
    messages: messagesChat3,
  },
];
