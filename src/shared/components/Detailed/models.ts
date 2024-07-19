import { Range } from "react-input-range";

export interface FormikFiltersValues {
  preference: string;
  spf: string;
  priceRange: Range;
  order: string;
  brand: string;
}

export interface Tutorial {
  link: string;
  creator: string;
  id: string;
}
