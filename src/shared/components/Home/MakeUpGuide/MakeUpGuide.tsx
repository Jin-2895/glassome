import React, { FC } from "react";
import { Container, Divider, Text } from "../../../ui";
import { ProductFilters } from "../ProductFilters/ProductFilters";
import { Recommendations } from "../Recommendations/Recommendations";

const MakeUpGuide: FC = () => {
  return (
    <>
      <Container>
        <div className="flex items-center flex-col justify-center">
          <div className="flex flex-col items-center justify-between max-w-[816px]">
            <Text
              as="h3"
              textVariant="libre"
              className="text-center italic font-semibold"
            >
              Your makeup search engine
            </Text>
            <Text as="p" className="xl:max-w-xl mt-12 text-center text-lg">
              Find makeup recommendations (based on soft glam looks by experts)
              by entering a product that works for you.
            </Text>
            <Text
              as="p"
              className="mt-4 md:mt-1 text-center text-lg font-semibold"
            >
              Select brand first for product and shade to appear.
            </Text>
          </div>
          <ProductFilters />
          <Recommendations />
        </div>
      </Container>
      <Divider />
    </>
  );
};

export { MakeUpGuide };
