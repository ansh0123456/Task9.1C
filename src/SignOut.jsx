
import React from "react";
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <h1>Sign Out</h1>
      <p>Click the button below to sign out:</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;
