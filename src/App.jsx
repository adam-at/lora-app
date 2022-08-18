import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "leaflet/dist/leaflet.css";
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
import Search from './components/pages/Search.jsx';
import OrganizationUsers from './components/pages/OrganizationUsers';
import OrganizationApiKeys from './components/pages/OrganizationApiKeys';
import OrganizationServiceProfiles from './components/pages/OrganizationServiceProfiles';
import OrganizationDeviceProfiles from './components/pages/OrganizationDeviceProfiles';
import OrganizationGateways from './components/pages/OrganizationGateways';
import OrganizationApplications from './components/pages/OrganizationApplications';
import AddOrganizationUser from './components/pages/AddOrganizationUser';
import AddOrganizationApiKey from './components/pages/AddOrganizationApiKey';
import Login from './components/pages/Login';
import UserProfile from "./components/UserProfile";
import UpdateOrganizationUser from './components/pages/UpdateOrganizationUser';
import AddOrganizationServiceProfile from './components/pages/AddOrganizationServiceProfile';
import UpdateOrganizationServiceProfile from './components/pages/UpdateOrganizationServiceProfile';
import AddOrganizationApplication from './components/pages/AddOrganizationApplication';
import AddOrganizationDeviceProfile from './components/pages/AddOrganizationDeviceProfile';
import UpdateOrganizationDeviceProfile from './components/pages/UpdateOrganizationDeviceProfile';
import AddOrganizationGateway from './components/pages/AddOrganizationGateway';
import OrganizationGatewayDetails from './components/pages/OrganizationGatewayDetails';
import OrganizationApplicationDetails from './components/pages/OrganizationApplicationDetails';
import AddDevice from './components/pages/AddDevice';

function App() {


  //reset the session after 1 hour
  var hours = 1;
  var now = new Date().getTime();
  var setupTime = localStorage.getItem('setupTime');
  if (setupTime == null) {
      localStorage.setItem('setupTime', now)
  } else {
      if(now-setupTime > hours*60*60*1000) {
          localStorage.clear()
          localStorage.setItem('setupTime', now);
      }
  }

  const user = UserProfile.getUser();
  if(!user){
    return(
    <Login/>
    )
  }



  return (
    <>
        <Navbar/>
        <Routes>
          <Route exact path="/dashboard" element={<Home/>} />
          <Route path="*" element={<Home />} />
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
          <Route path="/users/:id/password" element={<UpdatePassword/>}/>
          <Route path="/users/:id" element={<UpdateUser/>}/>
          <Route path="/network-servers/:id" element={<UpdateNetworkServer/>}/>
          <Route path="/gateway-profiles/:id" element={<UpdateGateway/>}/>
          <Route path="/organizations/:id" forceRefresh={true} element={<OrganizationDetails/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/organizations/:id/users" element={<OrganizationUsers/>}/>
          <Route path="/organizations/:id/api-keys" element={<OrganizationApiKeys/>}/>
          <Route path="/organizations/:id/service-profiles" element={<OrganizationServiceProfiles/>}/>
          <Route path="/organizations/:id/device-profiles" element={<OrganizationDeviceProfiles/>}/>
          <Route path="/organizations/:id/gateways" element={<OrganizationGateways/>}/>
          <Route path="/organizations/:id/applications" element={<OrganizationApplications/>}/>
          <Route path="/organizations/:id/applications/:id" element={<OrganizationApplicationDetails/>}/>
          <Route path="/organizations/:id/users/add-user" element={<AddOrganizationUser/>}/>
          <Route path="/organizations/:id/api-keys/add-api-key" element={<AddOrganizationApiKey/>}/>
          <Route path="/organizations/:id/users/:id" element={<UpdateOrganizationUser/>}/>
          <Route path="/organizations/:id/service-profiles/add" element={<AddOrganizationServiceProfile/>}/>
          <Route path="/organizations/:id/service-profiles/:id" element={<UpdateOrganizationServiceProfile/>}/>
          <Route path="/organizations/:id/applications/add" element={<AddOrganizationApplication/>}/>
          <Route path="/organizations/:id/device-profiles/add" element={<AddOrganizationDeviceProfile/>}/>
          <Route path="/organizations/:id/device-profiles/:id" element={<UpdateOrganizationDeviceProfile/>}/>
          <Route path="/organizations/:id/gateways/add" element={<AddOrganizationGateway/>}/>
          <Route path="/organizations/:id/gateways/:id" element={<OrganizationGatewayDetails/>}/>
          <Route path="/organizations/:id/applications/:id/devices/add" element={<AddDevice/>}/>
          
        </Routes>
        </>
  );
}

export default App;
