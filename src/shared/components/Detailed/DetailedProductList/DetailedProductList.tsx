import React, { FC } from "react";
import cn from "classnames";
import { DetailedProductCard } from "../DetailedProductCard/DetailedProductCard";
import { SearchedProduct } from "../../../models";

interface DetailedProductListProps {
  detailedProducts: SearchedProduct[];
}

const DetailedProductList: FC<DetailedProductListProps> = ({
  detailedProducts,
}) => {
  return (
    <div className="mx-auto mt-7 sm:w-2/3 md:mt-0">
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 items-center gap-x-px gap-y-px"
        )}
      >
        {detailedProducts.map((detailedProduct) => (
          <DetailedProductCard
            key={detailedProduct.full_product}
            detailedProduct={detailedProduct}
          />
        ))}
      </div>
    </div>
  );
};

export { DetailedProductList };
