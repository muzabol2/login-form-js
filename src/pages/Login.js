import { Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from '../components/Input';
import { loginSchema } from '../utils/validateLogin';

export default function Login() {
   const { login, isPending, error } = useLogin();

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(loginSchema),
      mode: "onBlur"
   });

   const submitForm = ({ email, password }) => {
      login(email, password);
   };

   return (
      <>
         <form className="auth-form" onSubmit={handleSubmit(submitForm)}>
            <h2>Login</h2>
            <Input
               value="email"
               label="Email:"
               type="text"
               register={register}
               error={errors.email}
            />
            <Input
               value="password"
               label="Password:"
               type="password"
               register={register}
               error={errors.password} />
            {!isPending && <button>Login</button>}
            {isPending && <button disabled>Loading</button>}
            {error && <div className="error">{error}</div>}
         </form>
         <div className="below-container">
            <Typography sx={{ textAlign: 'center' }}>
               Don't have an account? <Link to="/signup">Sign up</Link>
            </Typography>
         </div>
      </>
   );
}
