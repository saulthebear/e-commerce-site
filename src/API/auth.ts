import axios from 'axios';
import auth, { signInWithPopup } from 'firebase/auth';
import config from '../config/config';
import firebaseServices from '../config/firebase';
import IUser from '../interfaces/user';

export const SignInWithSocial = (provider: auth.AuthProvider) =>
  signInWithPopup(firebaseServices.auth, provider);

export const Authenticate = async (
  user: { uid: string; name: string; email: string },
  fire_token: string,
  callback: (error: string | null, user: IUser | null) => void
) => {
  try {
    const response = await axios.post(
      `${config.server.url}/users/login`,
      user,
      {
        headers: {
          Authorization: `Bearer ${fire_token}`,
        },
      }
    );

    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 304
    ) {
      const user = response.data.user;
      callback(null, user);
    } else {
      callback('Failed to authenticate', null);
    }
  } catch (error) {
    callback('Failed to authenticate', null);
  }
};

export const Validate = async (
  fire_token: string,
  callback: (error: string | null, user: IUser | null) => void
) => {
  try {
    const response = await axios.get(`${config.server.url}/users/validate`, {
      headers: {
        Authorization: `Bearer ${fire_token}`,
      },
    });

    if (response.status === 200 || response.status === 304) {
      const user = response.data.user;
      callback(null, user);
    } else {
      callback('Failed to validate', null);
    }
  } catch (error) {
    callback('Failed to validate', null);
  }
};
