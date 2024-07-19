import React, { FC, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { event as GoogleAnalyticsEvent } from "nextjs-google-analytics";
import { Button, DropDown, CheckBox, Text } from "../../../ui";
import {
  convertArrayToString,
  formatProductCategory,
  ProductValidationSchemaSingle,
} from "../../../helpers";
import { useCheckBox, useReferences } from "../../../hooks";
import { GoogleAnalyticsEventNames, ReferenceItem } from "../../../models";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";

interface FormikInitialValues {
  category: string[];
  shade: string;
  brand: string;
  productName: string;
  foundation: string;
}

const formatShade = (shade: string) => {
  return shade === "no shade" ? "" : shade;
};

const checkIfCategoriesAreAvailable = (
  categories: ReferenceItem[],
  values: string[]
) => {
  return categories.filter((category) =>
    values.every((elem) => elem !== category.name)
  );
};

export const formatMultiSelectValues = (values: string[]) => {
  if (!values.length) {
    return "";
  }

  return values.join(", ");
};

const ProductFilters: FC = () => {
  const { push } = useRouter();
  const { user } = useAuth();

  const { values, setFieldValue, resetForm, errors, touched, handleSubmit } =
    useFormik<FormikInitialValues>({
      initialValues: {
        category: [],
        shade: "",
        brand: "",
        productName: "",
        foundation: "",
      },
      validationSchema: ProductValidationSchemaSingle,
      onSubmit: ({ category, foundation, brand, productName, shade }) => {
        push({
          pathname: "detailed",
          query: {
            lookingFor: convertArrayToString(category),
            toWearWith: formatProductCategory(foundation),
            fullProductName: `${brand} ${productName} ${formatShade(shade)}`,
          },
        });

        GoogleAnalyticsEvent(GoogleAnalyticsEventNames.FORM_COMPLETED);

        if (!user?.uid) {
          return;
        }

        GoogleAnalyticsEvent(GoogleAnalyticsEventNames.SEARCHED_PERFORMED, {
          label: `User ${user?.email} performed search`,
        });
      },
    });

  const { onCheckBoxChange, onMultiCheckBoxChange } =
    useCheckBox<FormikInitialValues>(setFieldValue);

  const {
    brands,
    categories,
    productNames,
    shades,
    loadings,
    onBrandSearch,
    onProductNamesSearch,
    onShadesSearch,
  } = useReferences({
    brand: values.brand,
    foundation: values.foundation,
    productName: values.productName,
    setFieldValue,
  });

  useEffect(() => {
    onBrandSearch(values.foundation);
  }, [values.foundation]);

  useEffect(() => {
    onProductNamesSearch(values.brand);
  }, [values.brand]);

  useEffect(() => {
    onShadesSearch(values.productName);
  }, [values.productName]);

  return (
    <div className="flex flex-col mt-12 sm:mt-20 justify-between w-full items-center">
      <div className="flex flex-col base:flex-row base:items-center">
        <Text
          as="p"
          className="mr-0 mb-3 base:mr-20"
          textVariant="selected-item"
        >
          I am looking for
        </Text>

        <DropDown
          title={formatMultiSelectValues(values.category) || "category"}
          selectedItemColor="text-black"
          wrapperClassName="min-w-[209px]"
          dropdownItems={categories.filter(
            (item) => item.name !== values.foundation
          )}
          renderItem={({ id, name }) => (
            <li key={id}>
              <CheckBox
                id={id}
                name={name}
                checked={values.category.includes(name)}
                onChange={(event) => {
                  onMultiCheckBoxChange(event, "category", values.category);
                  GoogleAnalyticsEvent(
                    GoogleAnalyticsEventNames.PRODUCT_SEARCHED,
                    {
                      label: convertArrayToString(values.category),
                    }
                  );
                }}
              />
            </li>
          )}
          isError={!!errors.category && touched.category}
          error={errors.category ? "Category is required" : ""}
        />
      </div>

      <div className="flex flex-col mt-12 base:flex-row base:items-center width-[1070px]">
        <Text
          as="p"
          className="mr-0 mb-3 mobile:mb-0 base:mr-16"
          textVariant="selected-item"
        >
          to wear with the following
        </Text>
        <DropDown
          title={values.foundation || "category"}
          selectedItemColor="text-black"
          wrapperClassName="min-w-[209px]"
          disabled={
            !checkIfCategoriesAreAvailable(categories, values.category).length
          }
          dropdownItems={categories}
          // dropdownItems={checkIfCategoriesAreAvailable(
          //   categories,
          //   values.category
          // )}
          renderItem={({ id, name }) => (
            <li key={id}>
              <CheckBox
                id={id}
                name={name}
                checked={values.foundation === name}
                onChange={(event) => {
                  onCheckBoxChange(event, "foundation");
                  GoogleAnalyticsEvent(
                    GoogleAnalyticsEventNames.PRODUCT_TO_PAIR,
                    {
                      label: values.foundation,
                    }
                  );
                }}
              />
            </li>
          )}
          isError={!!errors.foundation && touched.foundation}
          error={errors.foundation ? "category is required" : ""}
        />
      </div>
      <div className="flex flex-col space-y-7 base:flex-row base:space-y-0  items-center justify-evenly mt-16 w-full">
        <DropDown
          isLoading={loadings[0]}
          disabled={!brands.length}
          title={values.brand || "brand"}
          bottomLabel="Brand"
          selectedItemColor="text-grey"
          wrapperClassName="w-[259px]"
          dropdownItems={brands}
          renderItem={({ id, name }) => (
            <li key={id}>
              <CheckBox
                id={id}
                name={name}
                checked={values.brand === name}
                onChange={(event) => {
                  onCheckBoxChange(event, "brand");
                  GoogleAnalyticsEvent(
                    GoogleAnalyticsEventNames.TOP_BRAND_SEARCHED,
                    {
                      label: values.brand,
                    }
                  );
                }}
              />
            </li>
          )}
          isError={!!errors.brand && touched.brand}
          error={errors.brand ? "Brand is required" : ""}
        />
        <DropDown
          isLoading={loadings[1]}
          disabled={!productNames.length}
          title={values.productName || "product"}
          bottomLabel="Product"
          selectedItemColor="text-grey"
          wrapperClassName="w-[249px] sm:w-[549px]"
          dropdownItems={productNames}
          renderItem={({ id, name }) => (
            <li key={id}>
              <CheckBox
                id={id}
                name={name}
                checked={values.productName === name}
                onChange={(event) => onCheckBoxChange(event, "productName")}
              />
            </li>
          )}
          isError={!!errors.productName && touched.productName}
          error={errors.productName ? "Product is required" : ""}
        />
        <DropDown
          isLoading={loadings[2]}
          disabled={!shades.length}
          title={values.shade || "shade"}
          bottomLabel="Shade"
          selectedItemColor="text-grey"
          wrapperClassName="w-[209px]"
          dropdownItems={shades}
          renderItem={({ id, name }) => (
            <li key={id}>
              <CheckBox
                id={id}
                name={name}
                checked={values.shade === name}
                onChange={(event) => onCheckBoxChange(event, "shade")}
              />
            </li>
          )}
          isError={!!errors.shade && touched.shade}
          error={errors.shade ? "Shade is required" : ""}
        />
      </div>
      <div className="mt-10 sm:mt-16 sm:flex flex-row space-x-5">
        <Button isDarkBackground onClick={() => handleSubmit()}>
          <Text className="text-white uppercase font-bold">Submit</Text>
        </Button>
        <Button onClick={() => resetForm()}>
          <Text className="uppercase font-bold">Clear</Text>
        </Button>
      </div>
    </div>
  );
};

export { ProductFilters };
