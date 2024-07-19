import React, { FC, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { event as GoogleAnalyticsEvent } from "nextjs-google-analytics";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import {
  Button,
  CheckBox,
  Container,
  Divider,
  DropDown,
  EmptyState,
  Loader,
  Slider,
  Text,
} from "../../../ui";
import {
  useGetPopularProducts,
  useCheckBox,
  useOutsideClick,
  usePopularProductsReferences,
} from "../../../hooks";
import { adaptReferencesVisibility } from "../adapters";
import { ProductCard } from "../../../ui/ProductCard/ProductCard";
import { GoogleAnalyticsEventNames } from "../../../models";

interface FormikInitialValues {
  preference: string;
  skintone: string;
  undertone: string;
}

const PopularProducts: FC = () => {
  const { preferences, skintones, undertones } = usePopularProductsReferences();
  const [references, setReferences] = useState([false, false, false]);

  const { values, setFieldValue } = useFormik<FormikInitialValues>({
    initialValues: {
      skintone: "",
      undertone: "",
      preference: "",
    },
    onSubmit: () => {},
  });

  const {
    isLoading,
    popularProducts,
    onPreferenceChange,
    onSkintoneChange,
    onUndertoneChange,
  } = useGetPopularProducts();

  const arePopularProductsEmpty = !isLoading && !popularProducts.length;

  const { onCheckBoxChange } = useCheckBox<FormikInitialValues>(setFieldValue);

  useEffect(() => {
    onPreferenceChange(values.preference);
  }, [values.preference]);

  useEffect(() => {
    onSkintoneChange(values.skintone);
  }, [values.skintone]);

  useEffect(() => {
    onUndertoneChange(values.undertone);
  }, [values.undertone]);

  const toggleReferences = (index: number) => {
    setReferences((prev) =>
      adaptReferencesVisibility(index, prev, !prev[index])
    );
  };

  const closeReference = (index: number) => {
    setReferences((prev) => adaptReferencesVisibility(index, prev, false));
  };

  const underToneWrapperRef = useRef<HTMLDivElement>(null);
  const skintoneWrapperRef = useRef<HTMLDivElement>(null);
  const preferenceWrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(skintoneWrapperRef, () => closeReference(0), references[0]);
  useOutsideClick(underToneWrapperRef, () => closeReference(1), references[1]);
  useOutsideClick(preferenceWrapperRef, () => closeReference(2), references[2]);

  return (
    <>
      <Container className="max-w-5xl">
        <div className="flex flex-col relative">
          <div className="flex flex-col items-center justify-between base:flex-row flex-wrap">
            <div className="flex flex-col base:flex-row items-center flex-wrap">
              <Text as="h3" textVariant="libre-xl">
                Popular products for
              </Text>
              <div
                ref={skintoneWrapperRef}
                className="w-full text-center base:w-auto relative mx-2"
              >
                <Button
                  buttonType="link"
                  className="mx-auto flex items-center h-12 py-2.5 relative"
                  onClick={() => toggleReferences(0)}
                >
                  <Text textVariant="purple-link">
                    {values.skintone || "medium to tan"}
                  </Text>
                  {references[0] ? (
                    <AiFillCaretUp className="w-3 h-3 sm:w-5 sm:h-5" />
                  ) : (
                    <AiFillCaretDown className="w-3 h-3 sm:w-5 sm:h-5" />
                  )}
                </Button>
                <DropDown
                  dropdownItems={skintones}
                  renderItem={({ id, name }) => (
                    <li key={id}>
                      <CheckBox
                        id={id}
                        name={name}
                        checked={values.skintone === name}
                        onChange={(event) => {
                          onCheckBoxChange(event, "skintone");
                          GoogleAnalyticsEvent(
                            GoogleAnalyticsEventNames.POPULAR_PRODUCT_SKIN_TONES,
                            {
                              label: values.skintone,
                            }
                          );
                        }}
                        checkBoxTextType="small-checkbox"
                      />
                    </li>
                  )}
                  dropDownType="trigger-by-button"
                  isShownFromOutside={references[0]}
                  listClassName="absolute w-full base:w-[200px] top-12"
                />
              </div>
              <Text textVariant="3xl-h" className="mx-1">
                +
              </Text>
              <div
                ref={underToneWrapperRef}
                className="w-full text-center base:w-auto relative mx-2"
              >
                <Button
                  buttonType="link"
                  className="mx-auto flex items-center h-12 py-2.5 relative"
                  onClick={() => toggleReferences(1)}
                >
                  <Text textVariant="purple-link">
                    {values.undertone || "olive"}
                  </Text>
                  {references[1] ? (
                    <AiFillCaretUp className="w-3 h-3 sm:w-5 sm:h-5" />
                  ) : (
                    <AiFillCaretDown className="w-3 h-3 sm:w-5 sm:h-5" />
                  )}
                </Button>
                <DropDown
                  dropdownItems={undertones}
                  renderItem={({ id, name }) => (
                    <li key={id}>
                      <CheckBox
                        id={id}
                        name={name}
                        checked={values.undertone === name}
                        onChange={(event) => {
                          onCheckBoxChange(event, "undertone");
                          GoogleAnalyticsEvent(
                            GoogleAnalyticsEventNames.POPULAR_PRODUCT_UNDERTONE,
                            {
                              label: values.undertone,
                            }
                          );
                        }}
                        checkBoxTextType="small-checkbox"
                      />
                    </li>
                  )}
                  dropDownType="trigger-by-button"
                  isShownFromOutside={references[1]}
                  listClassName="absolute w-full base:w-[170px] top-12"
                />
              </div>
              <Text textVariant="libre-xl" className="ml-1">
                skintones
              </Text>
            </div>
            <div ref={preferenceWrapperRef} className="w-[131px] relative">
              <Button
                className="mt-2"
                buttonType="filter"
                onClick={() => toggleReferences(2)}
              >
                <Text textVariant="filter">
                  {values.preference || "FILTER"}
                </Text>
              </Button>
              <DropDown
                dropdownItems={preferences}
                renderItem={({ id, name }) => (
                  <li key={id}>
                    <CheckBox
                      id={id}
                      name={name}
                      checked={values.preference === name}
                      onChange={(event) =>
                        onCheckBoxChange(event, "preference")
                      }
                      checkBoxTextType="small-checkbox"
                    />
                  </li>
                )}
                isShownFromOutside={references[2]}
                dropDownType="trigger-by-button"
                listClassName="absolute top-[70px] w-[150px] base:w-[175px]"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center base:justify-start">
            <Text
              as="p"
              textVariant="libre-normal"
              className="mt-7 text-center"
            >
              Based on how often it’s featured in makeup recommendations by
              experts and users like you. To find your tone, look up the
              description of 1-2 foundation shades that match you
            </Text>
          </div>
          {isLoading ? (
            <Container className="flex justify-center">
              <Loader size="md" isLoading color="black" />
            </Container>
          ) : (
            <Slider
              sliderItems={popularProducts}
              renderItem={({
                category,
                product,
                img_url,
                link,
                shade_description,
                price,
                id,
              }) => (
                <ProductCard
                  id={id}
                  category={category}
                  product={product}
                  img_url={img_url}
                  link={link}
                  shade_description={shade_description}
                  price={price}
                />
              )}
              EmptyStateComponent={
                arePopularProductsEmpty && (
                  <EmptyState>
                    <Text textVariant="libre-xl" className="text-center">
                      No Products were found
                    </Text>
                  </EmptyState>
                )
              }
            />
          )}
        </div>
      </Container>
      <Divider />
    </>
  );
};

export { PopularProducts };
