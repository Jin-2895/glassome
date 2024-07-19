import {
  adaptContenfulReferences,
  adaptPairedProducts,
  adaptPopularProducts,
  adaptReference,
  checkProductShades,
  filterRecommendationProducts,
  formatProductCategory,
  sortReferences,
  uniqueReferences,
} from "../../../shared/helpers";
import {
  IPreferenceFields,
  IUndertoneFields,
  IProductFields,
  ISkintoneFields,
  ICategoryFields,
  IRecommendationProductFields,
  ISpfFields,
  IAlphabetFields,
  IPriceFields,
  IPopularProductFields,
  IDetailedCategoryFields,
} from "../../../shared/types/generated/contentful.d";
import { contentfulApi } from "../api";

interface DetailedProductsParams {
  mainCategory: string;
  categories: string;
  brand: string;
  preference: string;
  spf: string;
}

const getCategories = async () => {
  const categories = await contentfulApi.getEntries<ICategoryFields>({
    content_type: "category",
  });

  return categories;
};

const getDetailedCategories = async () => {
  const detailedCategories =
    await contentfulApi.getEntries<IDetailedCategoryFields>({
      content_type: "detailed_category",
    });

  return detailedCategories;
};

const getRecommendationBrands = async (category: string) => {
  const formattedCategory = formatProductCategory(category);

  const brands = await contentfulApi.getEntries<IProductFields>({
    content_type: "product",
    "fields.category[match]": formattedCategory,
    limit: 1000,
  });

  const adaptedBrands = adaptReference(brands.items, "brand");
  const uniqueBrands = uniqueReferences(adaptedBrands);
  const resultBrands = sortReferences(uniqueBrands);

  return resultBrands;
};

const getRecommendationProductNames = async (
  category: string,
  brand: string
) => {
  const formattedCategory = formatProductCategory(category);

  const productNames = await contentfulApi.getEntries<IProductFields>({
    content_type: "product",
    "fields.category[match]": formattedCategory,
    "fields.brand[match]": brand,
  });

  const adaptedProductNames = adaptReference(productNames.items, "product");
  const uniqueProductNames = uniqueReferences(adaptedProductNames);
  const resultProductNames = sortReferences(uniqueProductNames);

  return resultProductNames;
};

const getRecommendationShades = async (brand: string, productName: string) => {
  const shades = await contentfulApi.getEntries<IProductFields>({
    content_type: "product",
    "fields.product[match]": productName,
    "fields.brand[match]": brand,
  });
  const adaptedShades = adaptReference(shades.items, "shade");
  const uniqueShades = uniqueReferences(adaptedShades);
  const resultShades = checkProductShades(uniqueShades);
  return resultShades;
};

const getPopularProducts = async (
  skintone: string,
  undertone: string,
  preference: string
) => {
  const popularProducts = await contentfulApi.getEntries<IPopularProductFields>(
    {
      content_type: "popular_product",
      "fields.skintone": skintone,
      "fields.undertone": undertone,
      ...(preference && { [`fields.${preference}`]: true }),
      limit: 500,
    }
  );

  const resultPopularProducts = adaptPopularProducts(popularProducts.items);
  return resultPopularProducts;
};

const getSearchProductWithImage = async (
  category: string,
  productName: string
) => {
  const productImage = await contentfulApi.getEntries<IProductFields>({
    content_type: "product",
    "fields.category[match]": category,
    "fields.full_product[match]": productName,
  });

  return productImage.items;
};

const getSkintones = async () => {
  const skinTones = await contentfulApi.getEntries<ISkintoneFields>({
    content_type: "skintone",
    order: "fields.name",
  });
  return skinTones;
};

const getPreferences = async () => {
  const preferences = await contentfulApi.getEntries<IPreferenceFields>({
    content_type: "preference",
    order: "fields.name",
  });
  const adaptedPreferences = adaptContenfulReferences(preferences.items);
  return adaptedPreferences;
};

const getSpfs = async () => {
  const spfs = await contentfulApi.getEntries<ISpfFields>({
    content_type: "spf",
    order: "fields.name",
  });

  const adaptedPreferences = adaptContenfulReferences(spfs.items);

  return adaptedPreferences;
};

const getAlphabetFilters = async () => {
  const alphabetFilters = await contentfulApi.getEntries<IAlphabetFields>({
    content_type: "alphabet",
    order: "fields.name",
  });

  const adaptedAlphabetfilters = adaptContenfulReferences(
    alphabetFilters.items
  );
  return adaptedAlphabetfilters;
};

const getPriceFilters = async () => {
  const priceFilters = await contentfulApi.getEntries<IPriceFields>({
    content_type: "price",
    order: "fields.name",
  });

  const adaptedPriceFilters = adaptContenfulReferences(priceFilters.items);
  return adaptedPriceFilters;
};

const getUndertones = async () => {
  const undertones = await contentfulApi.getEntries<IUndertoneFields>({
    content_type: "undertone",
    order: "fields.name",
  });

  return undertones;
};

const getPairedProducts = async (fullProductName: string) => {
  const pairedProducts =
    await contentfulApi.getEntries<IRecommendationProductFields>({
      content_type: "recommendation_product",
      query: fullProductName,
    });

  const adaptedPairedProducts = adaptPairedProducts(pairedProducts.items);
  const resultPairedProducts =
    filterRecommendationProducts(adaptedPairedProducts, fullProductName) || [];
  return resultPairedProducts;
};

const getSearchedProducts = async (
  mainCategory: string,
  categories: string
) => {
  const searchedProducts = await contentfulApi.getEntries<IProductFields>({
    content_type: "product",
    "fields.category[in]": mainCategory,
    "fields.full_product[in]": categories,
  });

  const resultSearchedProducts = searchedProducts.items.map((searchProduct) => {
    return {
      ...searchProduct.fields,
    };
  });

  return resultSearchedProducts;
};

const getDetailedProducts = async ({
  brand,
  categories,
  mainCategory,
  preference,
  spf,
}: DetailedProductsParams) => {
  const preferences = {
    "Bipoc-founded": "bipoc_founded",
    Clean: "clean",
    "Cruelty-free": "cruelty_free",
    "Gluten-free": "gluten_free",
    "Oil-free": "oil_free",
    "Paraben-free": "paraben_free",
    "Talc-free": "talc_free",
    Vegan: "vegan",
  };
  const preferenceValue = preferences[preference as keyof typeof preferences];
  const detailedProducts = await contentfulApi.getEntries<IProductFields>({
    content_type: "product",
    "fields.category[in]": mainCategory,
    "fields.full_product[in]": categories,
    "fields.brand[match]": brand,
    ...(preferenceValue && { [`fields.${preferenceValue}`]: true }),
    ...(spf === "No SPF" && { "fields.spf[lte]": 0 }),
    ...(spf === "Under SPF 30" && { "fields.spf[lte]": 30 }),
    ...(spf === "Over SPF 30" && { "fields.spf[gt]": 30 }),
  });

  const resultDetailedProducts = detailedProducts.items.map((product) => {
    return {
      id: product.sys.id,
      ...product.fields,
    };
  });

  return resultDetailedProducts;
};

export const contentApi = {
  getCategories,
  getAlphabetFilters,
  getPriceFilters,
  getSpfs,
  getPopularProducts,
  getDetailedCategories,
  getRecommendationShades,
  getRecommendationBrands,
  getRecommendationProductNames,
  getSearchProductWithImage,
  getPairedProducts,
  getSkintones,
  getPreferences,
  getUndertones,
  getSearchedProducts,
  getDetailedProducts,
};
