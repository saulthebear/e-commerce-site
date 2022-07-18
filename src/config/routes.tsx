import React from 'react';
import IRoute from '../interfaces/routes';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import ProductPage from '../pages/Product';
import CategoryPage from '../pages/Category';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminCategories from '../pages/Admin/AdminCategories';
import AdminProducts from '../pages/Admin/AdminProducts';

// Require login
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

// No login required
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
  {
    path: '/category/:id',
    auth: false,
    name: 'Category',
    element: <CategoryPage />,
  },
];

// Admin required
const adminRoutes: IRoute[] = [
  {
    path: 'admin',
    auth: true,
    admin: true,
    name: 'Admin',
    element: <AdminDashboard />,
  },
  {
    path: 'admin/products',
    auth: true,
    admin: true,
    name: 'Admin Products',
    element: <AdminProducts />,
  },
  {
    path: 'admin/categories',
    auth: true,
    admin: true,
    name: 'Admin Categories',
    element: <AdminCategories />,
  },
];

const routes: IRoute[] = [...authRoutes, ...mainRoutes, ...adminRoutes];

export default routes;
