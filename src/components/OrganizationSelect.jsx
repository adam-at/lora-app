import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import {key} from "./jwt";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';


function OrganizationSelect(){
    const [organization, setOrganization] = useState(localStorage.getItem("selectedOrganization"));

    const [data, setData] = useState([]);

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
                  console.log(response.result);
                  if(response.error){
                    alert(response.error);
                  }else{
                    setData(response.result);
                  }
              })
   
      };


    const handleOrganizationChange = (e) => {
        setOrganization(e.target.value);
        localStorage.setItem("selectedOrganization", organization);
        console.log(localStorage.getItem("selectedOrganization"));
    }

    useEffect(() => {
      navigate("/organizations/"+organization);;
  }, [organization])

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
    );
}

export default OrganizationSelect;