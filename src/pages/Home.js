import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout';

export default function Home() {
   const { user } = useAuthContext();
   const { logout } = useLogout();

   return (
      <div className="home">
         <h2>Dzień dobry, Kierowniku złoty!</h2>
         {user.photoURL &&
            <div className="avatar">
               <img src={user.photoURL} alt="user avatar" />
            </div>
         }
         <p>name: {user.displayName}</p>
         <p>mail: {user.email}</p>
         <button onClick={logout}>Logout</button>
      </div>
   );
}
