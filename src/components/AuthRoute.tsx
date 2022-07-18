import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import logging from '../config/logging';
import UserContext from '../contexts/user';
import Unauthorized from './ErrorPages/Unauthorized';

export interface IAuthRouteProps {
  requireAdmin?: boolean;
  children: React.ReactNode;
}

const AuthRoute: React.FC<IAuthRouteProps> = ({
  requireAdmin = false,
  children,
}) => {
  const { user } = useContext(UserContext).userState;

  if (requireAdmin && user.role !== 'ADMIN') {
    logging.error('User is not an admin');
    return <Unauthorized />;
  }

  // Not logged in
  if (user._id === '') {
    logging.info(
      'Unauthenticated user trying to access protected route, redirecting to login page.'
    );
    return <Navigate to="/login" />;
  }

  // Logged in
  return <>{children}</>;
};

export default AuthRoute;
