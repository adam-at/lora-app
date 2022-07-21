import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import React from 'react';
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Input from '@mui/material/Input';
import "./AddOrganizationForm.css";
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';

function AddOrganizationForm() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [canHaveGateways, setCanHaveGateways] = useState(false);
  const [maxDevices, setMaxDevices]= useState(0);



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

  return (
    <section className="home">
      <div className="title text"> <b> Add a new organization </b></div>
      <Paper elevation={6} className="form dark-if-needed">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
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
            <FormControl sx={{ m: 1, width: '95%'}}>
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
          <Grid item xs={12}>
            <label className="subtitle-text">Gateways:</label>
          </Grid>
            <FormControlLabel
              control={<Checkbox color="primary" name="canHaveGateways" value={canHaveGateways} onChange={changeCanHaveGateways} />}
              label="Can have gateways" className="text"
            />
              <FormControl sx={{ ml: 4, width: '95%'}}>
                <FormHelperText variant="standard">When checked, it means that organization administrators are able to add their own gateways to the network. Note that the usage of the gateways is not limited to this organization.</FormHelperText>
              </FormControl>
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
          <Grid item xs={12} sm={5}></Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={navigateToOrganizations}> Create Organization </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToOrganizations}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
    </section>
  )
}

export default AddOrganizationForm
