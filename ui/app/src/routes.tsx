import React from 'react';
import {
    Routes,
    Route,
  } from "react-router-dom";

import HomePage from './pages/Home/Home';
import TouristPage from './pages/Tourist/Tourist';
import ShopPage from './pages/Shop/Shop';
import GovernmentPage from './pages/Government/Government';

function AppRouter() {
  return (
    <Routes>
        <Route path='/'           element={<HomePage />} />
        <Route path='/tourist'    element={<TouristPage />} />
        <Route path='/shop'       element={<ShopPage />} />
        <Route path='/government' element={<GovernmentPage />} /> 
    </Routes>
  );
}

export default AppRouter;
