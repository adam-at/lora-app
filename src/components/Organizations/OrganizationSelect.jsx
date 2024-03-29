import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

import "../css/Navbar.css";

import {key} from "../jwt";
import UserProfile from "../Users/UserProfile";


function OrganizationSelect(){

  

  const [organization, setOrganization] = useState(localStorage.getItem("selectedOrganization"));
  const [org, setOrg] = useState(UserProfile.getOrganizationFromId(organization));


  const [data, setData] = useState([]);

  const [reload, setReload] = useState(false);

  const URL = "http://203.162.235.53:8080/api/organizations?limit=1000";
      const header ={
          headers: {
            Accept: "application/json",
            "Grpc-Metadata-Authorization": key 
          }
        }
   
      useEffect(() => {
          fetchServerData();
      }, [])

   
   
      const fetchServerData = () => {
          fetch(URL, header)
              .then((res) =>
                  res.json())
   
              .then((response) => {
                  if(response.error){
                    alert(response.error);
                  }else{
                    setData(response.result);
                  }
              })
   
      };


    const handleOrganizationChange = (e) => {
        localStorage.setItem("selectedOrganization", e.target.value);
        setOrganization(e.target.value);
        setOrg(UserProfile.getOrganizationFromId(e.target.value.id));
        console.log(localStorage.getItem("selectedOrganization"));
        setReload(true);
    }

    useEffect(() => {
      navigate("/organizations/"+organization);
  }, [organization]);

  useEffect(() => {
    if(reload){
      setReload(false);
      window.location.reload(false);
    }
}, [reload]);


    const navigate = useNavigate();
    
      const navigateToOrganizationDashboard = () => {
        navigate("/organizations/"+organization);
    }
    
    const navigateToOrganizationUsers = () => {
        navigate("/organizations/"+organization+"/users");
    }
    
    const navigateToOrganizationGateways = () => {
        navigate("/organizations/"+organization+"/gateways")
    }
    
    const navigateToOrganizationServices = () => {
        navigate("/organizations/"+organization+"/service-profiles")
    }
    
    const navigateToOrganizationDevices = () => {
        navigate("/organizations/"+organization+"/device-profiles")
    }
    
    const navigateToOrganizationApiKeys = () => {
        navigate("/organizations/"+organization+"/api-keys")
    }

    const navigateToOrganizationApplications = () => {
      navigate("/organizations/"+organization+"/applications")
  }

  const user = UserProfile.getUser();
  const admin = user.isAdmin;
    

    return(
      <>
      <li className="nav-link">
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" className="select-organization">Organization</InputLabel>
        <Select
          value={organization}
          label="Organization"
          onChange={(e)=>handleOrganizationChange(e)}
          className="select-organization"
        >
            {data.map((server,index) => 
                <MenuItem key={index} value={server.id}>{server.name}</MenuItem>
            )}
        </Select>
      </FormControl>
      </li>

      {admin && (
        <>
        <li className="nav-link">
        <Link onClick={navigateToOrganizationDashboard}>
            <FontAwesomeIcon icon={solid("house")} className="ficon icon-grid"></FontAwesomeIcon>
        </Link>
        <Link onClick={navigateToOrganizationUsers}>
            <FontAwesomeIcon icon={solid("user")} className="ficon icon-grid"/>
        </Link>
        <Link onClick={navigateToOrganizationApiKeys}>
            <FontAwesomeIcon icon={solid("key")} className="ficon icon-grid"/>
        </Link>
      </li>

      <li className="nav-link">
        <Link onClick={navigateToOrganizationServices}>
            <FontAwesomeIcon icon={solid("address-card")} className="ficon icon-grid"></FontAwesomeIcon>
        </Link>
        <Link onClick={navigateToOrganizationDevices}>
        <FontAwesomeIcon icon={solid("sliders")} className="ficon icon-grid"/>
        </Link>
        <Link onClick={navigateToOrganizationGateways}>
        <FontAwesomeIcon icon={solid("tower-cell")} className="ficon icon-grid"/>
        </Link>
      </li>
      
      <li className="nav-link nav-link-icon">
        <Link onClick={navigateToOrganizationApplications}>
            <FontAwesomeIcon icon={solid("shapes")} className="ficon icon-grid"></FontAwesomeIcon>
        </Link>
      </li>
      </>
      )}

      {!admin && (
                <>


                <li className="nav-link">
                <Link onClick={navigateToOrganizationDashboard}>
                    <FontAwesomeIcon icon={solid("house")} className="ficon"></FontAwesomeIcon>
                    <span className="text nav-text">Org. Dashboard</span>
                </Link>
                </li>

              {org.isAdmin &&(
                <>
                <li className="nav-link">
                <Link onClick={navigateToOrganizationUsers}>
                    <FontAwesomeIcon icon={solid("user")} className="ficon"/>
                    <span className="text nav-text">Org. Users</span>
                </Link>
                </li>

                <li className="nav-link">
                <Link onClick={navigateToOrganizationApiKeys}>
                    <FontAwesomeIcon icon={solid("key")} className="ficon"/>
                    <span className="text nav-text">Org. API Keys</span>
                </Link>
              </li>
              </>
              )}
                
              <li className="nav-link">
                <Link onClick={navigateToOrganizationServices}>
                    <FontAwesomeIcon icon={solid("address-card")} className="ficon"></FontAwesomeIcon>
                    <span className="text nav-text">Service Profiles</span>
                </Link>
                </li>

                <li className="nav-link">
                <Link onClick={navigateToOrganizationDevices}>
                <FontAwesomeIcon icon={solid("sliders")} className="ficon"/>
                <span className="text nav-text">Device Profiles</span>
                </Link>
                </li>

                <li className="nav-link">
                <Link onClick={navigateToOrganizationGateways}>
                <FontAwesomeIcon icon={solid("tower-cell")} className="ficon"/>
                <span className="text nav-text">Org. Gateways</span>
                </Link>
              </li>
              
              <li className="nav-link">
                <Link onClick={navigateToOrganizationApplications}>
                    <FontAwesomeIcon icon={solid("shapes")} className="ficon"></FontAwesomeIcon>
                    <span className="text nav-text">Org. Applications</span>
                </Link>
              </li>
              </>
      )}
      </>
    );
}

export default OrganizationSelect;