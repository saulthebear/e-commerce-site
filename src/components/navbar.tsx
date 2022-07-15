import React from 'react';
import { Link } from 'react-router-dom';

export interface INavbarProps {}

const Navbar: React.FC<INavbarProps> = () => {
  return (
    <>
      <p>Navbar</p>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
