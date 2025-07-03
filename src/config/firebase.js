import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAMoWYuPh0sc6TwdYH4f57s6Z-GMYJFSmU",
  authDomain: "gameplan-3f1ef.firebaseapp.com",
  projectId: "gameplan-3f1ef",
  storageBucket: "gameplan-3f1ef.firebasestorage.app",
  messagingSenderId: "1046382404349",
  appId: "1:1046382404349:web:d9325135335f3b29ecd494"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

// Configure providers
googleProvider.addScope('email');
googleProvider.addScope('profile');

facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

appleProvider.addScope('email');
appleProvider.addScope('name');

export default app;