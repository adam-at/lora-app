import React, { useState, useEffect } from "react";
import { Paper, FormControl, InputLabel, Grid, Input, Button, FormHelperText} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import "../css/Form.css";

import {key} from "../jwt";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog.jsx";
import UserProfile from "../Users/UserProfile";

function UpdateOrganizationApplicationForm() {
  const path = window.location.pathname.split('/');

  const org = UserProfile.getOrganizationFromId(path[2]);
  const orgAdmin = org && org.isAdmin;
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serviceProfileId, setServiceProfileId] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [id, setId] = useState("");

  const [application, setApplication] = useState(
    {
        "application": {
          "description": "",
          "id": "",
          "name": "",
          "organizationID": "",
          "serviceProfileID": ""
        }
      }
  );

  const URL = "http://203.162.235.53:8080/api/applications/"+path[path.length-1];
    const header ={
        headers: {
          Accept: "application/json",
          "Grpc-Metadata-Authorization": key
        }
      }
 
    useEffect(() => {
        fetchData();
          }, [])
 
 
    const fetchData = () => {
        fetch(URL, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                const app = response.application;
                setName(app.name);
                setDescription(app.description);
                setId(app.id);
                setOrganizationId(app.organizationID);
                setServiceProfileId(app.serviceProfileID);
            })
 
    }

  
    
 
 
    const updateData = (app) => {
      const strApp = JSON.stringify(app);
      const header ={
        body: strApp,
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
                navigateToApps();
                }
            })
 
    };



const navigate = useNavigate();
const navigateToApps = () => {
  //  navigate to /applications
  navigate("/organizations/"+path[2]+"/applications");
};

const handleAppUpdate = () => {
  const updated_app = application;
  updated_app["application"]["name"] = name;
  updated_app["application"]["id"] = id;
  updated_app["application"]["description"] = description;
  updated_app["application"]["serviceProfileID"] = serviceProfileId;
  updated_app["application"]["organizationID"] = organizationId;
  setApplication(updated_app);
  console.log(application);

  updateData(application);

  /* if error 400 stay on the same page with an error alert, else go go to /users*/ 
}

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
            navigateToApps();
            alert("Application deleted !")
            }
        })
};

  return (
      <Paper elevation={6} className="form-with-tabs dark-if-needed">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}} disabled={!orgAdmin}>
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
            <FormControl sx={{ m: 1, width: '95%'}} disabled={!orgAdmin}>
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
          
          {orgAdmin && (
            <>
              <Grid item xs={12} sm={5}><DeleteConfirmationDialog fun={deleteData} name="application"/></Grid>
              <Grid item xs={12} sm={6}>
                <Button variant="contained" onClick={handleAppUpdate}> Update application </Button>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button variant="contained" onClick={navigateToApps}> Cancel </Button>
              </Grid>
            </>
          )}

        </Grid>        
      </Paper>
  )
}

export default UpdateOrganizationApplicationForm;
