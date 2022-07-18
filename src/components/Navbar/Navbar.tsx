import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext, { initialUserState } from '../../contexts/user';
import { MdMenu, MdSearch } from 'react-icons/md';
import { BsCart3 } from 'react-icons/bs';
import Sidebar from './Sidebar';

const dummy_sidebar_items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
];

// Display component for the navbar
export interface INavbarDisplayProps {
  isLoggedIn: boolean;
  logoutHandler: () => void;
}
export const NavbarDisplay: React.FC<INavbarDisplayProps> = ({
  isLoggedIn,
  logoutHandler,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        items={dummy_sidebar_items}
        isLoggedIn={isLoggedIn}
        logoutHandler={logoutHandler}
      />
      <div className="bg-white fixed w-full h-navbar-height flex items-center">
        <ul className="flex justify-between w-full">
          <div className="flex items-center">
            <li>
              <button onClick={toggleSidebar}>
                <MdMenu size="1.5rem" />
              </button>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </div>
          <div className="flex items-center">
            <li>
              <MdSearch size="1.5rem" />
            </li>
            <li>
              <BsCart3 size="1.5rem" />
            </li>
          </div>
        </ul>
      </div>
    </>
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
