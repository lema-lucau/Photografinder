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
import EditPhotoshoot from "./pages/editPhotoshoot";
import LoggedInUserExists from './helpers/loggedInUserExists';
import SuggestedPhotographers from "./components/suggestedPhotographers";
import EditProfile from "./pages/editProfile";
import ResetPassword from "./pages/resetPassword";

function App() {
  const user = LoggedInUserExists();
  
  return (
    <>
      <React.StrictMode>
        <UserContext.Provider value={user}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.SETUP_PROFILE} element={<SetupProfile />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />

            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />

            <Route path={ROUTES.PHOTOSHOOTS} element={<Photoshoots />} />
            <Route path={ROUTES.EDIT_PHOTOSHOOT} element={<EditPhotoshoot />} />
            <Route path={ROUTES.SUGGEST_PHOTOGRAPHERS} element={<SuggestedPhotographers user={user}/>} />
          </Routes>
        </UserContext.Provider>
      </React.StrictMode>
    </>
  );
}

export default App;
