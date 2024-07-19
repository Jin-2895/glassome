import { useEffect, useState } from "react";
import { Entry } from "contentful";
import { IDetailedCategoryFields } from "../../types/generated/contentful";
import { contentApi } from "../../../pages/api/contentApi";

export const useCategories = () => {
  const [categories, setCategories] = useState<
    Entry<IDetailedCategoryFields>[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      try {
        const response = await contentApi.getDetailedCategories();

        setCategories(response.items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    init();
  }, []);

  return { categories, loading };
};
