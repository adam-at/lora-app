import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import React from 'react';
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import "./AddApiKeyForm.css";
import { useNavigate } from 'react-router-dom';

function AddApiKeyForm() {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword]= useState(false);
  const [active, setActive] = useState(false);
  const [admin, setAdmin] = useState(false);


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
const navigateToApiKeys = () => {
  navigate('/api-keys');
};

  return (
    <section className="home">
      <div className="title text"> <b> Add a new user </b></div>
      <Paper elevation={6} className="form dark-if-needed">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel htmlFor="standard-adornment-password" variant="standard">Email Address*</InputLabel>
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
              <InputLabel htmlFor="standard-adornment-password" variant="standard">Additional Notes</InputLabel>
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
              <InputLabel htmlFor="standard-adornment-password" variant="standard">Password*</InputLabel>
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
            <Button variant="contained" onClick={navigateToApiKeys}> Create API Key </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToApiKeys}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
    </section>
  )
}

export default AddApiKeyForm
