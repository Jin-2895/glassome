/* eslint-disable @typescript-eslint/naming-convention */
import Link from "next/link";
import React, { FC } from "react";
import { formatCommaDelimiter, titleFormatter } from "../../../helpers";
import { FavoriteProduct, SearchedProduct } from "../../../models";
import { Heart, ImageWithError, Text } from "../../../ui";

interface DetailedProductCardProps {
  detailedProduct: SearchedProduct;
}

const DetailedProductCard: FC<DetailedProductCardProps> = ({
  detailedProduct,
}) => {
  const {
    category,
    brand,
    img_url,
    full_product,
    price,
    product_url,
    id,
    product,
    shade,
  } = detailedProduct;

  const favoriteProduct: FavoriteProduct = {
    category,
    img_url,
    link: product_url,
    price,
    brand,
    product,
    shade,
  };

  return (
    <div className="relative flex flex-col border h-full p-[40px] shadow-grid">
      <Heart
        id={id}
        product={favoriteProduct}
        className="top-[40px] right-[40px]"
      />
      <Link href={product_url || ""} target="_blank">
        <div className="relative w-full h-56">
          <ImageWithError
            src={img_url || ""}
            fill
            placeholder="blur"
            alt={full_product || ""}
            blurDataURL={`/_next/image?url=${img_url}&w=16&q=1`}
          />
        </div>
        <div className="flex flex-col">
          <Text textVariant="base-h" className="uppercase mt-6">
            {brand}
          </Text>

          <Text textVariant="base-p">{titleFormatter(full_product)}</Text>
          <Text textVariant="libre-sm" className="text-center">
            {formatCommaDelimiter(price)}
          </Text>
        </div>
      </Link>
    </div>
  );
};

export { DetailedProductCard };
