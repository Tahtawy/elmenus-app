import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import Can from "../../core/AbilityContext";
import { Menu, Button } from 'semantic-ui-react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setAuthStatus, setPermissions } from '../../auth/AuthSlice';


export const NavigationBar: FC = () => {
  const navigate = useNavigate();
  const { isLoggedin } = useAppSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(setAuthStatus(false));
    dispatch(setPermissions([]));
    navigate('/menu');
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
              <Button className="loginBtn" color="red">
                <Link to="/auth/login">Login</Link>
              </Button>
            </Menu.Item>
          )
        }
      </Menu.Menu>
    </Menu>
  )
}