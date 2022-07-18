import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext, { initialUserState } from '../../contexts/user';
import { MdMenu, MdSearch } from 'react-icons/md';
import { BsCart3 } from 'react-icons/bs';
import Sidebar from './Sidebar';
import { getCategories } from '../../API/categories';
import logging from '../../config/logging';
import { ICategoryDocument } from '../../interfaces/product';

// Display component for the navbar
export interface INavbarDisplayProps {
  isLoggedIn: boolean;
  logoutHandler: () => void;
  items: React.ReactNode[];
}
export const NavbarDisplay: React.FC<INavbarDisplayProps> = ({
  isLoggedIn,
  logoutHandler,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleSidebar={toggleSidebar}
        items={items}
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

  const [categories, setCategories] = useState<ICategoryDocument[]>([]);

  useEffect(() => {
    // Get categories from the server
    const fetchCategories = async () => {
      const data: { count: number; categories: ICategoryDocument[] } =
        await getCategories();
      setCategories(data.categories);
    };
    fetchCategories();
  }, []);

  const sidebar_items = categories.map((category) => {
    return (
      <Link to={`/category/${category._id}`} key={category._id}>
        {category.title}
      </Link>
    );
  });

  const Logout = () => {
    userContext.userDispatch({
      type: 'LOGOUT',
      payload: initialUserState,
    });
  };

  const isLoggedIn = user.uid !== '';

  return (
    <NavbarDisplay
      isLoggedIn={isLoggedIn}
      logoutHandler={Logout}
      items={sidebar_items}
    />
  );
};

export default Navbar;
