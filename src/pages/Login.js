import { Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

export default function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const { login, isPending, error } = useLogin();

   const handleSubmit = e => {
      e.preventDefault();
      login(email, password);
   }
   return (
      <>
         <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
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
