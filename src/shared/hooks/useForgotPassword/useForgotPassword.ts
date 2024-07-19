import { useRouter } from "next/router";
import { useState } from "react";
import { AuthError, sendPasswordResetEmail } from "firebase/auth";
import { ToastService } from "../../services";
import { auth } from "../../../pages/api/firebaseApi/firebaseApi";

const ForgotPasswordErrors: Record<string, string> = {
  "auth/user-not-found": "Email doesn't exist",
};

export const useForgotPassword = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (email: string) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);

      ToastService.onSuccess(
        "We already sent you an email with reset instruction"
      );

      router.push("/sign-in");
    } catch (error) {
      const firebaseError = error as AuthError;
      ToastService.onDanger(ForgotPasswordErrors[firebaseError.code]);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    onSubmit,
  };
};
