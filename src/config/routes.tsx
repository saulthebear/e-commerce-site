import React from 'react';
import IRoute from '../interfaces/routes';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import ProductPage from '../pages/Product';

const authRoutes: IRoute[] = [
  {
    path: 'login',
    auth: false,
    name: 'Login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    auth: false,
    name: 'Register',
    element: <LoginPage />,
  },
];

const mainRoutes: IRoute[] = [
  {
    path: '/',
    auth: false,
    name: 'Home',
    element: <HomePage />,
  },
  {
    path: '/products/:id',
    auth: false,
    name: 'Product',
    element: <ProductPage />,
  },
];

const routes: IRoute[] = [...authRoutes, ...mainRoutes];

export default routes;
