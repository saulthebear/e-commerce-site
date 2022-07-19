import React from 'react';
import IRoute from '../interfaces/routes';
import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import ProductPage from '../pages/Product';
import CategoryPage from '../pages/Category';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminCategories from '../pages/Admin/AdminCategories';
import AdminProducts from '../pages/Admin/AdminProducts';
import CheckoutSuccess from '../pages/CheckoutSuccess';
import CheckoutFailure from '../pages/CheckoutFailure';
import OrdersPage from '../pages/Orders';
import OrderPage from '../pages/Order';

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
  {
    path: '/orders',
    auth: true,
    name: 'Orders',
    element: <OrdersPage />,
  },
  {
    path: '/orders/:orderId',
    auth: true,
    name: 'Orders',
    element: <OrderPage />,
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

const checkoutRoutes: IRoute[] = [
  {
    path: 'checkout/success',
    auth: true,
    name: 'Checkout Success',
    element: <CheckoutSuccess />,
  },
  {
    path: 'checkout/failure',
    auth: true,
    name: 'Checkout Failure',
    element: <CheckoutFailure />,
  },
];

const routes: IRoute[] = [
  ...authRoutes,
  ...mainRoutes,
  ...adminRoutes,
  ...checkoutRoutes,
];

export default routes;
