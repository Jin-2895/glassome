import React, { FC } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { Button, Input, Text } from "../../../ui";
import { usePdfDownload } from "../../../hooks";
import { PdfDownloadSchema } from "../../../helpers";

interface FormikInitialValues {
  email: string;
}

export const MakeUpContent: FC = () => {
  const { isLoading, onPdfDownload } = usePdfDownload();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik<FormikInitialValues>({
      initialValues: {
        email: "",
      },
      validationSchema: PdfDownloadSchema,
      onSubmit: (values) => onPdfDownload(values.email),
    });
  return (
    <div className="flex flex-col items-center mt-20">
      <Text
        as="h3"
        textVariant="libre-bold"
        className="flex flex-row justify-start"
      >
        Guide to make up for olive skintones
      </Text>
      <Text as="p" className="mt-10 text-center">
        Download our guide by signing up/logging in.
      </Text>
      <Text as="p" className="text-center mt-10">
        If you liked this guide, please spread the word by tagging us:
      </Text>
      <div className="flex flex-col">
        <Link target="_blank" href="https://www.instagram.com/glossame/">
          instagram: @glossame
        </Link>
        <Link target="_blank" href="https://www.tiktok.com/@glossame">
          tiktok: @glossame
        </Link>
      </div>
      {/* <div className="min-w-[300px] mt-10">
        <Input
          inputType="auth"
          value={values.email}
          placeholder="Enter email"
          onBlur={handleBlur("email")}
          onChange={handleChange("email")}
          isError={!!errors.email && !!touched.email}
          error={errors.email ? errors.email : ""}
          leftLabel="EMAIL"
        />
      </div> */}
      <div className="mt-12 flex">
        <Button
          isDarkBackground
          onClick={() => {
            handleSubmit();
          }}
          disabled={isLoading}
          isLoading={isLoading}
          className="min-h-[39px] w-[140px]"
        >
          <Text as="a" className="text-white uppercase font-bold">
            download
          </Text>
        </Button>
      </div>
    </div>
  );
};
