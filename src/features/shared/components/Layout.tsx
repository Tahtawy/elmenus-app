import { Link } from "react-router-dom";
import Can from "../../core/AbilityContext";
import { Menu, Button } from 'semantic-ui-react';
import { FC, useEffect, useContext } from "react";
import { setAuthStatus, setPermissions } from '../../auth/AuthSlice';
import { AbilityContext } from "../../core/AbilityContext";
import { buildAbilityFor } from '../../core/utils/defineRoles';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../core/hooks/redux';

export const Layout: FC = () => {
  const ability = useContext(AbilityContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { isLoggedin } = useAppSelector((state: any) => state.auth);

  useEffect(() => {
    if (pathname === '/') 
      navigate('/menu');
  }, []);

  const logout = () => {
    dispatch(setAuthStatus(false));
    dispatch(setPermissions([]));
  }

  return (
    <>
      <Menu>
        <Menu.Item>
          <img alt="logo" src='/assets/logo.webp' />
        </Menu.Item>

        <Menu.Item>
          <Link to="/menu">Menu</Link>
        </Menu.Item>

        <Menu.Menu position='right'>
          <Can I="view" a="adminPage" this={isLoggedin}>
            <Menu.Item name='admin'>
              <Button color="grey">
                <Link to="/admin">Admin</Link>
              </Button>
            </Menu.Item>
          </Can>
          {
            isLoggedin ? (
              <Menu.Item name='login'>
                <Button onClick={logout} content="Logout" color="red" />
              </Menu.Item>
            ) : (
              <Menu.Item name='login'>
                <Button color="red">
                  <Link to="/auth/login">Login</Link>
                </Button>
              </Menu.Item>
            )
          }
        </Menu.Menu>
      </Menu>
      <Outlet />
    </>
  )
}