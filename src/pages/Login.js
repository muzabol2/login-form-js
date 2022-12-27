import { useLogin } from '../hooks/useLogin';
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from '../components/Input';
import { loginSchema } from '../utils/validateLogin';
import { LinkToSignupPage } from '../components/LinksToPages';
import { Grid } from '@mui/material';

export default function Login() {
   const { login, isPending, error } = useLogin();

   const submitForm = ({ email, password }) => {
      login(email, password);
   };

   const loginList = [
      { value: "email", label: "Email:", type: "text" },
      { value: "password", label: "Password:", type: "password" }
   ];

   const formMethods = useForm({
      resolver: yupResolver(loginSchema),
      mode: "onBlur"
   });

   const { handleSubmit } = formMethods;

   return (<>
      <FormProvider {...formMethods}>
         <form className="auth-form" onSubmit={handleSubmit(submitForm)}>
            <Grid container gap={2} justifyContent="center">
               <h2>Login</h2>
               {loginList.map(({ value, label, type }) =>
                  <Input
                     key={value}
                     value={value}
                     label={label}
                     type={type} />
               )}
               {!isPending && <button>Login</button>}
               {isPending && <button disabled>Loading</button>}
               {error && <div className="error">{error}</div>}
            </Grid>
         </form>
      </FormProvider>
      <LinkToSignupPage />
   </>);
}
