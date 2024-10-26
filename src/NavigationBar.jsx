
import React from 'react'
import './App.css'

import { Outlet, Link } from 'react-router-dom';

function NavigationBar() {
    return <div>
        <div class="topnav">
            {/* <logo>
                <img src = {require("./Images/Logo.png")} alt="logo" width={150} height={50} />
            </logo> */}
            <a className="logo" href="#home"><Link to='/'>DEV@DEAKIN</Link></a>
             <input type="text" className="search-bar" placeholder="Search..." />
            <a className="option" href="#login"><Link to='login'>POST</Link></a>
            <a className="option" href="#login"><Link to='login'>LOGIN</Link></a>
            
        <Outlet />  
    </div>
    </div>
}   
export default NavigationBar;
