import { useState } from 'react';
import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { auth, googleProvider, facebookProvider, appleProvider } from '../config/firebase';
import { setUser, setToken, setCurrentStep } from '../features/authSlice';

export const useFirebaseAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSocialLogin = async (provider, providerName) => {
    setIsLoading(true);
    setError(null);

    try {
      let result;
      
      // Use popup for desktop, redirect for mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile && providerName === 'apple') {
        // Apple sign-in works better with redirect on mobile
        await signInWithRedirect(auth, provider);
        return; // The redirect will handle the rest
      } else {
        result = await signInWithPopup(auth, provider);
      }

      if (result && result.user) {
        const { user } = result;
        
        // Extract user information
        const userData = {
          id: user.uid,
          email: user.email,
          userName: user.displayName || user.email?.split('@')[0] || 'User',
          photoURL: user.photoURL,
          provider: providerName,
          emailVerified: user.emailVerified,
        };

        // Get Firebase ID token
        const idToken = await user.getIdToken();

        // Here you can send the Firebase token to your backend for verification
        // and get your own JWT token in return
        try {
          // Optional: Send Firebase token to your backend for verification
          const backendResponse = await fetch('https://alibackend.duckdns.org/authentication_app/firebase_auth/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firebase_token: idToken,
              provider: providerName,
              user_data: userData,
            }),
          });

          if (backendResponse.ok) {
            const backendData = await backendResponse.json();
            dispatch(setToken(backendData.token || idToken));
            dispatch(setUser({
              ...userData,
              ...backendData.user,
            }));
          } else {
            // Fallback: use Firebase token directly
            dispatch(setToken(idToken));
            dispatch(setUser(userData));
          }
        } catch (backendError) {
          console.warn('Backend verification failed, using Firebase token:', backendError);
          // Fallback: use Firebase token directly
          dispatch(setToken(idToken));
          dispatch(setUser(userData));
        }

        dispatch(setCurrentStep('dashboard'));
      }
    } catch (error) {
      console.error(`${providerName} sign-in error:`, error);
      
      let errorMessage = `${providerName} sign-in failed. Please try again.`;
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in was cancelled. Please try again.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup was blocked. Please allow popups and try again.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in was cancelled. Please try again.';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'An account already exists with this email using a different sign-in method.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.';
          break;
        default:
          if (error.message) {
            errorMessage = error.message;
          }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = () => handleSocialLogin(googleProvider, 'google');
  const signInWithFacebook = () => handleSocialLogin(facebookProvider, 'facebook');
  const signInWithApple = () => handleSocialLogin(appleProvider, 'apple');

  // Handle redirect result (for mobile Apple sign-in)
  const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result && result.user) {
        const { user } = result;
        
        const userData = {
          id: user.uid,
          email: user.email,
          userName: user.displayName || user.email?.split('@')[0] || 'User',
          photoURL: user.photoURL,
          provider: 'apple',
          emailVerified: user.emailVerified,
        };

        const idToken = await user.getIdToken();
        
        dispatch(setToken(idToken));
        dispatch(setUser(userData));
        dispatch(setCurrentStep('dashboard'));
      }
    } catch (error) {
      console.error('Redirect result error:', error);
      setError('Authentication failed. Please try again.');
    }
  };

  return {
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    handleRedirectResult,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};