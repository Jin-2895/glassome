import React, { FC } from "react";
import { ReferenceItem, SearchedProduct } from "../../../models";
import { Container } from "../../../ui";
import { DetailedProductList } from "../DetailedProductList/DetailedProductList";
import { FilterBy } from "../FilterBy/FilterBy";

interface MainContentProps {
  detailedProducts: SearchedProduct[];
  preferences: ReferenceItem[];
  spfs: ReferenceItem[];
  brands: ReferenceItem[];
}

const MainContent: FC<MainContentProps> = ({
  detailedProducts,
  brands,
  preferences,
  spfs,
}) => {
  return (
    <Container className="flex flex-col mt-10 md:flex-row sm:mt-20 sm:px-[87px] sm:py-0">
      <FilterBy brands={brands} preferences={preferences} spfs={spfs} />
      <DetailedProductList detailedProducts={detailedProducts} />
    </Container>
  );
};

export { MainContent };
