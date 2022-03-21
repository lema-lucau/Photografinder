import {Routes, Route} from "react-router-dom";
import React from 'react';
import * as ROUTES from './constants/routes';
import UserContext from "./context/UserContext";
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import SetupProfile from './pages/setupProfile';
import Profile from './pages/profile';
import Photoshoots from './pages/photoshoots';
import LoggedInUserExists from './components/helpers/loggedInUserExists';

function App() {
  const user = LoggedInUserExists();
  
  return (
    <>
      <React.StrictMode>
        <UserContext.Provider value={user}>
          <Routes>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.SETUP_PROFILE} element={<SetupProfile />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.PHOTOSHOOTS} element={<Photoshoots />} />
          </Routes>
        </UserContext.Provider>
      </React.StrictMode>
    </>
  );
}

export default App;
