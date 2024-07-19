import * as Yup from "yup";

export const getPasswordRule = () =>
  Yup.string()
    .min(6, "Password is too short")
    .max(255, "Password is too long")
    .trim()
    .strict(true)
    .required("Password is required");

export const ProductFiltersSchema = Yup.object({
  categories: Yup.array().min(1, "Category is Required"),
  brands: Yup.array().min(1, "Brand is Required"),
  shades: Yup.array().min(1, "Shade is Required"),
  products: Yup.array().min(1, "Product is required"),
  foundations: Yup.array().min(1, "Foundation is required"),
});

export const PdfDownloadSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
});

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: getPasswordRule(),
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  password: getPasswordRule(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is invalid"),
});

export const ProductValidationSchemaSingle = Yup.object({
  category: Yup.array().min(1, "Category is Required"),
  brand: Yup.string().required("Brand is Required"),
  shade: Yup.string().required("Shade is Required"),
  productName: Yup.string().required("Product is required"),
  foundation: Yup.string().required("Foundation is required"),
});

export const FeedbackValidationSchema = Yup.object({
  foundationFirst: Yup.string().required("Foundation 1 is Required"),
});
