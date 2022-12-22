import { Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useSignup } from '../hooks/useSignup';

export default function Signup() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [displayName, setDisplayName] = useState('');
   const [thumbnail, setThumbnail] = useState(null);
   const [thumbnailError, setThumbnailError] = useState(null);
   const { signup, isPending, error } = useSignup();

   const handleSubmit = (e) => {
      e.preventDefault();
      signup(email, password, displayName, thumbnail);
   }

   const handleFileChange = (e) => {
      setThumbnail(null);
      let selected = e.target.files[0];
      console.log(selected);

      if (!selected) {
         setThumbnailError("Please select a file.");
         return;
      }
      if (!selected.type.includes('image')) {
         setThumbnailError("Selected file must be an image.");
         return;
      }
      if (selected.size > 100000) {
         setThumbnailError("Image file size must be less than 100kb.");
         return;
      }

      setThumbnailError(null);
      setThumbnail(selected);
      console.log("thumbnail updated.");
   }

   return (
      <>
         <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <label>
               <span>Email:</span>
               <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
               />
            </label>
            <label>
               <span>Password:</span>
               <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
               />
            </label>
            <label>
               <span>Display name:</span>
               <input
                  type="text"
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
               />
            </label>
            <label>
               <span>Profile thumbnail:</span>
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
