import React, { FC } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { SignUpSchema } from "../../../helpers";
import { useSignUp } from "../../../hooks";
import { Button, Container, Input, Text } from "../../../ui";

interface FormikInitialValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: FC = () => {
  const { isLoading, onSubmit } = useSignUp();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik<FormikInitialValues>({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: SignUpSchema,
      onSubmit: (values) => onSubmit(values.email, values.password),
    });

  return (
    <Container>
      <div className="flex flex-col items-center justify-center relative">
        <div className="flex flex-col">
          <Text as="h1" textVariant="libre" className="uppercase">
            Sign up
          </Text>
          <Link href="/sign-in">
            <Text as="p" textVariant="libre-normal" className="mt-8">
              Creating an account will allow you to save products you’re
              interested in and edit your routine.
            </Text>
          </Link>
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
          <div className="mt-14">
            <Input
              inputType="auth"
              value={values.password}
              placeholder="Enter password"
              onBlur={handleBlur("password")}
              onChange={handleChange("password")}
              isError={!!errors.password && !!touched.password}
              error={errors.password ? errors.password : ""}
              leftLabel="PASSWORD"
              type="password"
              withBottomOffset
            />
            <Input
              inputType="auth"
              value={values.confirmPassword}
              placeholder="Confirm password"
              onBlur={handleBlur("confirmPassword")}
              onChange={handleChange("confirmPassword")}
              isError={!!errors.confirmPassword && !!touched.confirmPassword}
              error={errors.confirmPassword ? errors.confirmPassword : ""}
              leftLabel="CONFIRM PASSWORD"
              type="password"
            />
          </div>

          <Link href="/forgot-password" className="text-center mt-12">
            <Text textVariant="grey-link">Forgot your password?</Text>
          </Link>

          <div className="flex items-center justify-center mt-12">
            <Button
              isDarkBackground
              onClick={() => handleSubmit()}
              isLoading={isLoading}
              disabled={isLoading}
              className="min-h[39px] min-w-[111px]"
            >
              <Text className="text-white uppercase font-bold">sign up</Text>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export { SignUp };
