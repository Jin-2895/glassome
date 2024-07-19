import { useState } from "react";
import { useRouter } from "next/router";
import { UserContributionData } from "../../models";

export const useSendPersonalContribution = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const sendPersonalContribution = async (data: UserContributionData) => {
    setLoading(true);
    try {
      const contributionJson = JSON.stringify(data);
      await fetch("https://getform.io/f/d69a0b80-d060-4423-91f4-bca689fb6f08", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: contributionJson,
      });
      router.push("https://getform.io/thank-you");
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    sendPersonalContribution,
  };
};
