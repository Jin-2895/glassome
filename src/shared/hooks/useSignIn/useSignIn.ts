import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, AuthError } from "firebase/auth";
import { auth, db } from "../../../pages/api/firebaseApi";
import { ToastService } from "../../services";

const SignInErrors: Record<string, string> = {
  "auth/wrong-password": "Wrong password",
  "auth/user-not-found": "Wrong password or email",
  "auth/too-many-requests": "Too many requests",
};

export const useSignIn = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user?.user.uid) {
        await getDoc(doc(db, "users", user?.user.uid));
        router.push("/");
      }
    } catch (error) {
      const firebaseError = error as AuthError;
      ToastService.onDanger(SignInErrors[firebaseError.code]);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    onSubmit,
  };
};
