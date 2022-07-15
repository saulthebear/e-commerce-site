import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import logging from '../config/logging';
import UserContext from '../contexts/user';

export interface IAuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<IAuthRouteProps> = ({ children }) => {
  const { user } = useContext(UserContext).userState;

  // Not logged in
  if (user._id === '') {
    logging.info('Unauthenticated user trying to access protected route, redirecting to login page.');
    return <Navigate to="/login" />;
  }

  // Logged in
  return <>{children}</>;
};

export default AuthRoute;
