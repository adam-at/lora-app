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
import AllNetworkServers from './components/pages/NetworkServers/AllNetworkServers';
import AllGateways from './components/pages/Gateways/AllGateways';
import AllOrganizations from './components/pages/Organizations/AllOrganizations';
import AllUsers from './components/pages/Users/AllUsers';
import AllApiKeys from './components/pages/APIKeys/AllApiKeys';
import AddUser from './components/pages/Users/AddUser';
import AddGateway from './components/pages/Gateways/AddGateway';
import AddApiKey from './components/pages/APIKeys/AddApiKey';
import AddNetworkServer from './components/pages/NetworkServers/AddNetworkServer';
import AddOrganization from './components/pages/Organizations/AddOrganization';
import UpdatePassword from './components/pages/Users/UpdatePassword';
import UpdateUser from './components/pages/Users/UpdateUser';
import UpdateNetworkServer from './components/pages/NetworkServers/UpdateNetworkServer';
import UpdateGateway from './components/pages/Gateways/UpdateGateway';
import OrganizationDetails from './components/pages/Organizations/OrganizationDetails';
import Search from './components/pages/Search.jsx';
import OrganizationUsers from './components/pages/Users/OrganizationUsers';
import OrganizationApiKeys from './components/pages/APIKeys/OrganizationApiKeys';
import OrganizationServiceProfiles from './components/pages/Services/OrganizationServiceProfiles';
import OrganizationDeviceProfiles from './components/pages/Devices/OrganizationDeviceProfiles';
import OrganizationGateways from './components/pages/Gateways/OrganizationGateways';
import OrganizationApplications from './components/pages/Applications/OrganizationApplications';
import AddOrganizationUser from './components/pages/Users/AddOrganizationUser';
import AddOrganizationApiKey from './components/pages/APIKeys/AddOrganizationApiKey';
import Login from './components/pages/Login';
import UserProfile from "./components/Users/UserProfile";
import UpdateOrganizationUser from './components/pages/Users/UpdateOrganizationUser';
import AddOrganizationServiceProfile from './components/pages/Services/AddOrganizationServiceProfile';
import UpdateOrganizationServiceProfile from './components/pages/Services/UpdateOrganizationServiceProfile';
import AddOrganizationApplication from './components/pages/Applications/AddOrganizationApplication';
import AddOrganizationDeviceProfile from './components/pages/Devices/AddOrganizationDeviceProfile';
import UpdateOrganizationDeviceProfile from './components/pages/Devices/UpdateOrganizationDeviceProfile';
import AddOrganizationGateway from './components/pages/Gateways/AddOrganizationGateway';
import OrganizationGatewayDetails from './components/pages/Gateways/OrganizationGatewayDetails';
import OrganizationApplicationDetails from './components/pages/Applications/OrganizationApplicationDetails';
import AddDevice from './components/pages/Devices/AddDevice';
import ApplicationDeviceDetails from './components/pages/Devices/ApplicationDeviceDetails';

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
          <Route path="/organizations/:id/applications/:id/devices/:id" element={<ApplicationDeviceDetails/>}/>
          
        </Routes>
        </>
  );
}

export default App;
