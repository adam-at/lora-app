import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className='App'>
    <Router>
        <App/>
    </Router>
    </div>
);



