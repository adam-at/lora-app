import React, { useState, useEffect } from "react";
import { Paper, FormControl, InputLabel, Grid, Input, FormHelperText, MenuItem, Button, Select} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import "../../css/Form.css";

import {key} from "../../jwt";
import UserProfile from "../../Users/UserProfile";

function AddOrganizationApplication() {
  const path = window.location.pathname.split('/');

  const org = UserProfile.getOrganizationFromId(path[2]);
  const orgAdmin = org && org.isAdmin;
  

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serviceProfileId, setServiceProfileId] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const [application, setApplication] = useState(
    {
        "application": {
          "description": "",
          "name": "",
          "organizationID": "",
          "serviceProfileID": ""
        }
      }
  );

  const [data, getData] = useState([]);
    const URLservice = "http://203.162.235.53:8080/api/service-profiles?limit=1000&organizationID="+path[2];
    const header ={
        headers: {
          Accept: "application/json",
          "Grpc-Metadata-Authorization": key
        }
      }
 
    useEffect(() => {
      if(orgAdmin){
        fetchData();
        setOrganizationId(path[2]);
      }
          }, [])
 
 
    const fetchData = () => {
        fetch(URLservice, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                getData(response.result);
            })
 
    }

  const URL = "http://203.162.235.53:8080/api/applications";
  
    
 
 
    const postData = (app) => {
      const strApp = JSON.stringify(app);
      const header ={
        body: strApp,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Grpc-Metadata-Authorization": key
        },
        method: "POST"
      };
        fetch(URL, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                if(response.error){
                  alert(response.error);
                }else{
                navigateToApps();
                }
            })
 
    };



const navigate = useNavigate();
const navigateToApps = () => {
  //  navigate to /applications
  navigate("/organizations/"+path[2]+"/applications");
};

const handleAppSubmit = () => {
  const new_app = application;
  new_app["application"]["name"] = name;
  new_app["application"]["description"] = description;
  new_app["application"]["serviceProfileID"] = serviceProfileId;
  new_app["application"]["organizationID"] = organizationId;
  setApplication(new_app);
  console.log(application);

  postData(application);

  /* if error 400 stay on the same page with an error alert, else go go to /users*/ 
}

if(orgAdmin){
  return (
    <section className="home">
      <div className="title text"> <b> Add a new application</b></div>
      <Paper elevation={6} className="form dark-if-needed">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Application name</InputLabel>
              <Input
                required
                id="app-name"
                type="text"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormHelperText variant="standard">The name may only contain words, numbers and dashes.</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Application description</InputLabel>
              <Input
                required
                id="app-name"
                type="text"
                value={description}
                fullWidth
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '95%'}}>
            <InputLabel variant="standard" required>Service profile</InputLabel>
            <Select
              required
              id="service-id"
              variant="standard"
              value={serviceProfileId}
              fullWidth
              onChange={(e) => setServiceProfileId(e.target.value)}
            >
              {data.map((service,index) => 
                <MenuItem key={index} value={service.id}>{service.name}</MenuItem>
              )}
            </Select>
            <FormHelperText variant="standard">The service-profile to which this application will be attached. Note that you can't change this value after the application has been created.</FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={5}></Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleAppSubmit}> Add application </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToApps}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
    </section>
  )
  }else{
    return(<></>)
  }
}

export default AddOrganizationApplication;
