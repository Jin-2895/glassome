import React, { FC, useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";
import { adaptStringArray, FeedbackValidationSchema } from "../../../helpers";
import {
  useCreateUserContribution,
  useSendPersonalContribution,
} from "../../../hooks";
import { Button, Container, Input, Loader, Text, TextArea } from "../../../ui";
import { Picker } from "../Picker/Picker";
import { textAreaPlaceholder, inputPlaceholder } from "./constants";

interface FormikInitialValues {
  foundationFirst: string;
  foundationSecond: string;
  foundationThird: string;
  foundationFourth: string;
  foundationFirstSeason: string;
  foundationSecondSeason: string;
  foundationThirdSeason: string;
  foundationFourthSeason: string;
  foundationOther: string;
  colorAdjuster: string;
  concealer: string;
  blush: string;
  bronzerContour: string;
  powder: string;
  lipstick: string;
  lipLiners: string;
  lipGloss: string;
}

const OwnRoutine: FC = () => {
  const { user } = useAuth();
  const { isLoading: loadingUnAuthorized, sendPersonalContribution } =
    useSendPersonalContribution();
  const { isLoading: loadingAuthorized, createUserContribution } =
    useCreateUserContribution();
  const [seasons, setSeasons] = useState([
    "Summer",
    "Summer",
    "Summer",
    "Summer",
  ]);

  const isLoading = loadingUnAuthorized || loadingAuthorized;

  const onSeasonChange = (index: number, value: string) => {
    setSeasons((prev) => adaptStringArray(index, prev, value));
  };

  const {
    handleSubmit,
    errors,
    values,
    handleBlur,
    handleChange,
    touched,
    setFieldValue,
  } = useFormik<FormikInitialValues>({
    initialValues: {
      foundationFirst: "",
      foundationSecond: "",
      foundationThird: "",
      foundationFourth: "",
      foundationFirstSeason: seasons[0],
      foundationSecondSeason: seasons[1],
      foundationThirdSeason: seasons[2],
      foundationFourthSeason: seasons[3],
      foundationOther: "",
      colorAdjuster: "",
      blush: "",
      bronzerContour: "",
      concealer: "",
      lipGloss: "",
      lipLiners: "",
      lipstick: "",
      powder: "",
    },
    validationSchema: FeedbackValidationSchema,
    onSubmit: (values) => {
      if (user?.uid) {
        createUserContribution(user.uid, values);
        return;
      }

      sendPersonalContribution(values);
    },
  });

  return (
    <Container>
      {isLoading ? (
        <Container className="flex justify-center items-center h-screen">
          <Loader size="md" isLoading color="black" />
        </Container>
      ) : (
        <div className="flex flex-col items-center justify-center mt-6">
          <Text as="h1" textVariant="contribution-h">
            Share your routine
          </Text>

          <div className="max-w-[950px] text-center mt-5">
            <Text as="p" textVariant="contribution-description">
              Share the product(s) you wear and love.
            </Text>
            <Text as="p" textVariant="contribution-description">
              We’ll use it to put your feedback in context (i.e. a blush you
              love is a blush that would work for your foundation shade(s).
            </Text>
            <Text as="p" textVariant="contribution-description">
              Here is an example:{" "}
              <Link
                href="https://preview.redd.it/mslqpcrjjox71.png?width=1080&format=png&auto=webp&s=b52d2efade88c5b14e5ae03cd667ced94ee52bd9"
                className="underline"
                target="_blank"
              >
                link
              </Link>
              .
            </Text>
          </div>

          <Text
            as="h2"
            textVariant="contribution-base-h"
            className="uppercase mt-11"
          >
            foundation
          </Text>

          <div className="flex flex-col mt-10 w-[270px] sm:w-[500px]">
            <Input
              inputType="feedback"
              leftLabel="Foundation 1"
              rightLabel="Required"
              value={values.foundationFirst}
              placeholder={inputPlaceholder}
              onBlur={handleBlur("foundationFirst")}
              onChange={handleChange("foundationFirst")}
              isError={!!errors.foundationFirst && !!touched.foundationFirst}
              error={errors.foundationFirst ? errors.foundationFirst : ""}
              withLabelBottomOffset
              withBottomOffset
            />

            <Picker
              activeIndex={seasons[0]}
              onChange={(value) => {
                onSeasonChange(0, value);
                setFieldValue("foundationFirstSeason", value);
              }}
              leftLabel="Foundation 1: Season"
              withBottomOffset
            />

            <Input
              inputType="feedback"
              leftLabel="Foundation 2"
              value={values.foundationSecond}
              placeholder={inputPlaceholder}
              onBlur={handleBlur("foundationSecond")}
              onChange={handleChange("foundationSecond")}
              withLabelBottomOffset
              withBottomOffset
            />

            <Picker
              activeIndex={seasons[1]}
              onChange={(value) => {
                onSeasonChange(1, value);
                setFieldValue("foundationSecondSeason", value);
              }}
              leftLabel="Foundation 2: Season"
              withBottomOffset
            />

            <Input
              inputType="feedback"
              leftLabel="Foundation 3"
              value={values.foundationThird}
              placeholder={inputPlaceholder}
              onBlur={handleBlur("foundationThird")}
              onChange={handleChange("foundationThird")}
              withLabelBottomOffset
              withBottomOffset
            />

            <Picker
              activeIndex={seasons[2]}
              onChange={(value) => {
                onSeasonChange(2, value);
                setFieldValue("foundationThirdSeason", value);
              }}
              leftLabel="Foundation 3: Season"
              withBottomOffset
            />

            <Input
              inputType="feedback"
              leftLabel="Foundation 4"
              value={values.foundationFourth}
              placeholder={inputPlaceholder}
              onBlur={handleBlur("foundationFourth")}
              onChange={handleChange("foundationFourth")}
              withLabelBottomOffset
              withBottomOffset
            />

            <Picker
              activeIndex={seasons[3]}
              onChange={(value) => {
                onSeasonChange(3, value);
                setFieldValue("foundationFourthSeason", value);
              }}
              leftLabel="Foundation 4: Season"
              withBottomOffset
            />

            <TextArea
              className="resize-none mt-3"
              placeholder={textAreaPlaceholder}
              value={values.foundationOther}
              onBlur={handleBlur("foundationOther")}
              onChange={handleChange("foundationOther")}
              leftLabel="Foundation (Other)"
              withBottomOffset
            />

            <TextArea
              className="resize-none mt-3"
              placeholder={textAreaPlaceholder}
              value={values.colorAdjuster}
              onBlur={handleBlur("colorAdjuster")}
              onChange={handleChange("colorAdjuster")}
              leftLabel="Color adjuster"
            />

            <div className="flex flex-col mt-9">
              <Text
                as="h3"
                textVariant="contribution-base-h"
                className="uppercase"
              >
                Other (optional)
              </Text>
              <div className="flex flex-col mt-3">
                <TextArea
                  className="resize-none mt-3"
                  placeholder={textAreaPlaceholder}
                  value={values.concealer}
                  onBlur={handleBlur("concealer")}
                  onChange={handleChange("concealer")}
                  leftLabel="Concealer"
                  withBottomOffset
                />

                <TextArea
                  className="resize-none mt-3"
                  placeholder={textAreaPlaceholder}
                  value={values.blush}
                  onBlur={handleBlur("blush")}
                  onChange={handleChange("blush")}
                  leftLabel="Blush"
                  withBottomOffset
                />

                <TextArea
                  className="resize-none mt-3"
                  placeholder={textAreaPlaceholder}
                  value={values.bronzerContour}
                  onBlur={handleBlur("bronzerContour")}
                  onChange={handleChange("bronzerContour")}
                  leftLabel="Bronzer / Contour"
                  withBottomOffset
                />

                <TextArea
                  className="resize-none mt-3"
                  placeholder={textAreaPlaceholder}
                  value={values.powder}
                  onBlur={handleBlur("powder")}
                  onChange={handleChange("powder")}
                  leftLabel="Powder"
                  withBottomOffset
                />

                <TextArea
                  className="resize-none mt-3"
                  placeholder={textAreaPlaceholder}
                  value={values.lipstick}
                  onBlur={handleBlur("lipstick")}
                  onChange={handleChange("lipstick")}
                  leftLabel="Lipstick"
                  withBottomOffset
                />

                <TextArea
                  className="resize-none mt-3"
                  placeholder={textAreaPlaceholder}
                  value={values.lipLiners}
                  onBlur={handleBlur("lipLiners")}
                  onChange={handleChange("lipLiners")}
                  leftLabel="Lipliners"
                  withBottomOffset
                />

                <TextArea
                  className="resize-none mt-3"
                  placeholder={textAreaPlaceholder}
                  value={values.lipGloss}
                  onBlur={handleBlur("lipGloss")}
                  onChange={handleChange("lipGloss")}
                  leftLabel="Lipgloss"
                  withBottomOffset
                />
              </div>

              <div className="flex flex-row justify-center mt-9">
                <Button isDarkBackground onClick={() => handleSubmit()}>
                  <Text className="text-white uppercase font-bold">Submit</Text>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export { OwnRoutine };
