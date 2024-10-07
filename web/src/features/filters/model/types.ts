export type Filter = string

export type FiltersResponse = Filter[];

export interface FiltersState {
    showFilterPopUp: boolean
    toggleShowFilterPopUp: () => void
}


