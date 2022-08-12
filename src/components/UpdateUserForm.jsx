import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import React from 'react';
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Input from '@mui/material/Input';
import "./Form.css";
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.jsx";
import KeyIcon from '@mui/icons-material/Key';
import {key} from "./jwt";

function AddUserForm() {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [active, setActive] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(
    {
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

  const URL = "http://203.162.235.53:8080/api"+window.location.pathname;
    
 
 
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
                const res = response.user;
                setEmail(res.email);
                setNotes(res.note);
                setActive(res.isActive);
                setAdmin(res.isAdmin);
                }
            })
 
    };

  useEffect(() => {
    fetchData();}, []
  );

  const updateData= (user) => {
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
                alert("User deleted !")
                }
            })
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

const navigateToPassword = () => {
  //  navigate to /users
  navigate('password');
};

const handleUserUpdate = () => {
  const updated_user = user;
  updated_user["user"]["email"]= email;
  updated_user["user"]["isActive"]= active;
  updated_user["user"]["isAdmin"]=admin;
  updated_user["user"]["note"]=notes;
  updated_user["user"]["id"]=window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  setUser(updated_user);
  console.log(updated_user);

  updateData(user);

  /* if error 400 stay on the same page with an error alert, else go go to /users*/ 
}

  return (
    <section className="home">
      <div className="title text"> <b> Update a user </b> </div>
      <div className="delete-button">
        <DeleteConfirmationDialog fun={deleteData} name="user"/>
        <Button variant="outlined" sx={{ m:1 }} color="secondary" startIcon={<KeyIcon />} onClick={navigateToPassword}>
         Change Password
        </Button>
      </div>
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
            <label className="permission-text">Permissions:</label>
          </Grid>
          <Grid item xs={12} sm={6}>
          <FormControl sx={{ m: 1, width: '95%'}}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="isActive" checked={active} value={active} onChange={changeActive} />}
              label="Is active" className="text"
            />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="isAdmin" checked={admin} value={admin} onChange={changeAdmin} />}
              label="Is a global admin" className="text"
            />
          </Grid>
          <Grid item xs={12} sm={5}></Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleUserUpdate}> Update User </Button>
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
