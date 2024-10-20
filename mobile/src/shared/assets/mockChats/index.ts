import {Chat, IMessage} from 'entities/chat';
import {Product} from 'entities/product';
import {User} from 'entities/user';

export const users: User[] = [
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
    description: 'Описание смартфона',
    name: 'Смартфон',
    price: 60000,
    new_price: 55000,
    user: users[1],
    images: [require('shared/assets/images/mark.jpg')],
    rating: 4.8,
    reviewerscount: 200,
  },
  {
    id: 2,
    category: 'техника',
    description: 'Описание холодильника',
    name: 'Холодильник',
    price: 40000,
    new_price: 38000,
    user: users[1],
    images: [require('shared/assets/images/mark.jpg')],
    rating: 4.5,
    reviewerscount: 150,
  },
];

const messagesChat1: IMessage[] = [
  {
    id: 1,
    chatId: 1,
    chat: [],
    message: 'Привет, интересует ваш смартфон.',
    authorId: users[0].id,
    author: users[0],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:00:00Z',
    updatedAt: '2023-10-01T09:00:00Z',
  },
  {
    id: 2,
    chatId: 1,
    chat: [],
    message: 'Добрый день! Смартфон не продается.',
    authorId: users[1].id,
    author: users[1],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:05:00Z',
    updatedAt: '2023-10-01T09:05:00Z',
  },
  {
    id: 3,
    chatId: 1,
    chat: [],
    message: '...',
    authorId: users[0].id,
    author: users[0],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:10:00Z',
    updatedAt: '2023-10-01T09:10:00Z',
  },
  {
    id: 4,
    chatId: 1,
    chat: [],
    message: 'Извините это объявление устарело.',
    authorId: users[1].id,
    author: users[1],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:15:00Z',
    updatedAt: '2023-10-01T09:15:00Z',
  },
  {
    id: 5,
    chatId: 1,
    chat: [],
    message: 'Понятно',
    authorId: users[0].id,
    author: users[0],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:20:00Z',
    updatedAt: '2023-10-01T09:20:00Z',
  },
  {
    id: 6,
    chatId: 1,
    chat: [],
    message: 'Но у меня есть другой смартфон на продажу.',
    authorId: users[1].id,
    author: users[1],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:25:00Z',
    updatedAt: '2023-10-01T09:25:00Z',
  },
  {
    id: 7,
    chatId: 1,
    chat: [],
    message: 'Отлично! Можете прислать фото и характеристики?',
    authorId: users[0].id,
    author: users[0],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:30:00Z',
    updatedAt: '2023-10-01T09:30:00Z',
  },
  {
    id: 8,
    chatId: 1,
    chat: [],
    message: 'Конечно, вот фотографии.',
    authorId: users[1].id,
    author: users[1],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:35:00Z',
    updatedAt: '2023-10-01T09:35:00Z',
  },
  {
    id: 9,
    chatId: 1,
    chat: [],
    message: 'Спасибо, выглядит интересно. Какова цена?',
    authorId: users[0].id,
    author: users[0],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:40:00Z',
    updatedAt: '2023-10-01T09:40:00Z',
  },
  {
    id: 10,
    chatId: 1,
    chat: [],
    message: 'Цена 50 000 рублей.',
    authorId: users[1].id,
    author: users[1],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:45:00Z',
    updatedAt: '2023-10-01T09:45:00Z',
  },
  {
    id: 11,
    chatId: 1,
    chat: [],
    message: 'Хорошо, меня устраивает. Когда можем встретиться для осмотра?',
    authorId: users[0].id,
    author: users[0],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:50:00Z',
    updatedAt: '2023-10-01T09:50:00Z',
  },
  {
    id: 12,
    chatId: 1,
    chat: [],
    message: 'Я свободен завтра после обеда. Удобно?',
    authorId: users[1].id,
    author: users[1],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T09:55:00Z',
    updatedAt: '2023-10-01T09:55:00Z',
  },
  {
    id: 13,
    chatId: 1,
    chat: [],
    message: 'Да, завтра в 15:00 подойдет. Давайте встретимся в центре.',
    authorId: users[0].id,
    author: users[0],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T10:00:00Z',
    updatedAt: '2023-10-01T10:00:00Z',
  },
  {
    id: 14,
    chatId: 1,
    chat: [],
    message: 'Договорились. Я не приду',
    authorId: users[1].id,
    author: users[1],
    reactions: [],
    images: [],
    createdAt: '2023-10-01T10:05:00Z',
    updatedAt: '2023-10-01T10:05:00Z',
  },
];

const messagesChat2: IMessage[] = [
  {
    id: 4,
    chatId: 2,
    chat: [],
    message: 'Здравствуйте интересует холодильник.',
    authorId: users[2].id,
    author: users[2],
    reactions: [],
    images: [],
    createdAt: '2023-10-02T10:00:00Z',
    updatedAt: '2023-10-02T10:00:00Z',
  },
  {
    id: 5,
    chatId: 2,
    chat: [],
    message: 'Ало ало ало ало ало.',
    authorId: users[1].id,
    author: users[1],
    reactions: [],
    images: [],
    createdAt: '2023-10-02T10:05:00Z',
    updatedAt: '2023-10-02T10:05:00Z',
  },
  {
    id: 6,
    chatId: 2,
    chat: [],
    message: 'ЫЫ ЫЫ ЫЫЫЫЫЫ ЫЫЫЫЫЫЫЫЫЫЫЫЫЫы ЫЫЫЫ ЫЫЫЫЫЫЫ ЫЫЫЫЫЫЫЫЫЫЫЫ?',
    authorId: users[2].id,
    author: users[2],
    reactions: [],
    images: [],
    createdAt: '2023-10-02T10:10:00Z',
    updatedAt: '2023-10-02T10:10:00Z',
  },
];

const messagesChat3: IMessage[] = [
  {
    id: 7,
    chatId: 3,
    chat: [],
    message: 'Привет',
    authorId: users[0].id,
    author: users[0],
    reactions: [
      {
        reaction: 'ok',
        count: 5,
      },
    ],
    images: [],
    createdAt: '2023-10-03T11:00:00Z',
    updatedAt: '2023-10-03T11:00:00Z',
  },
  {
    id: 8,
    chatId: 3,
    chat: [],
    message: 'Пока',
    authorId: users[1].id,
    author: users[1],
    reactions: [],
    images: [],
    createdAt: '2023-10-03T11:05:00Z',
    updatedAt: '2023-10-03T11:05:00Z',
  },
];

export const chats: Chat[] = [
  {
    id: 1,
    productId: products[0].id,
    product: products[0],
    messages: messagesChat1,
    participants: [
      {chatId: 1, userId: users[0].id},
      {chatId: 1, userId: users[1].id},
    ],
  },
  {
    id: 2,
    productId: products[1].id,
    product: products[1],
    messages: messagesChat2,
    participants: [
      {chatId: 2, userId: users[2].id},
      {chatId: 2, userId: users[1].id},
    ],
  },
  {
    id: 3,
    productId: products[0].id,
    product: products[0],
    messages: messagesChat3,
    participants: [
      {chatId: 3, userId: users[0].id},
      {chatId: 3, userId: users[1].id},
    ],
  },
];
