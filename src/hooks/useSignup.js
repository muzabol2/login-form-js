import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase/config';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';

export const useSignup = () => {
   const [isCancelled, setIsCancelled] = useState(false);
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);
   const { dispatch } = useAuthContext();

   const signup = async (email, password, displayName, thumbnail) => {
      console.log("nail", thumbnail);
      setError(null);
      setIsPending(true);

      try {
         const res = await createUserWithEmailAndPassword(auth, email, password);

         if (!res) {
            throw new Error("Could not complate signup.");
         }

         // upload user thumbnail photo
         const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
         const storageRef = ref(storage, uploadPath);
         await uploadBytes(storageRef, thumbnail);
         
         const imgUrl = await getDownloadURL(storageRef);
         updateProfile(res.user, { displayName, photoURL: imgUrl });
         
         // create a user document
         const docRef = doc(db, "users", res.user.uid);
         await setDoc(docRef, {
            displayName,
            photoURL: imgUrl
         });

         dispatch({ type: "LOGIN", payload: res.user });

         if (!isCancelled) {
            setIsPending(false);
            setError(null);
         }
      }
      catch (err) {
         console.log(err.message);
         setError(err.message);
         setIsPending(false);
      }
   }

   useEffect(() => {
      return () => setIsCancelled(true);
   }, []);

   return { signup, error, isPending };
}
