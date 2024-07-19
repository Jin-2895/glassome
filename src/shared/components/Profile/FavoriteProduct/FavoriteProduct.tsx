import Link from "next/link";
import React, { FC } from "react";
import {
  formatCommaDelimiter,
  replaceUnderscoreWithSlash,
} from "../../../helpers";
import { FavoriteProduct as FavoriteProductType } from "../../../models";
import { Heart, ImageWithError, Text } from "../../../ui";

interface FavoriteProductProps {
  favoriteProduct: FavoriteProductType;
  refetch: () => Promise<void>;
}

const FavoriteProduct: FC<FavoriteProductProps> = ({
  favoriteProduct,
  refetch,
}) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { img_url, link, price, productId, category, brand, shade, product } =
    favoriteProduct;

  const likedProduct = {
    category,
    img_url,
    link,
    price,
    product,
    brand,
    shade,
  };

  return (
    <div className="relative flex flex-col border-2 border-gray-border h-full p-[34px] px-9">
      <Heart
        id={productId || ""}
        product={likedProduct}
        refetch={refetch}
        className="top-[40px] right-[40px]"
        withRefetch
      />
      <Link href={link || ""} target="_blank">
        <div className="relative w-full h-40">
          <ImageWithError
            src={img_url || ""}
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
          <Text
            textVariant="favorite-brand"
            className="mt-3 uppercase text-center px-2"
          >
            {brand}
          </Text>
          <Text
            textVariant="favorite-product"
            className="mt-3 text-center px-2"
          >
            {product}
          </Text>
          <Text
            textVariant="favorite-shade"
            className="mt-3 text-center underline px-2"
          >
            {shade}
          </Text>
          <Text textVariant="libre-sm" className="h-6 min-h-full mt-7">
            {formatCommaDelimiter(price)}
          </Text>
        </div>
      </Link>
    </div>
  );
};

export { FavoriteProduct };
