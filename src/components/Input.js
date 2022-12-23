export const Input = ({ value, label, register, type, error }) => (
   <>
      <label>
         <span>{label}</span>
         <input type={type} {...register(value)} />
      </label>
      {error && <p className="error">{error.message}</p>}
   </>
);
