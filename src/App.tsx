import { useEffect, useState } from 'react';
import { router } from './features/core/Router';
import { RouterProvider } from "react-router-dom";
import { AbilityContext } from './features/core/AbilityContext';
import { buildAbilityFor, AppAbility } from './features/shared/utils';
import { useAppDispatch, useAppSelector } from './features/shared/hooks';
import { setAuthStatus, setPermissions } from './features/auth/AuthSlice';

import './App.css';

function App() {
  const [ability, setAbility] = useState<any>(new AppAbility());
  const dispatch = useAppDispatch();
  const { permissions, isLoggedin } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    const isLoggedin = JSON.parse(window.localStorage.getItem('isLoggedin') || '');
    const permissions = JSON.parse(window.localStorage.getItem('permissions') || '');
    dispatch(setAuthStatus(isLoggedin));
    dispatch(setPermissions(permissions));
  }, []);

  useEffect(() => {
    setAbility(buildAbilityFor(permissions));
    window.localStorage.setItem('permissions', JSON.stringify(permissions));
  }, [permissions]);

  useEffect(() => {
    window.localStorage.setItem('isLoggedin', isLoggedin);
  }, [isLoggedin]);

  return (
    <AbilityContext.Provider value={ability}>
      <RouterProvider router={router} />
    </AbilityContext.Provider>
  );
}

export default App;
