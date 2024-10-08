import axios from 'axios';
import {create} from 'zustand';

type ReviewsPointsStore = {
  userRating: number;
  isModalVisible: boolean;
  setUserRating(value: number): void;
  setIsModalVisible(value: boolean): void;
};

export const useReviewsPointsStore = create<ReviewsPointsStore>(set => ({
  userRating: 0,

  isModalVisible: false,

  setUserRating: (value: number) => {
    set({userRating: value});
  },

  setIsModalVisible: (value: boolean) => {
    set({isModalVisible: value});
  },
}));
