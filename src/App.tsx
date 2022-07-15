import React, { useEffect, useReducer, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import Loading from './components/Loading';
import logging from './config/logging';
import routes from './config/routes';
import {
  initialUserState,
  UserContextProvider,
  userReducer,
} from './contexts/user';
import { Validate } from './modules/auth';

export interface IAppProps {}

const App: React.FC<IAppProps> = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [loading, setLoading] = useState(true);

  // TODO: remove this
  // Used for debugging purposes
  const [authStage, setAuthStage] = useState('Checking local storage...');

  useEffect(() => {
    setTimeout(() => {
      CheckLocalStorageForCredentials();
    }, 1000);
  }, []);

  /**
   * Check to see if we have a token in local storage.
   * If we do, verify it against the server.
   * If not, use is logged out.
   */
  const CheckLocalStorageForCredentials = () => {
    setAuthStage('Checking credentials...');
    const fire_token = localStorage.getItem('fire_token');
    if (fire_token === null) {
      userDispatch({ type: 'LOGOUT', payload: initialUserState });
      setAuthStage('No credentials found.');
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      // TODO: validate the token against the server
      // setAuthStage('Credentials found, validating ....');
      // setTimeout(() => {
      //   setLoading(false);
      // }, 1000);
      return Validate(fire_token, (error, user) => {
        if (error) {
          setAuthStage('Credentials found, but invalid Logging out...');
          logging.error(error);
          userDispatch({ type: 'LOGOUT', payload: initialUserState });
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else if (user) {
          setAuthStage('Credentials found, valid. Logging in...');
          userDispatch({ type: 'LOGIN', payload: { user, fire_token } });
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      });
    }
  };

  const userContextValues = {
    userState,
    userDispatch,
  };

  if (loading) {
    return <Loading>{authStage}</Loading>;
  }

  return (
    <UserContextProvider value={userContextValues}>
      <Routes>
        {routes.map((route, index) => {
          let element = route.element;
          // Protected routes
          if (route.auth) {
            element = <AuthRoute>{route.element}</AuthRoute>;
          }
          return <Route key={index} path={route.path} element={element} />;
        })}
      </Routes>
    </UserContextProvider>
  );
};

export default App;
