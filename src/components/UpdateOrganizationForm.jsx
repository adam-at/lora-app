import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import React from 'react';
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Input from '@mui/material/Input';
import "./Form.css";
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import {key} from "./jwt";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.jsx";
import {proxy} from "./Proxy";

import UserProfile from "./UserProfile";

function UpdateOrganizationForm() {
  const path = window.location.pathname.split('/');

  const userOrg = UserProfile.getOrganizationFromId(path[2]);
  const orgAdmin = userOrg && userOrg.isAdmin;

  const user = JSON.parse(localStorage.getItem("user"));
  const admin = user.isAdmin;

  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [canHaveGateways, setCanHaveGateways] = useState(false);
  const [maxDevices, setMaxDevices] = useState(0);
  const [maxGateways, setMaxGateways] = useState(0);
  const [organization, setOrganization] = useState({
    "organization": {
      "canHaveGateways": false,
      "displayName": "",
      "id": "0",
      "maxDeviceCount": 0,
      "maxGatewayCount": 0,
      "name": ""
    }
  });



  const changeCanHaveGateways = () => {
    setCanHaveGateways(!canHaveGateways);
  }

  useEffect( () => {
    console.log(canHaveGateways);
}, [canHaveGateways]);

const navigate = useNavigate();
const navigateToOrganizations = () => {
  navigate('/organizations');
};

const URL = proxy + "http://203.162.235.53:8080/api"+window.location.pathname;
    
 
 
  const fetchData = () => {
      const header ={
        headers: {
          Accept: "application/json",
          "Grpc-Metadata-Authorization": key 
        },
        method: "GET"
      };
        fetch(URL, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                if(response.error){
                  alert(response.error);
                }else{
                const res = response.organization;
                setName(res.name);
                setDisplayName(res.displayName);
                setCanHaveGateways(res.canHaveGateways);
                setMaxDevices(res.maxDeviceCount);
                setMaxGateways(res.maxGatewayCount);

                }
            })
 
    };

  useEffect(() => {
    fetchData();
  }, []);

  const org = localStorage.getItem("selectedOrganization");
    useEffect(() => {
        fetchData()
    }, [org]);

    const updateData= (organization) => {
      const strOrganization = JSON.stringify(organization);
        const header ={
          body: strOrganization,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Grpc-Metadata-Authorization": key
          },
          method: "PUT"
        };
          fetch(URL, header)
              .then((res) =>
                  res.json())
   
              .then((response) => {
                  console.log(response);
                  if(response.error){
                    alert(response.error);
                  }else{
                  navigateToOrganizations();
                  }
              })
   
      };

    const deleteData = () => {
      const header ={
        headers: {
          Accept: "application/json",
          "Grpc-Metadata-Authorization": key
        },
        method: "DELETE"
      };
        fetch(URL, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                if(response.error){
                  alert(response.error);
                }else{
                navigateToOrganizations();
                alert("Organization deleted !")
                }
            })
    };


const handleOrganizationUpdate= () => {
  const new_organization = organization;
  new_organization["organization"]["canHaveGateways"]= canHaveGateways;
  new_organization["organization"]["name"]=name;
  new_organization["organization"]["displayName"]=displayName;
  new_organization["organization"]["maxDeviceCount"]=maxDevices;
  new_organization["organization"]["maxGatewayCount"]=maxGateways;
  setOrganization(new_organization);
  console.log(organization);

  updateData(organization);

  /* if error 400 stay on the same page with an error alert, else go go to /organizations*/ 
}
useEffect( () => {
  console.log(organization);
}, [organization]);

  return (
      <Paper elevation={6} className="form-with-tabs dark-if-needed">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}} disabled={!orgAdmin}>
              <InputLabel htmlFor="standard-adornment-password" variant="standard" required>Organization name</InputLabel>
              <Input
                required
                id="name"
                type="text"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText variant="standard">Characters allowed: letters, numbers, dashes.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}} disabled={!orgAdmin}>
              <InputLabel htmlFor="standard-adornment-password" variant="standard" required>Display Name</InputLabel>
              <Input
                id="display-name"
                type="text"
                value={displayName}
                fullWidth
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </FormControl>
          </Grid>

          {admin  && (
            <>
                      <Grid item xs={12}>
            <label className="subtitle-text">Gateways:</label>
          </Grid>
            <FormControlLabel
              control={<Checkbox color="primary" name="canHaveGateways" checked={canHaveGateways} value={canHaveGateways} onChange={changeCanHaveGateways} />}
              label="Can have gateways" className="text"
            />
              <FormControl sx={{ ml: 4, width: '95%'}}>
                <FormHelperText variant="standard">When checked, it means that organization administrators are able to add their own gateways to the network. Note that the usage of the gateways is not limited to this organization.</FormHelperText>
              </FormControl>

              {canHaveGateways && (
                <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '95%'}}>
                  <InputLabel variant="standard" required>Maximum number of gateways</InputLabel>
                  <Input
                    required
                    id="max-gateways"
                    type="number"
                    value={maxGateways}
                    fullWidth
                    onChange={(e) => setMaxGateways(e.target.value)}
                  />
                  <FormHelperText variant="standard">The maximum number of gateways that can be added to this organization (0 = unlimited).</FormHelperText>
                </FormControl>
              </Grid>
              )}

          <Grid item xs={12}>
            <label className="subtitle-text">Devices:</label>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Maximum number of devices</InputLabel>
              <Input
                required
                id="max-devices"
                type="number"
                value={maxDevices}
                fullWidth
                onChange={(e) => setMaxDevices(e.target.value)}
              />
              <FormHelperText variant="standard">The maximum number of devices that can be added to this organization (0 = unlimited).</FormHelperText>
            </FormControl>
          </Grid>
            </>
          )}

          {orgAdmin && (
            <>
              <Grid item xs={12} sm={5}><DeleteConfirmationDialog fun={deleteData} name="organization"/></Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" onClick={handleOrganizationUpdate}> Update Organization </Button>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button variant="contained" onClick={navigateToOrganizations}> Cancel </Button>
              </Grid>
            </>
          )}
   
        </Grid>        
      </Paper>
  )
}

export default UpdateOrganizationForm
