// import React, { useEffect, useContext } from 'react';
import React from 'react';
import IPage from '../interfaces/page';
// import { test } from '../API/products';
// import UserContext from '../contexts/user';

const HomePage: React.FC<IPage> = () => {
  // const { fire_token } = useContext(UserContext).userState;
  // useEffect(() => {
  //   console.log('STARTING TEST');
  //   test(fire_token);
  //   console.log('ENDING TEST');
  // }, []);
  return (
    <>
      <h1>Home page</h1>
    </>
  );
};

export default HomePage;
