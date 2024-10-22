export interface IDeliveryViewStore {
  selectedPointId: number | null;
  deliveryDate: string | null;
  setSelectedPointId: (selectedPointId: number | null) => void;
  setDeliveryDate: (deliveryDate: string | null) => void;
}
