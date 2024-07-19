import Link from "next/link";
import React, { FC } from "react";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";
import { Text } from "../../../ui";

const guideLabel = "Explore our guide: makeup for olive skintones";

const GuideBanner: FC = () => {
  const { user } = useAuth();

  const guideLink = user?.uid ? "profile/guide" : "sign-in";

  return (
    <div className="flex flex-row items-center justify-center py-2 sm:py-3">
      <Link href={guideLink}>
        <Text as="span" textVariant="guide-banner">
          {guideLabel}
        </Text>
      </Link>
    </div>
  );
};

export { GuideBanner };
