import React, { FC } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { SignInSchema } from "../../../helpers";
import { useSignIn } from "../../../hooks";
import { Button, Container, Input, Text } from "../../../ui";

interface FormikInitialValues {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const { isLoading, onSubmit } = useSignIn();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik<FormikInitialValues>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: SignInSchema,
      onSubmit: (values) => onSubmit(values.email, values.password),
    });

  return (
    <Container>
      <div className="flex flex-col items-center justify-center relative">
        <div className="flex flex-col">
          <Text as="h1" textVariant="libre" className="uppercase">
            Sign in
          </Text>
          <Link href="/sign-up">
            <Text as="p" textVariant="libre-normal" className="mt-8">
              Don’t have an account? Sign up
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
            />
          </div>

          <Link href="/forgot-password" className="text-center mt-12">
            <Text textVariant="grey-link">Forgot your password?</Text>
          </Link>

          <div className="flex items-center justify-center mt-12">
            <Button
              isDarkBackground
              onClick={() => handleSubmit()}
              disabled={isLoading}
              isLoading={isLoading}
              className="min-h-[39px] min-w-[107px]"
            >
              <Text className="text-white uppercase font-bold">sign in</Text>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export { SignIn };
