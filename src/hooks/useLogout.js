import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';

export const useLogout = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const logout = async () => {
      setError(null);
      setIsPending(true);

      try {
         await signOut(auth);
         dispatch({ type: "LOGOUT" });

         if (!isCancelled) {
            setIsPending(false);
            setError(null);
         }
      }
      catch (err) {
         console.error(err.message);
         setError(err.message);
         setIsPending(false);
      }
   }

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { logout, error, isPending };
}
