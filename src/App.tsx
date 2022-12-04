import { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import { router } from './features/core/Router';
import { useAppSelector } from './features/core/hooks/redux';
import { AbilityContext } from './features/core/AbilityContext';
import { buildAbilityFor, AppAbility } from './features/core/utils/defineRoles';

import './App.css';

function App() {
  const [ability, setAbility] = useState<any>(new AppAbility());
  const { permissions } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    setAbility(buildAbilityFor(permissions));
  }, [permissions]);

  return (
    <AbilityContext.Provider value={ability}>
      <RouterProvider router={router} />
    </AbilityContext.Provider>
  );
}

export default App;
