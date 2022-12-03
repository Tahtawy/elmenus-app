import React, { useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import { router } from './features/core/router';
import { useAppSelector, useAppDispatch } from './features/core/hooks/redux';
import { login } from './features/auth/AuthAPI';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { permissions, loading } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(login({ email: "user@elmenus.com", password: "12345678" }))
  }, []);

  useEffect(() => {
    console.log('permissions', permissions);
  }, [permissions]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
