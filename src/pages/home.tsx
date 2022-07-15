import React from 'react';
import Navbar from '../components/Navbar';
import IPage from '../interfaces/page';

const HomePage: React.FC<IPage> = () => {
  return (
    <>
      <Navbar />
      <h1>Home page</h1>
    </>
  );
};

export default HomePage;
