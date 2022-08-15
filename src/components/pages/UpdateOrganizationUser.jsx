import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Input from '@mui/material/Input';
import "../Form.css";
import { useNavigate } from 'react-router-dom';
import {key} from "../jwt";
import FormHelperText from '@mui/material/FormHelperText';
import DeleteConfirmationDialog from "../DeleteConfirmationDialog.jsx";
import PersonIcon from '@mui/icons-material/Person';

function UpdateOrganizationUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = user.isAdmin;

  const [email, setEmail] = useState("");
  const [isDeviceAdmin, setDeviceAdmin] = useState(false);
  const [isGatewayAdmin, setGatewayAdmin] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const [organizationUser, setOrganizationUser] = useState(
    {
      "organizationUser": {
        "email": "",
        "isDeviceAdmin": false,
        "isGatewayAdmin": false,
        "isAdmin": false,
        "organizationID": "",
        "userID": ""
      }
    }
  );
    
 
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
                const res = response.organizationUser;
                setEmail(res.email);
                setAdmin(res.isAdmin);
                setDeviceAdmin(res.isDeviceAdmin);
                setGatewayAdmin(res.isGatewayAdmin);
                setUserId(res.userID);
                setOrganizationId(res.organizationID);
                }
            })
 
    };

  useEffect(() => {
    fetchData();}, []
  );


  const URL = "http://203.162.235.53:8080/api"+window.location.pathname;
    
 
 
    const updateData = (user) => {
      const strUser = JSON.stringify(user);
      const header ={
        body: strUser,
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
  navigate("/organizations/"+organizationId+"/users");
};

const navigateToUser = () => {
  navigate("/users/"+userId);
}

const handleUserUpdate = () => {
  const updated_user = organizationUser;
  updated_user["organizationUser"]["email"] = email;
  updated_user["organizationUser"]["isAdmin"] = isAdmin;
  updated_user["organizationUser"]["isGatewayAdmin"] = isGatewayAdmin;
  updated_user["organizationUser"]["isDeviceAdmin"] = isDeviceAdmin;
  updated_user["organizationUser"]["organizationID"] = organizationId;
  updated_user["organizationUser"]["userID"] = userId;

  setOrganizationUser(updated_user);
  console.log(organizationUser);

  updateData(organizationUser);

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
            navigateToUsers();
            alert("User deleted from organization !")
            }
        })
};

  return (
    <section className="home">
      <div className="title text"> <b> Update a user of the organization</b></div>

      <div className="delete-button">
        <DeleteConfirmationDialog fun={deleteData} name="organization user"/>
        {admin && (
        <Button variant="outlined" sx={{ m:1 }} color="secondary" startIcon={<PersonIcon />} onClick={navigateToUser}>
        Go to user
       </Button>
        )}    
      </div>
      <Paper elevation={6} className="form dark-if-needed">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required >Email Address</InputLabel>
              <Input
                disabled
                id="email-address"
                type="text"
                value={email}
                fullWidth
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
            <Button variant="contained" onClick={handleUserUpdate}> Update user </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToUsers}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
    </section>
  )
}

export default UpdateOrganizationUser;
