import React from 'react';
import {
    Routes,
    Route,
  } from "react-router-dom";

import HomePage from './pages/Home/Home';
import UserPage from './pages/User/User';
import AdminPage from './pages/Admin/Admin';

function AppRouter() {
  return (
    <Routes>
        <Route exact path='/'       element={<HomePage />}  />
        <Route exact path='/user'   element={<UserPage />}  />
        <Route exact path='/admin'  element={<AdminPage />} /> 
        <Route exact path='/shop'   element={'shop Path'}   />
    </Routes>
  );
}

export default AppRouter;
