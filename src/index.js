
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

//render only app, app contains all the routes and homepage call all of this

ReactDOM.render(<div>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  
  </div>
  , document.getElementById('root'));
  
