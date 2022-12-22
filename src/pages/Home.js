import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout';

export default function Home() {
   const { user } = useAuthContext();
   const { logout } = useLogout();
   
   return (
      <div className="home">
         <h2>Home</h2>
         <p>{user.email}</p>
         <div className="avatar">
            <img src={user.photoURL} alt="user avatar" />
         </div>
         <button onClick={logout}>Logout</button>
      </div >
   );
}
