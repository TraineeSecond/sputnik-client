import {create} from 'zustand';
import axios from 'axios';

type ReviewStore = {
  userRating: number;
  hasReview: boolean;

  setHasReview(value: boolean): void;

  setUserRating: (userRating : number) => void;

  makeReview: (userid: number, productid: number, rating: number) => Promise<void>;
  putReview: (userid: number, productid: number, rating: number) => Promise<void>;
  getReview: (productid: number) => Promise<void>;
};

export const useReviewStore = create<ReviewStore>(set => ({
  userRating: 0,
  hasReview: false,

  setHasReview: (value: boolean) => {
    set({hasReview: value});
  },

  setUserRating: (userRating: number) => {
    set({userRating});
  },

  makeReview: async (userid: number, productid: number, rating: number) => {
    try {
      const {data} = await axios.post('https://domennameabcdef.ru/api/reviews',{
        userid,
        productid,
        rating,
      });
      return data;
    } catch (error: any) {
      console.error(error.response);
    }
  },

  putReview: async (userid: number, productid: number, rating: number) => {
    try {
      const {data} = await axios.put('https://domennameabcdef.ru/api/reviews',{
        userid,
        productid,
        rating,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  getReview: async (productid: number) => {
    try {
      const {data} = await axios.get(`https://domennameabcdef.ru/api/reviews/${productid}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
}));
