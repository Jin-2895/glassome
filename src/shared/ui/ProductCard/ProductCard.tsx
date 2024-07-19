import React, { FC } from "react";
import Link from "next/link";
import { event } from "nextjs-google-analytics";
import { Text } from "../Text/Text";
import {
  FavoriteProduct,
  GoogleAnalyticsEventNames,
  PopularProduct,
} from "../../models";
import DefaultImage from "../../../assets/images/main-logo.png";
import { ImageWithError } from "../ImageWithError/ImageWithError";
import { Heart } from "../Heart/Heart";
import {
  formatCommaDelimiter,
  replaceUnderscoreWithSlash,
} from "../../helpers";

type PopularProductKeys =
  | "category"
  | "img_url"
  | "link"
  | "price"
  | "product"
  | "shade_description"
  | "id";
type ProductCardProps = Pick<PopularProduct, PopularProductKeys>;

const ProductCard: FC<ProductCardProps> = ({
  category,
  img_url,
  link,
  price,
  product,
  shade_description,
  id,
}) => {
  const favoriteProduct: FavoriteProduct = {
    category,
    img_url,
    link,
    price,
    product,
    shade: shade_description,
    brand: "Popular",
  };

  return (
    <div className="relative">
      <Heart id={id} product={favoriteProduct} className="right-0 top-0" />
      <Link
        href={link || ""}
        target="_blank"
        onClick={() => {
          if (!link) {
            return;
          }

          event(GoogleAnalyticsEventNames.CLICK_ON_POPULAR_PRODUCT, {
            label: product || "Product without name",
          });
        }}
      >
        <div className="max-width-[312px] flex flex-col items-center h-full cursor-pointer">
          <div className="relative w-1/3 sm:w-1/2 h-40">
            <ImageWithError
              src={img_url || DefaultImage.src}
              fill
              placeholder="blur"
              alt={product || ""}
              blurDataURL={`/_next/image?url=${img_url}&w=16&q=1`}
            />
          </div>
          <div className="flex flex-col items-center justify-center mt-9">
            <Text textVariant="base-p" className="text-burgundy uppercase">
              {replaceUnderscoreWithSlash(category || "")}
            </Text>
            <Text textVariant="lg-span" className="mt-3 min-h-full px-2">
              {product}
            </Text>
            <Text textVariant="lg-span" className="h-6 min-h-full mt-3">
              {formatCommaDelimiter(price)}
            </Text>
          </div>
          <Text textVariant="base-p" className="italic min-h-full mt-5">
            {shade_description}
          </Text>
        </div>
      </Link>
    </div>
  );
};

export { ProductCard };
