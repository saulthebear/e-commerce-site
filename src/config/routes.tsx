import React from 'react';
import IRoute from '../interfaces/routes';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';

const authRoutes: IRoute[] = [
  {
    path: '/login',
    auth: false,
    name: 'Login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    auth: false,
    name: 'Register',
    element: <LoginPage />,
  },
];

const blogRoutes: IRoute[] = [];

const mainRoutes: IRoute[] = [
  {
    path: '/',
    auth: false,
    name: 'Home',
    element: <HomePage />,
  },
];

const routes: IRoute[] = [...authRoutes, ...blogRoutes, ...mainRoutes];

export default routes;
