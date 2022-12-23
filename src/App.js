import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
   const { authIsReady, user } = useAuthContext();

   return (
      <div className="App">
         {authIsReady && (
            <BrowserRouter>
               <Routes>
                  <Route
                     path='/'
                     element={user ?
                        <Home /> :
                        <Navigate to="/login" />} />
                  <Route
                     path='/signup'
                     element={!user ?
                        <Signup /> :
                        <Navigate to="/" />} />
                  <Route
                     path='/login'
                     element={!user ?
                        <Login /> :
                        <Navigate to="/" />} />
               </Routes>
            </BrowserRouter>
         )}
      </div>
   );
}

export default App;
