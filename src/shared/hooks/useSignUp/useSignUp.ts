import { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, db } from "../../../pages/api/firebaseApi";
import { ToastService } from "../../services";

const SignUpErrors: Record<string, string> = {
  "auth/email-already-in-use": "Email is already in use",
};

export const useSignUp = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user?.user.uid) {
        const userCollection = doc(collection(db, "users"), user?.user.uid);

        await setDoc(userCollection, {
          email,
        });
        router.push("/");
      }
    } catch (error) {
      const firebaseError = error as AuthError;
      ToastService.onDanger(SignUpErrors[firebaseError.code]);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    onSubmit,
  };
};
