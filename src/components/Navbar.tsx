import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext, { initialUserState } from '../contexts/user';

export interface INavbarProps {}

const Navbar: React.FC<INavbarProps> = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

  const Logout = () => {
    userContext.userDispatch({
      type: 'LOGOUT',
      payload: initialUserState,
    });
  };

  const isLoggedIn = user.uid !== '';

  return (
    <>
      <p>Navbar</p>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <button onClick={() => Logout()}>Logout</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default Navbar;
