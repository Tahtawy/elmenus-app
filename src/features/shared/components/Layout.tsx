import { FC, useEffect } from "react";
import { NavigationBar } from "./NavigationBar";
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export const Layout: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') 
      navigate('/menu');
  }, []);

  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  )
}