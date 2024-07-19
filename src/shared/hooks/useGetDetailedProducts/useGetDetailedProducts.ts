import { useEffect, useState } from "react";
import { contentApi } from "../../../pages/api/contentApi";
import { ReferenceItem, SearchedProduct } from "../../models";
import {
  categoryMappings,
  convertArrayToString,
  findProductsWithCategory,
  uniqueElements,
  uniqueReferences,
} from "../../helpers";

interface GetDetailedProductsParams {
  productFullName: string;
  category: string;
  preference: string;
  spf: string;
  brand: string;
}

export const getBrandsFromPairedProducts = (
  pairedProducts: SearchedProduct[]
) => {
  const searchedBrands = pairedProducts.map((searchedProduct) => {
    return {
      id: searchedProduct.brand || "",
      name: searchedProduct.brand || "",
    };
  });
  const uniqueBrands = uniqueReferences(searchedBrands);
  return uniqueBrands;
};

export const useGetDetailedProducts = ({
  brand,
  category,
  preference,
  productFullName,
  spf,
}: GetDetailedProductsParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialBrands, setIsInitialBrands] = useState(true);
  const [detailedProducts, setDetailedProducts] = useState<SearchedProduct[]>(
    []
  );
  const [brands, setBrands] = useState<ReferenceItem[]>([]);

  const getDetailedProducts = async ({
    brand,
    category,
    preference,
    productFullName,
    spf,
  }: GetDetailedProductsParams) => {
    try {
      setIsLoading(true);
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

      const detailedProducts = await contentApi.getDetailedProducts({
        brand,
        categories: adaptedCategories,
        mainCategory: formattedCategory,
        preference,
        spf,
      });

      if (isInitialBrands && detailedProducts) {
        const brands = getBrandsFromPairedProducts(detailedProducts);
        setBrands(brands);
        setIsInitialBrands(false);
      }

      const adaptedDetailedProducts = detailedProducts.map(
        (detailedProduct) => {
          return {
            ...detailedProduct,
            price: detailedProduct.price ? detailedProduct.price : "$0",
          };
        }
      );

      setDetailedProducts(adaptedDetailedProducts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDetailedProducts({
      brand,
      category,
      preference,
      productFullName,
      spf,
    });
  }, [brand, category, preference, productFullName, spf]);

  return {
    isLoading,
    detailedProducts,
    brands,
  };
};
