import React from 'react';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SidebarItem from './SidebarItem';

export interface ISidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  items: React.ReactNode[];
  isLoggedIn: boolean;
  logoutHandler: () => void;
}

const Sidebar: React.FC<ISidebarProps> = ({
  isOpen,
  toggleSidebar,
  items,
  isLoggedIn,
  logoutHandler,
}) => {
  const itemsList = items.map((item, index) => {
    return (
      <li key={index}>
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
        <div className="mb-8">
          <button onClick={toggleSidebar}>
            <MdClose size="1.5em" />
          </button>
        </div>
        <ul>{itemsList}</ul>
        <div className="mt-10 space-y-3 flex flex-col text-xl text-slate-600">
          {isLoggedIn ? (
            <button onClick={() => logoutHandler()}>Logout</button>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-slate-900 transition-colors ease-in-out duration-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-slate-900 transition-colors ease-in-out duration-100"
              >
                Sign Up
              </Link>
            </>
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
