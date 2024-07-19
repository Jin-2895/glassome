import { FormikErrors } from "formik";
import { ChangeEvent } from "react";

type FormikSetFieldType<T = unknown> = (
  field: string,
  value: any,
  shouldValidate?: boolean | undefined
) => Promise<void> | Promise<FormikErrors<T>>;

export const useCheckBox = <T>(setFieldValue: FormikSetFieldType<T>) => {
  const setCheckedValue = (
    filterName: string,
    values: string[],
    selectedName: string
  ) => {
    setFieldValue(`${filterName}`, [...values, selectedName]);
  };

  const removeCheckedValue = (
    filterName: string,
    values: string[],
    selectedName: string
  ) => {
    setFieldValue(
      `${filterName}`,
      values.filter((value) => value !== selectedName)
    );
  };

  const onMultiCheckBoxChange = (
    event: ChangeEvent<HTMLInputElement>,
    filterName: string,
    values: string[]
  ) => {
    const { name, checked } = event.target;

    if (checked) {
      setCheckedValue(filterName, values, name);
    } else {
      removeCheckedValue(filterName, values, name);
    }
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

  return {
    onCheckBoxChange,
    onMultiCheckBoxChange,
  };
};
