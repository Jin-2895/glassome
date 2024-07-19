import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import { event } from "nextjs-google-analytics";
import { db } from "../../../pages/api/firebaseApi";
import { useAuth } from "../../context/AuthProvider/AuthProvider";
import { ToastService } from "../../services";
import { GoogleAnalyticsEventNames } from "../../models";

export const usePdfDownload = () => {
  const [isLoading, setLoading] = useState(false);
  const { user } = useAuth();

  const router = useRouter();

  const onPdfDownload = async (email: string) => {
    setLoading(true);
    try {
      const userPdfCollections = doc(
        collection(db, "users-emails-pdf-download"),
        user?.uid
      );

      await setDoc(userPdfCollections, {
        email,
      });

      router.push(process.env.FIREBASE_PDF || "");
      event(GoogleAnalyticsEventNames.OLIVE_GUIDE_DOWNLOADED);
    } catch {
      ToastService.onDanger("Failed to download guide-pfd");
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    onPdfDownload,
  };
};
