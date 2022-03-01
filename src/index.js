import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/app.css';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import * as ROUTES from './constants/routes';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import EnterDetails from './pages/enterDetails';
import Profile from './pages/profile';
import Photoshoots from './pages/photoshoots';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.ENTER_DETAILS} element={<EnterDetails />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.PHOTOSHOOTS} element={<Photoshoots />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
