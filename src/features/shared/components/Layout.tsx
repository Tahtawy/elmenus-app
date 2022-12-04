import { FC, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Can from "../../core/AbilityContext";

export const Layout: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') 
      navigate('/menu');
  }, []);
  return (
    <>
      <Can I="view" a="adminPage">
        <p>Layout</p>
      </Can>
      <Outlet />
    </>
  )
}