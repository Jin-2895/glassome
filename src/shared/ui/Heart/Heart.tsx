import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import cn from "classnames";
import { match } from "ts-pattern";
import { useFavoriteProducts } from "../../hooks";
import { FavoriteProduct } from "../../models";
import { Loader } from "../Loader/Loader";

interface HeartProps {
  id: string;
  product: FavoriteProduct;
  className?: string;
  withRefetch?: boolean;
  refetch?: () => Promise<void>;
}

const Heart: FC<HeartProps> = ({
  id,
  product,
  className,
  withRefetch = false,
  refetch,
}) => {
  const { isLiked, isLoading, addToFavoriteProducts, deleteFavoriteProduct } =
    useFavoriteProducts(id);

  const onDeleteFavoriteProduct = async (id: string) => {
    if (withRefetch && refetch) {
      await deleteFavoriteProduct(id);
      await refetch();
      return;
    }

    await deleteFavoriteProduct(id);
  };

  const onAddToFavoriteProducts = async (
    id: string,
    product: FavoriteProduct
  ) => {
    if (withRefetch && refetch) {
      await addToFavoriteProducts(id, product);
      await refetch();
      return;
    }

    await addToFavoriteProducts(id, product);
  };

  return (
    <div className={cn("absolute z-40 cursor-pointer", className)}>
      {match({ isLoading, isLiked })
        .with({ isLoading: true }, () => (
          <Loader size="heart" isLoading={isLoading} color="black" />
        ))
        .with({ isLiked: true }, () => (
          <AiFillHeart
            size={30}
            color="black"
            onClick={() => onDeleteFavoriteProduct(id)}
          />
        ))
        .otherwise(() => (
          <AiOutlineHeart
            size={30}
            onClick={() => onAddToFavoriteProducts(id, product)}
          />
        ))}
    </div>
  );
};

export { Heart };
