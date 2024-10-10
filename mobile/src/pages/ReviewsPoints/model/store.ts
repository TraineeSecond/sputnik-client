import axios from 'axios';
import {Point} from 'features/MapInfo/model/store';
import {create} from 'zustand';

type Review = {
  id: number;
  rating: number;
  userid: number;
  pointid: number;
};

type ReviewsPointsStore = {
  userRating: number;
  isModalVisible: boolean;
  hasReview: boolean;
  setUserRating(value: number): void;
  setHasReview(value: boolean): void;
  setIsModalVisible(value: boolean): void;

  getUserRating(pointid: number, userid: number): Promise<void>;
};

export const useReviewsPointsStore = create<ReviewsPointsStore>(set => ({
  userRating: 0,

  isModalVisible: false,

  hasReview: false,

  setHasReview: (value: boolean) => {
    set({hasReview: value});
  },

  setUserRating: (value: number) => {
    set({userRating: value});
  },

  setIsModalVisible: (value: boolean) => {
    set({isModalVisible: value});
  },

  getUserRating: async (pointid: number, userid: number) => {
    try {
      const {data} = await axios.get(
        `https://domennameabcdef.ru/api/points/${pointid}`,
      );

      const review = data.find((review: Review) => review.userid === userid);
      if (review) {
        set({userRating: review.rating});
        set({hasReview: true});
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
