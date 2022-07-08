import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from'./components/pages/Home';
import AllNetworkServers from './components/pages/AllNetworkServers';
import AllGateways from './components/pages/AllGateways';
import AllOrganizations from './components/pages/AllOrganizations';
import AllUsers from './components/pages/AllUsers';
import AllApiKeys from './components/pages/AllApiKeys';
import AddUser from './components/pages/AddUser';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar  />
        <Routes>
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="/network-servers" element={<AllNetworkServers/>}/>
          <Route path="/gateways" element={<AllGateways/>}/>
          <Route path="/organizations" element={<AllOrganizations/>}/>
          <Route path="/users" element={<AllUsers/>}/>
          <Route path="/api-keys" element={<AllApiKeys/>}/>
          <Route path="/add-user" element={<AddUser/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
