import auth, { signInWithPopup } from 'firebase/auth';
import firebaseServices from '../config/firebase';

export const SignInWithSocial = (provider: auth.AuthProvider) => signInWithPopup(firebaseServices.auth, provider);
