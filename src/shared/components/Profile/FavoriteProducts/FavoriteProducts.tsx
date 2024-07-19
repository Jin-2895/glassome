import { FC } from "react";
import { useGetFavoriteProducts } from "../../../hooks/useGetFavoriteProducts/useGetFavoriteProducts";
import { Text } from "../../../ui";
import { FavoriteProductList } from "../FavoriteProductList/FavoriteProductList";

const FavoriteProducts: FC = () => {
  const { isLoading, favoriteProducts, refetch } = useGetFavoriteProducts(true);

  return (
    <div className="flex flex-col mt-20">
      <Text
        as="h3"
        textVariant="libre"
        className="uppercase flex flex-row justify-start"
      >
        favorites
      </Text>
      <FavoriteProductList
        favoriteProducts={favoriteProducts}
        isLoading={isLoading}
        emptyState={!isLoading && !favoriteProducts.length}
        refetch={refetch}
      />
    </div>
  );
};

export { FavoriteProducts };
