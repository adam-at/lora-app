import React, { useState, useEffect } from "react";
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox, Button, IconButton, Input, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

import "../css/Form.css";

import {key} from "../jwt";


function AddUserForm() {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword]= useState(false);
  const [active, setActive] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(
    {"organizations":[],
  "password": "",
  "user": {
    "email": "",
    "id": "0",
    "isActive": false,
    "isAdmin": false,
    "note": "",
    "sessionTTL": 0
  }
}
  );

  const URL = "http://203.162.235.53:8080/api/users";
    
 
 
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


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changeActive = () => {
    setActive(!active);
  }

  const changeAdmin = () => {
    setAdmin(!admin);
  }

  useEffect( () => {
    console.log(active);
}, [active]);

  useEffect( () => {
    console.log(admin);
}, [admin]);

const navigate = useNavigate();
const navigateToUsers = () => {
  //  navigate to /users
  navigate('/users');
};

const handleUserSubmit = () => {
  const new_user = user;
  new_user["user"]["email"]= email;
  new_user["user"]["isActive"]= active;
  new_user["user"]["isAdmin"]=admin;
  new_user["user"]["note"]=notes;
  new_user["password"]=password;
  setUser(new_user);
  console.log(user);

  postData(user);

  /* if error 400 stay on the same page with an error alert, else go go to /users*/ 
}

  return (
    <section className="home">
      <div className="title text"> <b> Add a new user </b></div>
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
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard">Additional Notes</InputLabel>
              <Input
                id="notes"
                type="text"
                value={notes}
                fullWidth
                multiline
                rows={2}
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormControl>
          </Grid>
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
          <Grid item xs={12}>
            <label className="permission-text">Permissions:</label>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl sx={{ m: 1, width: '95%'}}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="isActive" value={active} onChange={changeActive} />}
              label="Is active" className="text"
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="isAdmin" value={admin} onChange={changeAdmin} />}
              label="Is a global admin" className="text"
            />
          </Grid>
          <Grid item xs={12} sm={5}></Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleUserSubmit}> Create User </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToUsers}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
    </section>
  )
}

export default AddUserForm
