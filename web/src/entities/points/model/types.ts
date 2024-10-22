export interface Review {
  id: number;
  rating: number;
  userid: number;
  pointid: number;
}

export interface Point {
  id: number;
  name: string;
  rating: number;
  lat: number;
  lon: number;
  address: string;
  reviewCount: number;
  reviews: Review[];
}

export interface PointsState {
  points: Point[];
  loadPoints: () => Promise<void>;
}

export type PointsResponse = Point[];
