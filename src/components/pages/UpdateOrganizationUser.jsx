import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Input from '@mui/material/Input';
import "../Form.css";
import { useNavigate } from 'react-router-dom';
import {key} from "../jwt";
import FormHelperText from '@mui/material/FormHelperText';

function AddOrganizationUser() {
  const [email, setEmail] = useState("");
  const [isDeviceAdmin, setDeviceAdmin] = useState(false);
  const [isGatewayAdmin, setGatewayAdmin] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const [organizationUser, setOrganizationUser] = useState(
    {
      "organizationUser": {
        "email": "",
        "isDeviceAdmin": false,
        "isGatewayAdmin": false,
        "isAdmin": false
      }
    }
  );

  const URL = "http://203.162.235.53:8080/api"+window.location.pathname.substring(0,window.location.pathname.length-9);
    
 
 
    const postData = (user) => {
      const strUser = JSON.stringify(user);
      const header ={
        body: strUser,
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
                navigateToUsers();
                }
            })
 
    };


  const changeGatewayAdmin = () => {
    setGatewayAdmin(!isGatewayAdmin);
  }

  const changeDeviceAdmin = () => {
    setDeviceAdmin(!isDeviceAdmin);
  }

  const changeAdmin = () => {
    setAdmin(!isAdmin);
  }


const navigate = useNavigate();
const navigateToUsers = () => {
  //  navigate to /users
  navigate(window.location.pathname.substring(0,window.location.pathname.length-9));
};

const handleUserSubmit = () => {
  const new_user = organizationUser;
  new_user["organizationUser"]["email"] = email;
  new_user["organizationUser"]["isAdmin"] = isAdmin;
  new_user["organizationUser"]["isGatewayAdmin"] = isGatewayAdmin;
  new_user["organizationUser"]["isDeviceAdmin"] = isDeviceAdmin;
  setOrganizationUser(new_user);
  console.log(organizationUser);

  postData(organizationUser);

  /* if error 400 stay on the same page with an error alert, else go go to /users*/ 
}

  return (
    <section className="home">
      <div className="title text"> <b> Add a new user to the organization</b></div>
      <Paper elevation={6} className="form dark-if-needed">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Email Address</InputLabel>
              <Input
                required
                id="email-address"
                type="text"
                value={email}
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <label className="permission-text">Permissions:</label>
            <p className="permission-subtext">An user without additional permissions will be able to see all resources under this organization and will be able to send and receive device payloads.</p>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="isAdmin" checked={isAdmin} value={isAdmin} onChange={changeAdmin} />}
              label="User is organization admin" className="text"
            />
            <FormHelperText variant="standard">An organization admin user is able to add and modify resources part of the organization.</FormHelperText>
          </Grid>

          {!isAdmin && (
          <>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox color="primary" name="isGatewayAdmin" checked={isGatewayAdmin} value={isGatewayAdmin} onChange={changeGatewayAdmin} />}
              label="User is gateway admin" className="text"
            />
            <FormHelperText variant="standard">An organization admin user is able to add and modify resources part of the organization.</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox color="primary" name="isDeviceAdmin" checked={isDeviceAdmin} value={isDeviceAdmin} onChange={changeDeviceAdmin} />}
              label="User is device admin" className="text"
            />
            <FormHelperText variant="standard">An organization admin user is able to add and modify resources part of the organization.</FormHelperText>
          </Grid>
          </>
          )}
          
          <Grid item xs={12} sm={5}></Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleUserSubmit}> Add user </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToUsers}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
    </section>
  )
}

export default AddOrganizationUser;
