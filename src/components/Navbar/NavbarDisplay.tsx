import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdSearch } from 'react-icons/md';
import { BsCart3 } from 'react-icons/bs';
import Sidebar from './Sidebar';

// Display component for the navbar
export interface INavbarDisplayProps {
  items: React.ReactNode[];
}
export const NavbarDisplay: React.FC<INavbarDisplayProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleSidebar={toggleSidebar}
        items={items}
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
