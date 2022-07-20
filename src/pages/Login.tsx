import { AuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import Loading from '../components/UI/Loading';
import firebaseServices from '../config/firebase';
import logging from '../config/logging';
import UserContext from '../contexts/user';
import IPage from '../interfaces/page';
import { Authenticate, SignInWithSocial as SocialPopup } from '../API/auth';
import PageHead from '../components/UI/PageHead';
import { FcGoogle } from 'react-icons/fc';

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
      <PageHead title={isLogin ? 'Login' : 'Sign Up'} />
      {error !== '' && (
        <div className="bg-red-200 p-5 text-center text-red-800 rounded-lg mx-10 my-5">
          An error occurred.
        </div>
      )}
      <div className="my-5">
        {authenticating && <Loading>Signing in...</Loading>}
      </div>
      <div className="px-10">
        <button
          onClick={() =>
            SignInWithSocialMedia(firebaseServices.providers.google)
          }
          disabled={authenticating}
          className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-200 disabled:text-blue-100 text-white font-bold py-3 px-4 rounded-full flex justify-center items-center w-full"
        >
          <div>{isLogin ? 'Login with Google' : 'Register with Google'}</div>
          <div className="bg-white rounded-full p-1 ml-3">
            <FcGoogle />
          </div>
        </button>
      </div>
    </>
  );
};

export default LoginPage;
