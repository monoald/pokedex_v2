interface Base2 {
  name: string;
  index: number;
}

interface Region extends Base2 {
  id: string;
}

export interface AllElements {
  regions: Region[];
  types: Base2[];
}

export interface AddedFilters {
  region: Region | null;
  types: Base2[];
}

export interface Filters {
  isIntersected: boolean;
  isFiltered: string[];
  setIsFiltered: React.Dispatch<React.SetStateAction<string[]>>;
  allElements: AllElements;
  setAllElements: React.Dispatch<React.SetStateAction<AllElements>>;
  filters: AddedFilters;
  setFilters: React.Dispatch<React.SetStateAction<AddedFilters>>;
}
