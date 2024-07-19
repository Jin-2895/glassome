import { useState, useEffect } from "react";
import produce from "immer";
import { FormikErrors } from "formik";
import { adaptContenfulReferences } from "../../helpers/References";
import { contentApi } from "../../../pages/api/contentApi";
import { ReferenceItem } from "../../models";
import { useDebounce } from "../useDebounce/useDebounce";
import { formatCommaDelimiter } from "../../helpers";

const adaptReferencesLoading = (
  index: number,
  data: boolean[],
  value: boolean
) =>
  produce(data, (draft) => {
    draft[index] = value;
  });

interface FormikValues {
  brand: string;
  productName: string;
  foundation: string;
}

interface ReferencesParams {
  brand: string;
  productName: string;
  foundation: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<FormikValues>>;
}

export const useReferences = ({
  foundation,
  brand,
  productName,
  setFieldValue,
}: ReferencesParams) => {
  const [loadings, setLoadings] = useState([false, false, false]);
  const [brands, setBrands] = useState<ReferenceItem[]>([]);
  const [categories, setCategories] = useState<ReferenceItem[]>([]);
  const [productNames, setProductNames] = useState<ReferenceItem[]>([]);
  const [shades, setShades] = useState<ReferenceItem[]>([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [productNamesSearch, setProductNamesSearch] = useState("");
  const [shadesSearch, setShadesSearch] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");

  const debouncedBrandQuery = useDebounce(brandSearch, 300);
  const debouncedProductQuery = useDebounce(productNamesSearch, 300);
  const debouncedShadesQuery = useDebounce(shadesSearch, 300);

  const setLoading = (index: number, value: boolean) => {
    setLoadings((prev) => adaptReferencesLoading(index, prev, value));
  };

  const onBrandSearch = (value: string) => {
    setBrandSearch(value);
  };

  const onProductNamesSearch = (value: string) => {
    setProductNamesSearch(value);
  };

  const onShadesSearch = (value: string) => {
    setShadesSearch(value);
  };

  const getCategories = async () => {
    const categories = await contentApi.getCategories();
    setCategories(adaptContenfulReferences(categories.items));
  };

  const getRecommendationBrands = async (searchQuery: string) => {
    try {
      setLoading(0, true);
      setCurrentCategory(searchQuery);
      const brands = await contentApi.getRecommendationBrands(searchQuery);
      setBrands(brands);
    } finally {
      setLoading(0, false);
    }
  };

  const getRecommendationProductNames = async (
    category: string,
    searchQuery: string
  ) => {
    try {
      setLoading(1, true);
      const productNames = await contentApi.getRecommendationProductNames(
        category,
        searchQuery
      );
      setProductNames(productNames);
    } finally {
      setLoading(1, false);
    }
  };

  const getRecommendationShades = async (
    brand: string,
    productName: string
  ) => {
    try {
      setLoading(2, true);
      const shades = await contentApi.getRecommendationShades(
        brand,
        productName
      );

      const formattedShades = shades
        .map((shade) => ({
          ...shade,
          name: formatCommaDelimiter(shade.name),
        }))
        .sort((a, b) => {
          // sort shades numerically if numbers
          if (
            !Number.isNaN(a.name as unknown as number) &&
            !Number.isNaN(b.name as unknown as number)
          ) {
            return Number(a.name) - Number(b.name);
          }
          // sort shades alphabetically
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      setShades(formattedShades);
    } finally {
      setLoading(2, false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (!debouncedBrandQuery) {
      return;
    }
    getRecommendationBrands(debouncedBrandQuery);
  }, [debouncedBrandQuery]);

  useEffect(() => {
    if (!debouncedProductQuery) {
      return;
    }
    getRecommendationProductNames(currentCategory, debouncedProductQuery);
  }, [debouncedProductQuery, currentCategory]);

  useEffect(() => {
    if (!debouncedShadesQuery) {
      return;
    }
    getRecommendationShades(debouncedProductQuery, debouncedShadesQuery);
  }, [debouncedShadesQuery, debouncedProductQuery]);

  useEffect(() => {
    if (!foundation || debouncedBrandQuery) {
      setFieldValue("brand", "");
      setBrands([]);
    }
  }, [foundation, debouncedBrandQuery]);

  useEffect(() => {
    if (!brand || debouncedProductQuery) {
      setFieldValue("productName", "");
      setProductNames([]);
    }
  }, [brand, debouncedProductQuery]);

  useEffect(() => {
    if (!productName || debouncedShadesQuery) {
      setFieldValue("shade", "");
      setShades([]);
    }
  }, [productName, debouncedShadesQuery]);

  return {
    brands,
    categories,
    productNames,
    shades,
    loadings,
    onBrandSearch,
    onProductNamesSearch,
    onShadesSearch,
  };
};
