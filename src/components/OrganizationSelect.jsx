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

function OrganizationSelect(){
    const [organization, setOrganization] = React.useState(0);

    const [data, setData] = useState([]);
    const [firstData, setFirstData] = useState(
      {
        "id": "",
        "name": "",
        "displayName": "",
        "canHaveGateways": true,
        "createdAt": "",
        "updatedAt": ""
    }
);

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

      useEffect(() => {
        setOrganization(firstData.id);
        console.log(organization);
    }, [firstData])
   
   
      const fetchServerData = () => {
          fetch(URL, header)
              .then((res) =>
                  res.json())
   
              .then((response) => {
                  console.log(response.result);
                  setData(response.result);
                  setFirstData(response.result[0]);
                  
              })
   
      };


    

    return(
      <>
      <li className="nav-link">
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Organization</InputLabel>
        <Select
          value={organization}
          label="Organization"
          onChange={(e)=>setOrganization(e.target.value)}
        >
            {data.map((server,index) => 
                <MenuItem key={index} value={server.id}>{server.name}</MenuItem>
            )}
        </Select>
      </FormControl>
      </li>

      <li className="nav-link">
        <a href={`/organizations/${organization}`}>
            <FontAwesomeIcon icon={solid("house")} className="ficon icon-grid"></FontAwesomeIcon>
        </a>
        <a href={`/organizations/${organization}/users`}>
            <FontAwesomeIcon icon={solid("user")} className="ficon icon-grid"/>
        </a>
        <a href={`/organizations/${organization}/api-keys`}>
            <FontAwesomeIcon icon={solid("key")} className="ficon icon-grid"/>
        </a>
      </li>

      <li className="nav-link">
        <a href={`/organizations/${organization}/service-profiles`}>
            <FontAwesomeIcon icon={solid("address-card")} className="ficon icon-grid"></FontAwesomeIcon>
        </a>
        <a href={`/organizations/${organization}/device-profiles`}>
        <FontAwesomeIcon icon={solid("sliders")} className="ficon icon-grid"/>
        </a>
        <a href={`/organizations/${organization}/gateways`}>
        <FontAwesomeIcon icon={solid("tower-cell")} className="ficon icon-grid"/>
        </a>
      </li>
      
      <li className="nav-link-icon">
        <a href={`/organizations/${organization}/applications`}>
            <FontAwesomeIcon icon={solid("shapes")} className="ficon icon-grid"></FontAwesomeIcon>
        </a>
      </li>
      </>
    );
}

export default OrganizationSelect;