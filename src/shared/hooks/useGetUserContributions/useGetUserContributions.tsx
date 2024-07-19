import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../pages/api/firebaseApi";
import { useAuth } from "../../context/AuthProvider/AuthProvider";
import { UserContribution } from "../../models";
import { ToastService } from "../../services";

export const useGetUserContributions = () => {
  const { user } = useAuth();
  const [contributions, setContributions] = useState<UserContribution[]>([]);

  const [isLoading, setLoading] = useState(false);
  const userContributionCollection = collection(db, "users-contributions");

  const getUserContributions = async (userId: string) => {
    setLoading(true);
    try {
      const response = await getDocs(
        query(userContributionCollection, where("userId", "==", userId))
      );
      const contributions = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserContribution[];
      setContributions(contributions);
    } catch {
      ToastService.onDanger("An error occurred, please try again");
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (user?.uid) {
      getUserContributions(user.uid);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      getUserContributions(user?.uid);
    }
  }, [user?.uid]);

  return {
    isLoading,
    contributions,
    getUserContributions,
    refetch,
  };
};
