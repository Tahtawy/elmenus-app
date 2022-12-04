import React, { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import { router } from './features/core/Router';
import { useAppSelector, useAppDispatch } from './features/core/hooks/redux';
import { login } from './features/auth/AuthAPI';
import { AbilityContext } from './features/core/AbilityContext';
import { buildAbilityFor, AppAbility } from './features/core/utils/defineRoles';

import './App.css';

function App() {
  const [ability, setAbility] = useState<any>(new AppAbility());
  const dispatch = useAppDispatch();
  const { permissions } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(login({ email: "admin@elmenus.com", password: "12345678" }));
  }, []);

  useEffect(() => {
    console.log("ability", ability);
  }, [ability]);

  useEffect(() => {
    if (permissions.length) {
      setAbility(buildAbilityFor(permissions));
    }
  }, [permissions]);

  return (
    <AbilityContext.Provider value={ability}>
      <RouterProvider router={router} />
    </AbilityContext.Provider>
  );
}

export default App;
