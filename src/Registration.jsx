
import React, { useState } from 'react';
import './Registration.css';
import 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';

const Registration = (props) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Add successMessage state
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const { displayName, email, password, confirmPassword } = contact;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContact((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    }

    const handleRegistration = async (event) => {
        event.preventDefault();
        if (contact.password !== contact.confirmPassword) {
            setErrorMessage('Passwords do not match!');
            setSuccessMessage(''); // Clear successMessage if there's an error
        } else {
            setErrorMessage('');
            try {
                const usernamePassword = await firebase.auth().createUserWithEmailAndPassword(contact.email, contact.password);
                const user = usernamePassword.user;

                const db = firebase.firestore();
                const usersCollection = db.collection('users');
                
                await usersCollection.doc(user.uid).set({
                    email: user.email,
                });

                setSuccessMessage('Registration successful!'); // Set success message
                navigate('/Login');
            } catch (error) {
                console.error('Error creating user:', error);
                setErrorMessage('Error creating user account.');
                setSuccessMessage('');
            }
        }
    };

    return (
        <div className="signup-container">
            <h1>Create a DEV@DEAKIN Account</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form>
                <input
                    name="displayName"
                    type="text"
                    placeholder="Name"
                    value={contact.displayName}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={contact.email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={contact.password}
                    onChange={handleChange}
                />
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={contact.confirmPassword}
                    onChange={handleChange}
                />
                <button type="button" onClick={handleRegistration}>Sign Up</button>
            </form>
        </div>
    );
}

export default Registration;
