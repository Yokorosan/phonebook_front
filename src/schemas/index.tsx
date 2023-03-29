import * as yup from "yup";

export const registerUserSchema = yup.object().shape({
  name: yup.string().max(75, "Name too long").required(),
  email: yup.string().email("Email is required").required(),
  password: yup
    .string()
    .min(8, "Password must have at least 8 characters")
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password must be equal to Password"),
  phone: yup.string().required(),
  isAdm: yup.bool().optional(),
});

export const registerContactSchema = yup.object().shape({
  name: yup.string().max(75, "Name too long").required(),
  email: yup.string().email("Email is required").required(),
  phone: yup.string().required(),
});

export const loginUserSchema = yup.object().shape({
  email: yup.string().email("Email is required").required(),
  password: yup.string().required("Password is Required"),
});
