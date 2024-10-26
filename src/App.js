
import React from 'react'
import './index.css';
import './App.css';
import NavigationBar from './NavigationBar'; 
import LoginPage from './Login';
import RegistrationPage from './Registration';
import { Routes, Route } from 'react-router-dom';
import SignOut from "./SignOut"; 
function App() {
    return (
        <>
        <Routes>
        <Route element={<NavigationBar />}> 
        <Route path='/' element={<></>}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path='registration' element={<RegistrationPage />} />
        </Route>
        </Routes>
        </> 
    );
}

export default App;
