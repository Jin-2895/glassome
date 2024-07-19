import React, { FC } from "react";
import { useRouter } from "next/router";
import { event } from "nextjs-google-analytics";
import { Button, Container, Divider, Text } from "../../../ui";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";
import { GoogleAnalyticsEventNames } from "../../../models";

const BuildRecommendationEngine: FC = () => {
  const router = useRouter();

  const { user } = useAuth();

  const onLibraryClick = () => {
    router.push(process.env.LIBRARY_LINK || "");
    event(GoogleAnalyticsEventNames.LIBRARY_VIEWS);
  };

  return (
    <footer>
      <Container>
        <div className="flex flex-col items-center justify-center">
          <Text as="h3" textVariant="libre-xl" className="text-center">
            Let’s build a makeup recommendation engine
          </Text>
          <Text as="p" textVariant="libre-normal" className="mt-6 text-center">
            Share products that you love and wear. We’ll use it to find what
            complements our skin.
          </Text>
          <div className="block sm:flex flex-col items-center mt-7 flex-wrap justify-center">
            <Button
              buttonType="rounded"
              className="block mx-auto"
              onClick={() => router.push("/own-contribution")}
            >
              <Text textVariant="lg-span" className="sm:uppercase">
                Add your routine
              </Text>
            </Button>
            <Button
              buttonType="rounded"
              className="block mx-auto mt-3 sm:mt-10"
              onClick={() => onLibraryClick()}
            >
              <Text textVariant="lg-span" className="sm:uppercase">
                Peak into our library
              </Text>
            </Button>
            <Button
              buttonType="rounded"
              className="block mx-auto mt-3 sm:mt-9"
              onClick={() =>
                user?.uid
                  ? router.push("/profile/guide")
                  : router.push("/sign-in")
              }
            >
              <Text textVariant="lg-span" className="sm:uppercase">
                Download our guide to olive skin
              </Text>
            </Button>
          </div>
        </div>
      </Container>
      <Divider />
    </footer>
  );
};

export { BuildRecommendationEngine };
