// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

 
const firebaseConfig = {
  apiKey: "AIzaSyD26fcHj28Mjlz2316pbQ8lvmd1YdQ3cEg",
  authDomain: "netflixclone-7b6c2.firebaseapp.com",
  projectId: "netflixclone-7b6c2",
  storageBucket: "netflixclone-7b6c2.appspot.com",  
  messagingSenderId: "690124170971",
  appId: "1:690124170971:web:b0b0a190367ddf1b8d4efe",
  measurementId: "G-SJ18L3KMSK"
};
 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

 
export const signup = (name, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};
