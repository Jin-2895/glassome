import { Entry } from "contentful";
import { useEffect, useState } from "react";
import { contentApi } from "../../../pages/api/contentApi";
import { IProductFields } from "../../types/generated/contentful";

export const useSearchProductImage = (
  category: string,
  fullProductName: string
) => {
  const [searchedProducts, setSearchedProducts] = useState<
    Entry<IProductFields>[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const getSearchProductsWithImage = async (
    category: string,
    productName: string
  ) => {
    try {
      setIsLoading(true);
      const productsWithImage = await contentApi.getSearchProductWithImage(
        category,
        productName
      );
      const finalProducts = productsWithImage.filter(
        (productWithImage) =>
          productWithImage.fields.full_product === fullProductName
      );
      setSearchedProducts(finalProducts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fullProductName && category) {
      getSearchProductsWithImage(category, fullProductName);
    }
  }, [category, fullProductName]);

  return {
    isLoading,
    searchedProducts,
  };
};
