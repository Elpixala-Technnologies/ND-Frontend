import React, { useEffect, useState } from "react";
import { createContext } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import app from "../Firebase/Firebase"; 
import Swal from "sweetalert2";
export const AuthContext = createContext();
const auth = getAuth(app);

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign Up
  // const signUp = (email, password) => {
  //   setLoading(true);
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };



  const updateUserDetails = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  // Sign In
  // const signIn = (email, password) => {
  //   setLoading(true);
  //   return signInWithEmailAndPassword(auth, email, password);
  // };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        // Email not verified, display a message and sign out the user
        signOut(auth); // Make sure to import signOut from Firebase auth
        Swal.fire({
          icon: 'error',
          title: 'Email Not Verified',
          text: 'Please verify your email before logging in.',
        });
        throw new Error('Email not verified');
      }
      // Email is verified, proceed with login
      setUser(userCredential.user);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };
  

  // Sign Out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };
 
  const signUp = async (email, password) => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Send verification email after signing up
   
    sendEmailVerification(userCredential.user)
      .then(() => {
        console.log("Verification email sent.");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // watch user state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  const userInfo = {
    signUp,
    signIn,
    logOut,
    setError,
    error,
    loading,
    updateUserDetails,
    signInWithGoogle,
    user,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;

