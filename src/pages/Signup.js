import { Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from '../utils/validateSignup';
import { Input } from '../components/Input';

export default function Signup() {
   const [thumbnail, setThumbnail] = useState(null);
   const [thumbnailError, setThumbnailError] = useState(null);
   const { signup, isPending, error } = useSignup();

   const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(signupSchema),
      mode: "onBlur"
   });

   const submitForm = ({ email, password, displayName }) => {
      signup(email, password, displayName, thumbnail);
   };

   const handleFileChange = (e) => {
      setThumbnail(null);
      let selected = e.target.files[0];

      if (!selected) {
         setThumbnailError("Please select a file");
         return;
      }
      if (!selected.type.includes('image')) {
         setThumbnailError("Selected file must be an image");
         return;
      }
      if (selected.size > 100000) {
         setThumbnailError("Image file size must be less than 100kb");
         return;
      }

      setThumbnailError(null);
      setThumbnail(selected);
   }

   return (
      <>
         <form className="auth-form" onSubmit={handleSubmit(submitForm)}>
            <h2>Sign up</h2>
            <Input
               value="email"
               label="Email:"
               type="text"
               register={register}
               error={errors.email}
            />
            <Input
               value="displayName"
               label="Display name:"
               type="text"
               register={register}
               error={errors.displayName} />
            <Input
               value="password"
               label="Password:"
               type="password"
               register={register}
               error={errors.password} />
            <Input
               value="passwordConfirm"
               label="Password confirmation:"
               type="password"
               register={register}
               error={errors.passwordConfirm} />
            <label>
               <span>Profile thumbnail: (optional)</span>
               <input
                  type="file"
                  onChange={handleFileChange}
               />
               {thumbnailError && <div className="error">{thumbnailError}</div>}
            </label>
            {!isPending && <button>Sign up</button>}
            {isPending && <button disabled>Loading</button>}
            {error && <div className="error">{error}</div>}
         </form>
         <div className="below-container">
            <Typography sx={{ textAlign: 'center' }}>
               Have an account? <Link to="/login">Login</Link>
            </Typography>
         </div>
      </>
   );
}
