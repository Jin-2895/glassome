import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../pages/api/firebaseApi";
import { useAuth } from "../../context/AuthProvider/AuthProvider";
import { FavoriteProduct } from "../../models";
import { ToastService } from "../../services";

export const useGetFavoriteProducts = (isForProfile: boolean = false) => {
  const { user } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState<FavoriteProduct[]>(
    []
  );
  const [isLoading, setLoading] = useState(false);

  const userFavoriteProductsCollection = collection(
    db,
    "users-favorite-products"
  );

  const getFavoriteProducts = async () => {
    setLoading(true);
    try {
      const response = await getDocs(
        query(userFavoriteProductsCollection, where("userId", "==", user?.uid))
      );
      const favoriteProducts = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FavoriteProduct[];
      setFavoriteProducts(favoriteProducts);
      return favoriteProducts;
    } catch (error) {
      ToastService.onDanger("An error occurred, try again later");
      return await Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    if (user?.uid) {
      await getFavoriteProducts();
    }
  };

  useEffect(() => {
    if (user?.uid && isForProfile) {
      getFavoriteProducts();
    }
  }, [user?.uid, isForProfile]);

  return {
    isLoading,
    favoriteProducts,
    getFavoriteProducts,
    refetch,
  };
};
