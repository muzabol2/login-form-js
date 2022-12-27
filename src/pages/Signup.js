import { useSignup } from '../hooks/useSignup';
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from '../utils/validateSignup';
import { Input } from '../components/Input';
import { LinkToLoginPage } from '../components/LinksToPages';
import { Grid } from '@mui/material';
import { Dropzone } from '../components/Dropzone';

export default function Signup() {
   const { signup, isPending, error } = useSignup();

   const submitForm = ({ email, password, displayName, thumbnail }) => {
      signup(email, password, displayName, thumbnail);
   };

   const signupList = [
      { value: "email", label: "Email:", type: "text" },
      { value: "displayName", label: "Display name:", type: "text" },
      { value: "password", label: "Password:", type: "password" },
      { value: "passwordConfirm", label: "Password confirmation:", type: "password" }
   ];

   const formMethods = useForm({
      resolver: yupResolver(signupSchema),
      mode: "onBlur"
   });

   const { handleSubmit } = formMethods;

   return (<>
      <FormProvider {...formMethods}>
         <form className="auth-form" onSubmit={handleSubmit(submitForm)}>
            <Grid container gap={2} justifyContent="center">
               <h2>Sign up</h2>
               {signupList.map(({ value, label, type }) =>
                  <Input
                     key={value}
                     value={value}
                     label={label}
                     type={type} />
               )}
               <Grid item>
                  <Dropzone name="thumbnail" />
               </Grid>
               {!isPending && <button type="submit">Sign up</button>}
               {isPending && <button disabled>Loading</button>}
               {error && <div className="error">{error}</div>}
            </Grid>
         </form>
      </FormProvider>
      <LinkToLoginPage />
   </>);
}
