import * as yup from "yup";

export const signupSchema = yup.object().shape({
   displayName: yup
      .string()
      .required("Required")
      .min(5, "5-20 characters")
      .max(20, "5-20 characters"),
   email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
   password: yup
      .string()
      .min(6, "6 characters or more")
      .required("Required"),
   passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
});
