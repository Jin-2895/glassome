import { useEffect, useState } from "react";
import { adaptContenfulReferences } from "../../helpers/References";
import { contentApi } from "../../../pages/api/contentApi";
import { ReferenceItem } from "../../models";

export const usePopularProductsReferences = () => {
  const [preferences, setPreferences] = useState<ReferenceItem[]>([]);
  const [undertones, setUndertones] = useState<ReferenceItem[]>([]);
  const [skintones, setSkintones] = useState<ReferenceItem[]>([]);

  const getReferences = async () => {
    const [preferences, undertones, skintones] = await Promise.all([
      contentApi.getPreferences(),
      contentApi.getUndertones(),
      contentApi.getSkintones(),
    ]);

    setPreferences(preferences);
    setUndertones(adaptContenfulReferences(undertones.items));
    setSkintones(adaptContenfulReferences(skintones.items));
  };

  useEffect(() => {
    getReferences();
  }, []);

  return {
    preferences,
    undertones,
    skintones,
  };
};
