import {Product} from 'entities/product';
import {User} from 'entities/user';

export type Appeal = {
  id: number;
  participants: AppealsParticipant[];
  problem: string;
  images: AppealImages[];
  status: 'pending' | 'rejected' | 'accepted';
  product: Product;
  productId: number;
};

export type AppealsParticipant = {
  userId: number;
  user: User;
};

export type AppealImages = {
  id: number;
  image: string;
};

export type FormAppeal = {
  productId: string;
  sellerId: number | undefined;
  buyerId: number;
  images: string[];
  problem: string;
};
