import { categorizePairedProducts, uniqueElements, uuid } from "../../helpers";
import {
  IProductFields,
  IRecommendationProductFields,
} from "../../types/generated/contentful";

export const adaptSearchedProducts = (searchedProducts: IProductFields[]) => {
  const categories = searchedProducts.map(({ category }) => {
    return category || "";
  });

  const uniqueCategories = uniqueElements(categories);
  const resultProducts = categorizePairedProducts(
    uniqueCategories,
    searchedProducts
  );
  return resultProducts;
};

interface ProductCategory {
  items: IProductFields[];
  category: string;
  total: number;
}

export const getTutorials = (
  tutorials: IRecommendationProductFields[],
  productsWithNecessaryCategories: ProductCategory[]
) => {
  const productsCategories =
    [...productsWithNecessaryCategories][0].items.map(
      (item) => item.full_product
    ) || [];

  const matchedValues = tutorials
    .filter((tutorial) =>
      Object.values(tutorial).some((value) =>
        productsCategories.includes(value)
      )
    )
    .map((tutorial) => ({
      link: tutorial.link || "",
      creator: tutorial.creator || "",
      id: uuid(),
    }));

  return matchedValues;
};
