import Link from "next/link";
import React, { FC } from "react";
import { match, P } from "ts-pattern";
import { Container, EmptyState, Loader, Slider, Text } from "../../../ui";
import { Tutorial } from "../models";
import { TutorialCard } from "../TutorialCard/TutorialCard";
import { TutorialHeading } from "../TutorialHeading/TutorialHeading";

interface TutorialsProps {
  tutorials: Tutorial[];
  isLoading: boolean;
  category: string;
  toWearWith: string;
  fullProductName: string;
}

const sliderSettings = {
  320: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  640: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  768: {
    slidesPerView: 1,
  },
  900: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  1448: {
    // When there is only one result, slidersPerView > 1 results
    // in a bug displaying only a narrow width of the TuturialCard
    slidesPerView: 1,
    spaceBetween: 20,
  },
};

const Tutorials: FC<TutorialsProps> = ({
  tutorials,
  isLoading,
  category,
  fullProductName,
  toWearWith,
}) => {
  return (
    <Container className="pb-[30px] sm:pb-[135px]">
      <TutorialHeading />

      {match({ isLoading, tutorials })
        .with({ isLoading: true }, () => (
          <Container className="flex justify-center">
            <Loader size="md" isLoading color="black" />
          </Container>
        ))
        .with({ tutorials: P.array({ link: P.string }) }, () => (
          <Slider
            sliderItems={tutorials}
            renderItem={(item) => <TutorialCard tutorial={item} />}
            breakpoints={sliderSettings}
            leftArrowStyles="bottom-[-20px]"
            rightArrowStyles="bottom-[-20px]"
          />
        ))
        .otherwise(() => (
          <EmptyState>
            <Text textVariant="libre-xl" className="text-center">
              No Products were found
            </Text>
          </EmptyState>
        ))}

      {tutorials.length >= 3 && (
        <div className="mt-[40px] flex flex-row justify-end">
          <Link
            className="font-dmSans font-medium text-third-grey underline"
            href={`/tutorials-detailed?lookingFor=${category}&toWearWith=${toWearWith}&${fullProductName}`}
          >
            VIEW ALL
          </Link>
        </div>
      )}
    </Container>
  );
};

export { Tutorials };
