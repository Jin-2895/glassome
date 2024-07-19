import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { db } from "../../../pages/api/firebaseApi";
import { UserContributionData } from "../../models";
import { ToastService } from "../../services";

export const useCreateUserContribution = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const userContributionCollection = collection(db, "users-contributions");

  const createUserContribution = async (
    userId: string,
    data: UserContributionData
  ) => {
    setLoading(true);
    try {
      await addDoc(userContributionCollection, {
        ...data,
        userId,
      });

      router.push("profile");
    } catch {
      ToastService.onDanger("An error occurred, try again later");
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    createUserContribution,
  };
};
