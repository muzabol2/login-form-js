import { Typography } from "@mui/material";
import { Link } from "react-router-dom";


export const LinkToSignupPage = () =>
   <div className="below-container">
      <Typography sx={{ textAlign: 'center' }}>
         Don't have an account? <Link to="/signup">Sign up</Link>
      </Typography>
   </div>


export const LinkToLoginPage = () =>
   <div className="below-container">
      <Typography sx={{ textAlign: 'center' }}>
         Have an account? <Link to="/login">Login</Link>
      </Typography>
   </div>
