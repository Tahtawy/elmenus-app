import { FC } from "react";
import { Link } from "react-router-dom";
import Can from "../../core/AbilityContext";
import { Menu, Button } from 'semantic-ui-react';
import { setAuthStatus, setPermissions } from '../../auth/AuthSlice';
import { useAppSelector, useAppDispatch } from '../hooks';

export const NavigationBar: FC = () => {
  const { isLoggedin } = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(setAuthStatus(false));
    dispatch(setPermissions([]));
  }

  return (
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
  )
}