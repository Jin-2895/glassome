import React, { FC } from "react";
import cn from "classnames";
import { FavoriteProduct as FavoriteProductType } from "../../../models";
import { Container, EmptyState, Loader, Text } from "../../../ui";
import { FavoriteProduct } from "../FavoriteProduct/FavoriteProduct";

interface FavoriteProductsListProps {
  isLoading: boolean;
  emptyState: boolean;
  favoriteProducts: FavoriteProductType[];
  refetch: () => Promise<void>;
}

const FavoriteProductList: FC<FavoriteProductsListProps> = ({
  favoriteProducts,
  isLoading,
  emptyState,
  refetch,
}) => {
  return (
    <div className="mt-20">
      {isLoading ? (
        <Container className="flex justify-center">
          <Loader size="md" isLoading color="black" />
        </Container>
      ) : (
        <div>
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-x-14 gap-y-9"
            )}
          >
            {favoriteProducts.map((favoriteProduct) => (
              <FavoriteProduct
                key={favoriteProduct.id}
                favoriteProduct={favoriteProduct}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
      )}

      {emptyState && (
        <EmptyState>
          <Text textVariant="libre-xl" className="text-center">
            No Products were found
          </Text>
        </EmptyState>
      )}
    </div>
  );
};

export { FavoriteProductList };
