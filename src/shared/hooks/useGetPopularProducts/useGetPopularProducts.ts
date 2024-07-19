import { useEffect, useState } from "react";
import { contentApi } from "../../../pages/api/contentApi";
import { formatPreference } from "../../helpers";
import { PopularProduct } from "../../models";
import { useDebounce } from "../useDebounce/useDebounce";

const replaceHyphenWithComma = (value: string) => {
  return value.replace(/-/g, ", ");
};

export const useGetPopularProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [popularProducts, setPopularProducts] = useState<PopularProduct[]>([]);
  const [preference, setPreference] = useState("");
  const [undertone, setUndertone] = useState("");
  const [skintone, setSkintone] = useState("");

  const debouncedUndertone = useDebounce(undertone, 300);
  const debouncedSkintone = useDebounce(skintone, 300);
  const debouncedPreference = useDebounce(preference, 300);

  const getPopularProducts = async (
    skintone: string,
    undertone: string,
    preference: string
  ) => {
    try {
      setIsLoading(true);
      const formattedPreference = formatPreference(preference);
      const popularProducts = await contentApi.getPopularProducts(
        skintone,
        replaceHyphenWithComma(undertone),
        formattedPreference
      );
      setPopularProducts(popularProducts);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPopularProducts(
      debouncedSkintone,
      debouncedUndertone,
      debouncedPreference
    );
  }, [debouncedSkintone, debouncedUndertone, debouncedPreference]);

  const onPreferenceChange = (value: string) => {
    setPreference(value);
  };

  const onUndertoneChange = (value: string) => {
    setUndertone(value);
  };

  const onSkintoneChange = (value: string) => {
    setSkintone(value);
  };

  return {
    isLoading,
    popularProducts,
    onPreferenceChange,
    onUndertoneChange,
    onSkintoneChange,
  };
};
