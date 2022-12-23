import * as yup from "yup";

export const loginSchema = yup.object().shape({
   email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
   password: yup
      .string()
      .min(5, "5 characters or more")
      .required("Required")
});
