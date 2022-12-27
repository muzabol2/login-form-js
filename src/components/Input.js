import { FormControl, FormHelperText, Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export const Input = ({ label, value, type, ...props }) => {
   const { register, formState: { errors } } = useFormContext();
   const error = errors[`${value}`];
   
   return (
      <Grid item>
         <FormControl error={!!error}>
            <TextField
               style={{ width: '310px' }}
               label={label}
               {...register(value)}
               type={type}
               id={value}
               {...props}
               error={!!error}
            />
            {error && <FormHelperText error>{error.message}</FormHelperText>}
         </FormControl>
      </Grid>
   )
};

