import { useFormikContext } from "formik";
import { useRouter } from "next/router";
import qs from "querystring";
import React, { ChangeEvent, FC, useState } from "react";
import { Range as RangeType } from "react-input-range";
import { ReferenceItem } from "../../../models";
import { Accordion, Button, CheckBox, Range, Search, Text } from "../../../ui";
import { FormikFiltersValues } from "../models";

interface FilterContentProps {
  preferences: ReferenceItem[];
  spfs: ReferenceItem[];
  brands: ReferenceItem[];
}

const FilterContent: FC<FilterContentProps> = ({
  preferences,
  spfs,
  brands,
}) => {
  const { query, replace } = useRouter();
  const { values, setFieldValue } = useFormikContext<FormikFiltersValues>();
  const [searchValue, setSearchedValue] = useState("");

  const clearFilterValues = () => {
    const queryParams = qs.stringify({
      fullProductName: query.fullProductName,
      lookingFor: query.lookingFor,
      order: query.order,
      toWearWith: query.toWearWith,
    });

    replace(`/full-details?${queryParams}`);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchedValue(value);
  };

  const onCheckBoxChange = (
    event: ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { name, checked } = event.target;
    if (checked) {
      setFieldValue(fieldName, name);
    } else {
      setFieldValue(fieldName, "");
    }
  };

  const onRangeChange = (value: number | RangeType) => {
    setFieldValue("priceRange", value);
  };

  return (
    <div>
      <Accordion title="PREFERENCES">
        <ul className="mb-3">
          {preferences.map(({ id, name }) => (
            <li key={id}>
              <CheckBox
                id={id}
                name={name}
                checked={values.preference === name}
                onChange={(event) => onCheckBoxChange(event, "preference")}
              />
            </li>
          ))}
        </ul>
      </Accordion>
      <Accordion title="SPF">
        <ul className="mb-3">
          {spfs.map(({ id, name }) => (
            <li key={id}>
              <CheckBox
                id={id}
                name={name}
                checked={values.spf === name}
                onChange={(event) => onCheckBoxChange(event, "spf")}
              />
            </li>
          ))}
        </ul>
      </Accordion>
      <Accordion title="BRAND">
        <Search
          searchItems={brands}
          value={searchValue}
          onChange={onChange}
          renderItem={({ id, name }) => (
            <li key={id}>
              <CheckBox
                id={id}
                name={name}
                checked={values.brand === name}
                onChange={(event) => onCheckBoxChange(event, "brand")}
              />
            </li>
          )}
        />
      </Accordion>
      <Accordion title="PRICE RANGE">
        <Range
          customClassName="mb-10"
          onChange={(value) => onRangeChange(value)}
          value={values.priceRange}
          allowSameValues
          draggableTrack={false}
        />
      </Accordion>
      <div className="flex flex-col sm:flex-row items-center justify-start mt-9">
        <Button isDarkBackground type="submit">
          <Text className="text-white uppercase font-bold">apply</Text>
        </Button>
        <Button className="mt-2 sm:ml-6 sm:mt-0">
          <Text
            className="uppercase font-bold"
            onClick={() => clearFilterValues()}
          >
            clear
          </Text>
        </Button>
      </div>
    </div>
  );
};

export { FilterContent };
