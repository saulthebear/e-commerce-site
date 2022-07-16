import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  connectAuthEmulator,
} from 'firebase/auth';
import config from './config';

// Initialize Firebase
const firebaseApp = initializeApp(config.firebase);

const providers = {
  google: new GoogleAuthProvider(),
};

// Initialize Firebase Auth and get a reference to the auth service
const auth = getAuth(firebaseApp);
// TODO: Remove this line for production
connectAuthEmulator(auth, 'http://localhost:9099');

const firebaseServices = {
  firebaseApp,
  providers,
  auth,
};

export default firebaseServices;
