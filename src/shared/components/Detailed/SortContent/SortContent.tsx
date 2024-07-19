import { useFormikContext } from "formik";
import React, { ChangeEvent, FC } from "react";
import { ReferenceItem } from "../../../models";
import { Accordion, CheckBox } from "../../../ui";
import { FormikFiltersValues } from "../models";

interface SortContentProps {
  alphabetItems: ReferenceItem[];
  priceItems: ReferenceItem[];
}

const SortContent: FC<SortContentProps> = ({ alphabetItems, priceItems }) => {
  const { values, setFieldValue } = useFormikContext<FormikFiltersValues>();

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

  return (
    <div>
      <Accordion title="A-Z">
        <ul className="mb-3">
          {alphabetItems.map(({ id, name }) => (
            <li key={id}>
              <CheckBox
                id={id}
                name={name}
                checked={values.order === name}
                onChange={(event) => {
                  onCheckBoxChange(event, "order");
                }}
              />
            </li>
          ))}
        </ul>
      </Accordion>
      <Accordion title="Price">
        <ul className="mb-3">
          {priceItems.map(({ id, name }) => (
            <li key={id}>
              <CheckBox
                id={id}
                name={name}
                checked={values.order === name}
                onChange={(event) => {
                  onCheckBoxChange(event, "order");
                }}
              />
            </li>
          ))}
        </ul>
      </Accordion>
    </div>
  );
};

export { SortContent };
