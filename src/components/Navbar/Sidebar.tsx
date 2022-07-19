import React, { useContext } from 'react';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import UserContext, { initialUserState } from '../../contexts/user';
import SidebarItem from './SidebarItem';

export interface ISidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  items: React.ReactNode[];
}

const Sidebar: React.FC<ISidebarProps> = ({
  isOpen,
  setIsOpen,
  toggleSidebar,
  items,
}) => {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

  const isLoggedIn = user.uid !== '';
  const isAdmin = user.role === 'ADMIN';

  const logout = () => {
    userContext.userDispatch({
      type: 'LOGOUT',
      payload: initialUserState,
    });
  };

  const itemsList = items.map((item, index) => {
    return (
      <li key={index} onClick={() => setIsOpen(false)}>
        <SidebarItem isShown={isOpen} extraDelay={index * 100}>
          {item}
        </SidebarItem>
      </li>
    );
  });
  return (
    <>
      <div
        className={`bg-white h-screen w-72 p-6 fixed top-0 left-0 z-50 ease-in-out duration-500 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header (close button) */}
        <div className="mb-8">
          <button onClick={toggleSidebar}>
            <MdClose size="1.5em" />
          </button>
        </div>
        {/* Categories */}
        <ul>{itemsList}</ul>
        {/* User links */}
        <div className="mt-10 space-y-3 flex flex-col text-xl text-slate-600">
          {isLoggedIn ? (
            <>
              <Link to="/orders">My Orders</Link>
              <button onClick={() => logout()}>Logout</button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-slate-900 transition-colors ease-in-out duration-100"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-slate-900 transition-colors ease-in-out duration-100"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        {/* Admin Links */}
        <div className="mt-10 space-y-3 flex flex-col text-xl text-red-600">
          {isAdmin && (
            <div className="flex flex-col">
              <Link
                to="/admin"
                className="hover:text-red-900 transition-colors ease-in-out duration-100"
                onClick={() => setIsOpen(false)}
              >
                Admin Dashboard
              </Link>
              <Link
                to="/admin/products"
                className="hover:text-red-900 transition-colors ease-in-out duration-100"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/admin/categories"
                className="hover:text-red-900 transition-colors ease-in-out duration-100"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* backdrop */}
      {isOpen && (
        <div
          className="bg-slate-900/30 fixed inset-0 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
