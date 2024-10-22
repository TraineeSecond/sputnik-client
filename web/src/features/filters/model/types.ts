export type TFilter = string;

export type TFiltersResponse = TFilter[];

export interface IFiltersState {
  showFilterPopUp: boolean;
  toggleShowFilterPopUp: () => void;
}
