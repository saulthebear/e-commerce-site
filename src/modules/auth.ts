import axios from 'axios';
import auth, { signInWithPopup } from 'firebase/auth';
import config from '../config/config';
import firebaseServices from '../config/firebase';
import logging from '../config/logging';
import IUser from '../interfaces/user';

export const SignInWithSocial = (provider: auth.AuthProvider) =>
  signInWithPopup(firebaseServices.auth, provider);

export const Authenticate = async (
  uid: string,
  name: string,
  fire_token: string,
  callback: (error: string | null, user: IUser | null) => void
) => {
  try {
    const response = await axios.post(
      `${config.server.url}/users/login`,
      {
        uid,
        name,
      },
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
      logging.info(`User ${name} authenticated`);
      const user = response.data.user;
      callback(null, user);
    } else {
      logging.warn(`User ${name} failed to authenticate`);
      callback('Failed to authenticate', null);
    }
  } catch (error) {
    logging.error(error);
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
      logging.info(`User ${name} successfully validated`);
      const user = response.data.user;
      callback(null, user);
    } else {
      logging.warn(`User ${name} failed to validate`);
      callback('Failed to validate', null);
    }
  } catch (error) {
    logging.error(error);
    callback('Failed to validate', null);
  }
};
