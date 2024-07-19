import React, { FC, useRef, useState } from "react";
import { useRouter } from "next/router";
import qs from "querystring";
import { BsArrowDownUp } from "react-icons/bs";
import { Button, ComplexFilter, Container, Text } from "../../../ui";
import { ReferenceItem } from "../../../models";
import { SortContent } from "../SortContent/SortContent";
import { useOutsideClick } from "../../../hooks";

interface SortFilterProps {
  category: string;
  alphabetItems: ReferenceItem[];
  priceItems: ReferenceItem[];
}

const SortFilter: FC<SortFilterProps> = ({
  category,
  alphabetItems,
  priceItems,
}) => {
  const { query, replace } = useRouter();
  const [isSortVisible, setSortVisible] = useState(false);
  const sortWrapperRef = useRef<HTMLDivElement>(null);

  const toggleSort = () => {
    setSortVisible((prev) => !prev);
  };

  useOutsideClick(sortWrapperRef, () => setSortVisible(false), isSortVisible);

  const clearSortValues = () => {
    const queryParams = qs.stringify({
      fullProductName: query.fullProductName,
      lookingFor: query.lookingFor,
      preference: query.preference,
      spf: query.spf,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      brand: query.brand,
      toWearWith: query.toWearWith,
    });

    replace(`/full-details?${queryParams}`);
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    setTimeout(() => {
      setSortVisible(false);
    }, 100);
  };

  const clearSort = () => {
    setSortVisible(false);
    clearSortValues();
  };

  return (
    <Container className="py-0 px-0 sm:px-[87px] sm:py-0">
      <div className="flex flex-col sm:mx-0 md:flex-row items-center justify-between">
        <div className="flex flex-col items-center w-full justify-between md:flex-row">
          <Text as="h3" textVariant="libre-xl">
            {category}
          </Text>

          <div ref={sortWrapperRef} className="mt-4 md:relative md:mt-0">
            <Button
              buttonType="sort"
              rightIcon={<BsArrowDownUp size={15} className="ml-4" />}
              onClick={() => toggleSort()}
            >
              <Text className="uppercase" textVariant="libre-sm">
                sort
              </Text>
            </Button>
            {isSortVisible && (
              <ComplexFilter
                headingTitle="Sort by"
                onClose={() => toggleSort()}
                wrapperClassName="mt-9 absolute left-0 right-0 z-[999] md:left-auto"
                leftButton={
                  <Button isDarkBackground type="submit" onClick={onClick}>
                    <Text className="text-white uppercase font-bold">
                      apply
                    </Text>
                  </Button>
                }
                rightButton={
                  <div>
                    <Button className="mt-2 sm:ml-6 sm:mt-0">
                      <Text
                        className="uppercase font-bold"
                        onClick={() => clearSort()}
                      >
                        clear
                      </Text>
                    </Button>
                  </div>
                }
              >
                <SortContent
                  alphabetItems={alphabetItems}
                  priceItems={priceItems}
                />
              </ComplexFilter>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export { SortFilter };
