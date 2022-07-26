import { useState } from "react";
import Button from '@mui/material/Button';
import React from 'react';
import { Paper, FormControl, InputLabel, Grid } from '@mui/material';
import Input from '@mui/material/Input';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import "./UpdatePasswordForm.css";

function UpdatePasswordForm() {
  const [password, setPassword] = useState("");
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
  
  const handleUpdatePassword = () => {
    //TODO: PUT request, retrieve result and check errors

    //go back to home:
    navigateToDashboard();
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
              <Button variant="contained" onClick={handleUpdatePassword}> Create User </Button>
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
