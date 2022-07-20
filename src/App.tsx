import React, { useEffect, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Loading from './components/Loading';
import Navbar from './components/Navbar/Navbar';
import logging from './config/logging';
import routes from './config/routes';
import {
  initialUserState,
  UserContextProvider,
  userReducer,
} from './contexts/user';
import { Validate } from './API/auth';

export interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CheckLocalStorageForCredentials();
  }, []);

  /**
   * Check to see if we have a token in local storage.
   * If we do, verify it against the server.
   * If not, use is logged out.
   */
  const CheckLocalStorageForCredentials = () => {
    const fire_token = localStorage.getItem('fire_token');
    if (fire_token === null) {
      userDispatch({ type: 'LOGOUT', payload: initialUserState });
      setLoading(false);
    } else {
      return Validate(fire_token, (error, user) => {
        if (error) {
          logging.error(error);
          userDispatch({ type: 'LOGOUT', payload: initialUserState });
          setLoading(false);
        } else if (user) {
          userDispatch({ type: 'LOGIN', payload: { user, fire_token } });
          setLoading(false);
        }
      });
    }
  };

  const userContextValues = {
    userState,
    userDispatch,
  };

  if (loading) {
    return <Loading>Checking login status...</Loading>;
  }

  return (
    <UserContextProvider value={userContextValues}>
      <div className="h-full">
        <Navbar />
        <div className="relative top-navbar-height min-h-adjusted-screen-height bottom-0 pt-8 pb-16 px-5">
          <Routes>
            {routes.map((route, index) => {
              let element = route.element;
              // Protected routes
              if (route.auth) {
                if (route.admin)
                  element = <AuthRoute requireAdmin>{route.element}</AuthRoute>;
                else element = <AuthRoute>{route.element}</AuthRoute>;
              }
              return <Route key={index} path={route.path} element={element} />;
            })}
          </Routes>
        </div>
      </div>
    </UserContextProvider>
  );
};

export default App;
