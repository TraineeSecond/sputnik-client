import axios from 'axios';
import {create} from 'zustand';

export type Point = {
  id: number;
  name: string;
  rating: number;
  lat: number;
  lon: number;
  address: string;
  reviewCount: number;
};

type MapStore = {
  points: Point[];

  isLoading: boolean;

  setIsLoading: (isLoading: boolean) => void;

  fetchPoints: () => Promise<void>;
  newPoint: (
    name: string,
    lat: number,
    lon: number,
    address: string,
  ) => Promise<void>;
  makeReview: (
    userid: number,
    pointid: number,
    rating: number,
  ) => Promise<void>;
  updateReview: (
    userid: number,
    pointid: number,
    rating: number,
  ) => Promise<void>;
};

export const useMapStore = create<MapStore>((set, get) => ({
  points: [],

  isLoading: false,

  setIsLoading: (isLoading: boolean) => set({isLoading}),

  fetchPoints: async () => {
    try {
      set({isLoading: true});
      const {data} = await axios.get('https://domennameabcdef.ru/api/points');
      set({points: data});
    } catch (error) {
      console.error('Failed to fetch points:', error);
    } finally {
      set({isLoading: false});
    }
  },
  newPoint: async (name: string, lat: number, lon: number, address: string) => {
    try {
      const {data} = await axios.post('https://domennameabcdef.ru/api/points', {
        name,
        lat,
        lon,
        address,
      });

      const currentPoints = get().points;

      set({points: [...currentPoints, data]});
    } catch (error) {
      console.error('Failed to fetch points:', error);
    }
  },
  makeReview: async (userid: number, pointid: number, rating: number) => {
    try {
      const {data} = await axios.post(
        'https://domennameabcdef.ru/api/points/review',
        {
          userid,
          pointid,
          rating,
        },
      );

      const updatedPoint = data.updatedPoint;
      const currentPoints = get().points;

      const updatedPoints = currentPoints.map(point =>
        point.id === updatedPoint.id ? updatedPoint : point,
      );

      set({points: updatedPoints});
    } catch (error) {
      console.error('Failed to fetch points:', error);
    }
  },

  updateReview: async (userid: number, pointid: number, rating: number) => {
    try {
      const {data} = await axios.put(
        'https://domennameabcdef.ru/api/points/review',
        {
          userid,
          pointid,
          rating,
        },
      );

      const updatedPoint = data.updatedPoint;
      const currentPoints = get().points;

      const updatedPoints = currentPoints.map(point =>
        point.id === updatedPoint.id ? updatedPoint : point,
      );

      set({points: updatedPoints});
    } catch (error) {
      console.error('Failed to update review:', error);
    }
  },
}));
