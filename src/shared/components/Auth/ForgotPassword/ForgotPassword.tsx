import React, { FC } from "react";
import { useFormik } from "formik";
import { Button, Container, Input, Text } from "../../../ui";
import { ForgotPasswordSchema } from "../../../helpers";
import { useForgotPassword } from "../../../hooks";

const ForgotPassword: FC = () => {
  const { isLoading, onSubmit } = useForgotPassword();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: ForgotPasswordSchema,
      onSubmit: (values) => onSubmit(values.email),
    });

  return (
    <Container>
      <div className="flex flex-col items-center justify-center relative">
        <div className="flex flex-col">
          <Text as="h1" textVariant="libre" className="uppercase">
            Forgot Password
          </Text>
          <Text as="p" textVariant="libre-normal" className="mt-8 text-center">
            Enter your email below to receive your password reset instruction
          </Text>
        </div>

        <div className="flex flex-col mt-[73px]">
          <div>
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
          </div>

          <div className="flex items-center justify-center mt-12">
            <Button
              isDarkBackground
              onClick={() => handleSubmit()}
              disabled={isLoading}
              isLoading={isLoading}
              loaderSize="xs"
              className="min-w-[89px] min-h-[39px]"
            >
              <Text className="text-white uppercase font-bold">send</Text>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export { ForgotPassword };
