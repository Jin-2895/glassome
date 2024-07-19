import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { event } from "nextjs-google-analytics";
import { useEffect, useState } from "react";
import { db } from "../../../pages/api/firebaseApi";
import { useAuth } from "../../context/AuthProvider/AuthProvider";
import { FavoriteProduct, GoogleAnalyticsEventNames } from "../../models";
import { ToastService } from "../../services";
import { useGetFavoriteProducts } from "../useGetFavoriteProducts/useGetFavoriteProducts";

export const useFavoriteProducts = (productId: string) => {
  const { user } = useAuth();
  const { getFavoriteProducts } = useGetFavoriteProducts();

  const [isLiked, setLiked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState("");

  const favoriteProductsCollection = collection(db, "users-favorite-products");

  const getFavoriteProductById = async (productId: string) => {
    setLoading(true);
    try {
      const favoriteProducts = await getFavoriteProducts();

      if (favoriteProducts) {
        const isLiked = favoriteProducts.some(
          (favoriteProduct) => favoriteProduct.productId === productId
        );

        const favoriteProduct = favoriteProducts.find(
          (favoriteProduct) => favoriteProduct.productId === productId
        );

        setCurrentProductId(favoriteProduct?.id ?? "");
        setLiked(isLiked);
      }
    } catch {
      ToastService.onDanger("An error occurred, try again later");
    } finally {
      setLoading(false);
    }
  };

  const deleteFavoriteProduct = async (productId: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(favoriteProductsCollection, currentProductId));
      await getFavoriteProductById(productId);
    } catch {
      ToastService.onDanger("An error occurred, try again later");
    } finally {
      setLoading(false);
    }
  };

  const addToFavoriteProducts = async (
    productId: string,
    product: FavoriteProduct
  ) => {
    setLoading(true);
    try {
      if (!user?.uid) {
        ToastService.onWarning("Users with an account can save products");
        return;
      }

      await addDoc(favoriteProductsCollection, {
        ...product,
        productId,
        userId: user?.uid || "",
      });

      await getFavoriteProductById(productId);
      event(GoogleAnalyticsEventNames.POPULAR_PRODUCT_FAVORITE, {
        label: product.product || "Product without name",
      });
    } catch {
      ToastService.onDanger("An error occurred, try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId && user?.uid) {
      getFavoriteProductById(productId);
    }
  }, [productId, user?.uid]);

  return {
    isLoading,
    isLiked,
    addToFavoriteProducts,
    deleteFavoriteProduct,
  };
};
