import { AuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/Loading';
import firebaseServices from '../config/firebase';
import logging from '../config/logging';
import UserContext from '../contexts/user';
import IPage from '../interfaces/page';
import { Authenticate, SignInWithSocial as SocialPopup } from '../modules/auth';

const LoginPage: React.FC<IPage> = () => {
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState('');

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  // is login or register
  const isLogin = window.location.pathname.includes('login');

  const SignInWithSocialMedia = async (provider: AuthProvider) => {
    if (error !== '') {
      setError('');
    }

    setAuthenticating(true);

    try {
      const result = await SocialPopup(provider);
      logging.info(
        `User signed in with ${provider.providerId}: ${result.user.displayName}`
      );
      console.log(result);
      const user = result.user;
      if (user.uid && user.displayName && user.email) {
        try {
          const fire_token = await user.getIdToken();
          // TODO: If we get a token, validate it against the server
          Authenticate(
            { uid: user.uid, name: user.displayName, email: user.email },
            fire_token,
            (error, _user) => {
              if (error || !_user) {
                logging.error(error);
                setError(error ? error : 'Unknown error');
              } else {
                userContext.userDispatch({
                  type: 'LOGIN',
                  payload: { user: _user, fire_token },
                });
                navigate('/');
              }
            }
          );
          setAuthenticating(false);
        } catch (error) {
          setError('Invalid token');
          logging.error(error);
          setAuthenticating(false);
        }
      } else {
        /**
         * TODO:
         * If no name is returned, we could have a custom form here for getting
         * the user's name, depending on the provider.
         * Google generally returns the user's name in the displayName property,
         * so we'll use that.
         */
        setError('No name found');
        setAuthenticating(false);
      }
    } catch (error) {
      setError(`Error signing in with ${provider}: ${error}`);
      logging.error(`Error signing in with ${provider}: ${error}`);
      setAuthenticating(false);
    }
  };

  return (
    <>
      <h1>{isLogin ? 'Login page' : 'Register Page'}</h1>
      <div>
        <Error error={error} />
      </div>
      <div>
        <button
          onClick={() =>
            SignInWithSocialMedia(firebaseServices.providers.google)
          }
          disabled={authenticating}
        >
          {isLogin ? 'Login with Google' : 'Register with Google'}
        </button>
        {authenticating && <Loading>Signing in...</Loading>}
      </div>
    </>
  );
};

export default LoginPage;
