

import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";

import './Login.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { signInWithGooglePopup, createUserDocFromAuth } from "./firebase";

import { useNavigate } from 'react-router-dom';
import { createUserDocInFirestore } from "./firebase";

const Login = (props) => {
  const navigate = useNavigate();

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
    navigate('/');
  }
  const [errorMessage, setErrorMessage] = useState('');

  const [contact, setContact] = useState({
    username: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  const handleLogin = async () => {
    try {
      if(contact.username === "" || contact.password==="")
      {
        alert("ENTER THE CREDENTIALS")
      }
      else{
        const auth = getAuth();
        const res= await signInWithEmailAndPassword(auth, contact.username, contact.password)
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(error.message)
          return;
        });
        if(res === undefined)
        {
          alert("enter crredential")
          return navigate('/login')
          
        }
        else{

          
          console.log('Tying to Log in user:', contact.username);
          
          navigate('/signout');
        }
      }
    }
       catch (error) {
        console.log(error);
       }
    }
  

  return (
    <div>
      <div className="signin-container">
        <h5 style={{ color: "blue" }}>
          <Link to="/registration">Sign Up</Link>
        </h5>
        <h1>Log In</h1>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <input
          name="username"
          type="email"
          placeholder="Email"
          value={contact.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={contact.password}
          onChange={handleChange}
        />
        <loginbutton type='submit' onClick={handleLogin}>
        <Link to="/signout">Log In</Link>
        </loginbutton>
        {/* Add a link to the SignOut component */}
      </div>
    </div>
  );
}

export default Login;
