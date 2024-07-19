import { Entry } from "contentful";
import uniqBy from "lodash.uniqby";
import { identity } from "lodash";
import {
  IPopularProductFields,
  IProductFields,
  IRecommendationProductFields,
} from "../types/generated/contentful";

type BaseReference = {
  name?: string;
};

type ProductReference = IProductFields;
type AdaptedReference = {
  id: string;
  name: string;
};

interface CategoryMapping {
  [key: string]: string;
}

export const categoryMappings: CategoryMapping = {
  foundation: "foundation",
  concealer: "concealer",
  blush: "blush",
  "bronzer/contour": "bronzer/contour",
  powder: "powder",
  highlighter: "highlighter",
  lipliner: "lip liner",
  lipstick: "lipstick",
  lipgloss: "lip gloss",
};

export const additionalCategoryMappings: CategoryMapping = {
  foundation: "foundation",
  concealer: "concealer",
  blush: "blush",
  "bronzer/contour": "bronzer/contour",
  powder: "powder",
  highlighter: "highlighter",
  "lip liner": "lipliner",
  lipstick: "lipstick",
  "lip gloss": "lipgloss",
};

interface PreferenceMappings {
  [key: string]: string;
}

const preferenceMappings: PreferenceMappings = {
  "Bipoc-founded": "bipoc_founded",
  Vegan: "vegan",
  Clean: "clean",
  "Talc-free": "talc_free",
  "Gluten-free": "gluten_free",
  "Cruelty-free": "cruelty_free",
  "Oil-free": "oil_free",
  "Paraben-free": "paraben_free",
};

export const adaptContenfulReferences = <T extends BaseReference>(
  references: Entry<T>[]
) => {
  return references.map((reference) => {
    return {
      id: reference.sys.id,
      name: reference.fields.name || "",
    };
  });
};

export const adaptReference = (
  references: Entry<ProductReference>[],
  key: keyof IProductFields
) => {
  return references.map((reference) => {
    return {
      id: reference.sys.id,
      name: String(reference.fields[key]) || "",
    };
  });
};

export const uniqueReferences = (references: AdaptedReference[]) =>
  uniqBy(references, "name");

export const checkProductShades = (references: AdaptedReference[]) => {
  return references.map((reference) => ({
    ...reference,
    name: reference.name ? reference.name : "no shade",
  }));
};

export const adaptProductNames = (products: Entry<IProductFields>[]) => {
  return products.map((product) => {
    return {
      id: product.sys.id,
      name: product.fields.product || "",
    };
  });
};

export const uniqueElements = (elements: string[]) => {
  return uniqBy(elements, identity);
};

export const sortReferences = (references: AdaptedReference[]) => {
  return references.sort((a, b) => a.name.localeCompare(b.name));
};

export const categorizePairedProducts = (
  categories: string[],
  products: IProductFields[]
) => {
  const productsWithCategories = categories.map((category) => {
    const items = products.filter((element) => element.category === category);
    return { category, items, total: items.length };
  });

  return productsWithCategories.map((productWithCategory) => {
    return {
      ...productWithCategory,
      items: productWithCategory.items.slice(0, 3),
    };
  });
};

export const adaptPairedProducts = (
  products: Entry<IRecommendationProductFields>[]
) => {
  return products.map((product) => {
    return {
      ...product.fields,
    };
  });
};

export const adaptPopularProducts = (
  popularProducts: Entry<IPopularProductFields>[]
) => {
  return popularProducts.map((popularProduct) => {
    return {
      ...popularProduct.fields,
      id: popularProduct.sys.id,
    };
  });
};

export const adaptTitleForDropDown = (
  title: string[],
  defaultTitle: string
) => {
  if (!title.length) {
    return defaultTitle;
  }

  return title[0];
};

export const convertArrayToString = (array: string[], delimiter = ",") => {
  return array.join(delimiter);
};

export const adaptAdditionalProductCategory = (productCategory: string) => {
  return additionalCategoryMappings[productCategory] || "";
};

export const formatProductCategory = (productCategory: string | string[]) => {
  if (typeof productCategory === "string") {
    return categoryMappings[productCategory] || "";
  }
  if (Array.isArray(productCategory)) {
    const matchedProductCategories = productCategory.flatMap((category) => {
      return categoryMappings[category] || [];
    });

    return convertArrayToString(matchedProductCategories);
  }
  return "";
};

export const formatPreference = (preference: string) => {
  const formattedPreference = preferenceMappings[preference] ?? "";
  return formattedPreference;
};

export const filterRecommendationProducts = (
  recommendationProducts: IRecommendationProductFields[],
  query: string
) => {
  return recommendationProducts.filter((recommendationProduct) => {
    return Object.entries(recommendationProduct).some(
      ([_, value]) => value === query
    );
  });
};

interface ProductMapping {
  [key: string]: string[];
}

export const productMappings: ProductMapping = {
  foundation: ["foundation_1", "foundation_2", "foundation_3", "foundation_4"],
  concealer: [
    "concealer_1",
    "concealer_2",
    "concealer_3",
    "concealer_4",
    "concealer_5",
  ],
  blush: ["blush_1", "blush_2", "blush_3", "blush_4"],
  "bronzer/contour": [
    "bronzercontour_1",
    "bronzercontour_2",
    "bronzercontour_3",
    "bronzercontour_4",
    "bronzercontour_5",
  ],
  powder: [
    "powder_1",
    "powder_2",
    "powder_3",
    "powder_4",
    "powder_5",
    "powder_6",
  ],
  highlighter: ["highlighter_1", "highlighter_2", "highlighter_3"],
  lipliner: ["lipliner_1", "lipliner_2", "lipliner_3"],
  lipstick: ["lipstick_1", "lipstick_2", "lipstick_3", "lipstick_4"],
  lipgloss: ["lipgloss_1", "lipgloss_2", "lipgloss_3"],
};

export const findProductsWithCategory = (
  products: IRecommendationProductFields[],
  categories: string[]
) => {
  if (!products.length) {
    return [];
  }

  const formattedCategories = categories.flatMap((category) => {
    return productMappings[category] || [];
  });

  let resultCategories: string[] = [];
  products.forEach((product) => {
    const productKeys = Object.keys(product);
    productKeys.forEach((key) => {
      if (formattedCategories.includes(key)) {
        // @ts-ignore
        resultCategories = [...resultCategories, product[key]];
      }
    });
  });
  return resultCategories.filter(Boolean);
};
