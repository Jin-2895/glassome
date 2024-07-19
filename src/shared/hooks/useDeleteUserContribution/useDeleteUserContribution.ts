import { collection, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../pages/api/firebaseApi";
import { ToastService } from "../../services";

export const useDeleteUserContribution = () => {
  const [isLoading, setLoading] = useState(false);

  const userContributionCollection = collection(db, "users-contributions");

  const deleteUserContribution = async (contributionId: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(userContributionCollection, contributionId));
    } catch {
      ToastService.onDanger("An error occurred, please try again");
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    deleteUserContribution,
  };
};
