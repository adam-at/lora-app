import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from'./components/pages/Home';
import AllNetworkServers from './components/pages/AllNetworkServers';
import AllGateways from './components/pages/AllGateways';
import AllOrganizations from './components/pages/AllOrganizations';
import AllUsers from './components/pages/AllUsers';
import AllApiKeys from './components/pages/AllApiKeys';
import AddUser from './components/pages/AddUser';
import AddGateway from './components/pages/AddGateway';
import AddApiKey from './components/pages/AddApiKey';
import AddNetworkServer from './components/pages/AddNetworkServer';
import AddOrganization from './components/pages/AddOrganization';
import UpdatePassword from './components/pages/UpdatePassword';
import UpdateUser from './components/pages/UpdateUser';
import UpdateNetworkServer from './components/pages/UpdateNetworkServer';
import UpdateGateway from './components/pages/UpdateGateway';
import OrganizationDetails from './components/pages/OrganizationDetails';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar  />
        <Routes>
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="*" exact element={<Home />} />
          <Route path="/network-servers" element={<AllNetworkServers/>}/>
          <Route path="/gateway-profiles" element={<AllGateways/>}/>
          <Route path="/organizations" element={<AllOrganizations/>}/>
          <Route path="/users" element={<AllUsers/>}/>
          <Route path="/api-keys" element={<AllApiKeys/>}/>
          <Route path="/add-user" element={<AddUser/>}/>
          <Route path="/add-gateway" element={<AddGateway/>}/>
          <Route path="/add-api-key" element={<AddApiKey/>}/>
          <Route path="/add-network-server" element={<AddNetworkServer/>}/>
          <Route path="/add-organization" element={<AddOrganization/>}/>
          <Route path="/password" element={<UpdatePassword/>}/>
          <Route path="/users/*" element={<UpdateUser/>}/>
          <Route path="/network-servers/*" element={<UpdateNetworkServer/>}/>
          <Route path="/gateway-profiles/*" element={<UpdateGateway/>}/>
          <Route path="/organizations/*" element={<OrganizationDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
