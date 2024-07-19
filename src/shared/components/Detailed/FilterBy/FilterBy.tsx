import { FC } from "react";
import { ReferenceItem } from "../../../models";
import { Text } from "../../../ui";
import { FilterContent } from "../FilterContent/FilterContent";

interface FilterByProps {
  preferences: ReferenceItem[];
  spfs: ReferenceItem[];
  brands: ReferenceItem[];
}

const FilterBy: FC<FilterByProps> = ({ brands, preferences, spfs }) => {
  return (
    <div className="flex flex-col items-center w-full md:w-[282px] lg:w-1/3 md:items-start">
      <Text as="h1" textVariant="libre-xl">
        Filter by
      </Text>
      <FilterContent brands={brands} preferences={preferences} spfs={spfs} />
    </div>
  );
};

export { FilterBy };
