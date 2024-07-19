import {
  IPopularProductFields,
  IProductFields,
} from "../types/generated/contentful";

export enum GoogleAnalyticsEventNames {
  "OLIVE_GUIDE_DOWNLOADED" = "Olive_guide_downloaded",
  "SEARCHED_PERFORMED" = "Search_performed",
  "PRODUCT_SEARCHED" = "Product_searched",
  "PRODUCT_TO_PAIR" = "Product_to_pair",
  "TOP_BRAND_SEARCHED" = "Top_brand_searched",
  "RESULTS_PAGE_FILTERS" = "Results_page_filters",
  "CLICK_ON_POPULAR_PRODUCT" = "Click_on_popular_product",
  "POPULAR_PRODUCT_FAVORITE" = "Popular_product_favorited",
  "LIBRARY_VIEWS" = "Library_views",
  "FORM_COMPLETED" = "Form_completed",
  "POPULAR_PRODUCT_SKIN_TONES" = "Popular_product_skintone",
  "POPULAR_PRODUCT_UNDERTONE" = "Popular_product_undertone",
}

export interface ReferenceItem {
  id: string;
  name: string;
}

export interface PopularProduct extends IPopularProductFields {
  id: string;
}

export interface SearchedProduct extends IProductFields {
  id: string;
}

export interface FavoriteProduct {
  id?: string;
  userId?: string;
  productId?: string;
  category?: string;
  price?: string;
  link?: string;
  img_url?: string;
  brand?: string;
  shade?: string;
  product?: string;
}

export interface CategorizedProduct {
  category: string;
  items: IProductFields[];
  total: number;
}

export interface FirebaseUser {
  uid: string;
  email: string;
}

export interface UserContributionData {
  foundationFirst: string;
  foundationSecond: string;
  foundationThird: string;
  foundationFourth: string;
  foundationFirstSeason: string;
  foundationSecondSeason: string;
  foundationThirdSeason: string;
  foundationFourthSeason: string;
  foundationOther: string;
  colorAdjuster: string;
  concealer: string;
  blush: string;
  bronzerContour: string;
  powder: string;
  lipstick: string;
  lipLiners: string;
  lipGloss: string;
}

export interface UserContribution extends UserContributionData {
  id: string;
  userId: string;
}
