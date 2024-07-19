import { useEffect, useState } from "react";
import { contentApi } from "../../../pages/api/contentApi";
import { Tutorial } from "../../components/Detailed/models";
import {
  categoryMappings,
  convertArrayToString,
  findProductsWithCategory,
  uniqueElements,
} from "../../helpers";
import { CategorizedProduct } from "../../models";
import { adaptSearchedProducts, getTutorials } from "./adapters";

export const useGetSearchedProducts = (
  productFullName: string,
  category: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categorizedProducts, setCategorizedProducts] = useState<
    CategorizedProduct[]
  >([]);

  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  const getSearchedProducts = async (
    productFullName: string,
    category: string
  ) => {
    setIsLoading(true);
    try {
      const pairedProducts = await contentApi.getPairedProducts(
        productFullName
      );

      const categories = category?.split(",") || [];
      const productsWithNecessaryCategories = findProductsWithCategory(
        pairedProducts,
        categories
      );

      const adaptedCategories = convertArrayToString(
        uniqueElements(productsWithNecessaryCategories)
      );

      const formattedCategory = convertArrayToString(
        categories.map((category) => {
          return categoryMappings[category] || "";
        })
      );

      const searchedProducts = await contentApi.getSearchedProducts(
        formattedCategory,
        adaptedCategories
      );

      const categorizedProducts = adaptSearchedProducts(searchedProducts);
      const tutorials = getTutorials(pairedProducts, categorizedProducts);

      setCategorizedProducts(categorizedProducts);
      setTutorials(tutorials);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productFullName) {
      getSearchedProducts(productFullName, category);
    }
  }, [productFullName, category]);

  return {
    isLoading,
    categorizedProducts,
    tutorials,
  };
};
