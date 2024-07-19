import { useEffect, useState } from "react";
import { contentApi } from "../../../pages/api/contentApi";
import { ReferenceItem } from "../../models";

export const useProductFilters = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<ReferenceItem[]>([]);
  const [spfs, setSpfs] = useState<ReferenceItem[]>([]);
  const [alphabetFilters, setAlphabetFilters] = useState<ReferenceItem[]>([]);
  const [priceFilters, setPriceFilters] = useState<ReferenceItem[]>([]);

  const getProductFilters = async () => {
    try {
      setIsLoading(true);

      const [preferences, spfs, alphabetFilters, priceFilters] =
        await Promise.all([
          contentApi.getPreferences(),
          contentApi.getSpfs(),
          contentApi.getAlphabetFilters(),
          contentApi.getPriceFilters(),
        ]);

      setPreferences(preferences);
      setSpfs(spfs);
      setAlphabetFilters(alphabetFilters);
      setPriceFilters(priceFilters);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductFilters();
  }, []);

  return {
    isLoading,
    preferences,
    spfs,
    alphabetFilters,
    priceFilters,
  };
};
