import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext, { initialUserState } from '../contexts/user';

// Display component for the navbar
export interface INavbarDisplayProps {
  isLoggedIn: boolean;
  logoutHandler: () => void;
}
export const NavbarDisplay: React.FC<INavbarDisplayProps> = ({
  isLoggedIn,
  logoutHandler,
}) => {
  return (
    <div className="bg-pink-200 ">
      <ul className="flex justify-between w-full">
        <div>
          <li>
            <Link to="/">Home</Link>
          </li>
        </div>
        <div>
          {isLoggedIn ? (
            <li>
              <button onClick={() => logoutHandler()}>Logout</button>
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
        </div>
      </ul>
    </div>
  );
};

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

  return <NavbarDisplay isLoggedIn={isLoggedIn} logoutHandler={Logout} />;
};

export default Navbar;
