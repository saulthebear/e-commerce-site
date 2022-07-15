import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import config from './config';

// Initialize Firebase
const firebaseApp = initializeApp(config.firebase);

const providers = {
  google: new GoogleAuthProvider(),
};

// Initialize Firebase Auth and get a reference to the auth service
const auth = getAuth(firebaseApp);

const firebaseServices = {
  firebaseApp,
  providers,
  auth,
};

export default firebaseServices;
