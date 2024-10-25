export interface Review {
  id: number;
  rating: number;
  userid: number;
  pointid: number;
}

export interface IPoint {
  id: number;
  name: string;
  rating: number;
  lat: number;
  lon: number;
  address: string;
  reviewCount: number;
  reviews: Review[];
}

export interface IPointsState {
  points: IPoint[];
  loadPoints: () => Promise<void>;
}

export type TPointsResponse = IPoint[];
