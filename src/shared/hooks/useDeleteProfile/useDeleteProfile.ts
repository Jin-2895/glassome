import { useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "../../context/AuthProvider/AuthProvider";
import { ToastService } from "../../services";
import { db } from "../../../pages/api/firebaseApi";

export const useDeleteProfile = () => {
  const { setUser, user } = useAuth();
  const [isLoading, setLoading] = useState(false);

  const userContributionCollection = collection(db, "users");

  const deleteProfile = async () => {
    setLoading(true);
    try {
      const auth = getAuth();

      if (auth.currentUser) {
        await auth.currentUser.delete();
        await deleteDoc(doc(userContributionCollection, user?.uid));
        setUser(null);
      }
    } catch {
      ToastService.onDanger("An error occurred, please try again");
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    deleteProfile,
  };
};
