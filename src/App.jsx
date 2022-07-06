import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from'./components/pages/Home';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar  />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/services" element={<div>Coucou !</div>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
