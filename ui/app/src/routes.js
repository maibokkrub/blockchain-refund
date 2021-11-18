import React from 'react';
import {
    Routes,
    Route,
  } from "react-router-dom";
  
import UserPage from './pages/User/User';

function AppRouter() {
  return (
    <Routes>
        <Route exact path='/user' element={<UserPage />} />
        <Route exact path='/shop' element={'shop Path'} />
        <Route exact path='/admin' element={'admin Path'} />
        <Route exact path='/' element={'Main'} />
    </Routes>
  );
}

export default AppRouter;
