import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../pages/api/firebaseApi";

export const useLogout = () => {
  const [isLoading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    onLogout,
  };
};
