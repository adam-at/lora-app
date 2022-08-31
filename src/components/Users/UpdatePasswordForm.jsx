import React, { useState } from "react";
import { Paper, FormControl, InputLabel, Grid, Input, IconButton, InputAdornment, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import "../css/Form.css";

import {key} from "../jwt.jsx";

function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
  const [passwordUpdate, setPasswordUpdate] = useState(
    {
      "password": "",
      "userId": ""
    }
  );
  const [showPassword, setShowPassword]= useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate('/dashboard');
  };
  
  const path = window.location.pathname.split("/");
  const URL = "http://203.162.235.53:8080/api/users/"+path[2]+"/password";


  const updateData= (pw) => {
    const strPw = JSON.stringify(pw);
      const header ={
        body: strPw,
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
                  alert("Password updated !");
                  navigateToDashboard();
                }
            })
 
    };

  
  const handleUpdatePassword = () => {
    const new_password = passwordUpdate;
    new_password["password"]= password;
    new_password["userId"]= path[2];
    setPasswordUpdate(new_password);
    console.log(passwordUpdate);
  
    updateData(passwordUpdate);
  };


  return (
    <section className="home">
      <div className="title text"> <b> Change password </b></div>
      <Paper elevation={6} className="form dark-if-needed">
      <Grid container spacing={3}>
        <Grid item xs={12}>
              <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel htmlFor="standard-adornment-password" variant="standard" required>Password</InputLabel>
                <Input
                  required
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}></Grid>
            <Grid item xs={12} sm={5}>
              <Button variant="contained" onClick={handleUpdatePassword}> Update password </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button variant="contained" onClick={navigateToDashboard}> Cancel </Button>
            </Grid> 
        </Grid>       
      </Paper>
    </section>
  )
}

export default UpdatePasswordForm;
