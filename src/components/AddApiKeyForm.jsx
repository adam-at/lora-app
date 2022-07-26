import { useState } from "react";
import Button from '@mui/material/Button';
import React from 'react';
import { Paper, FormControl, InputLabel, Grid } from '@mui/material';
import Input from '@mui/material/Input';
import "./AddApiKeyForm.css";
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import {key} from "./jwt";
import { SettingsInputHdmiTwoTone } from "@mui/icons-material";

function AddApiKeyForm() {
  const [name, setName] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);

  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  const [apiKey, setApiKey] = useState({
    "apiKey": {
      "applicationID": "0",
      "isAdmin": true,
      "name": "",
      "organizationID": "0"
    }
  });

  const URL = "http://203.162.235.53:8080/api/internal/api-keys";
    
 
 
  const postData = (apiKey) => {
    const strKey = JSON.stringify(apiKey);
    const header ={
      body: strKey,
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
                setId(response.id);
                setToken(response.jwtToken);
              }
          })

  };

  const handleSubmitApiKey = () => {
    const new_key = apiKey;
    new_key["apiKey"]["name"]=name;
    setApiKey(new_key);
    console.log(apiKey);

    postData(apiKey);
    setShowApiKey(!showApiKey);
  };

  const navigate = useNavigate();
  const navigateToApiKeys = () => {
    navigate('/api-keys');
  };

  return (
    <section className="home">
      <div className="title text"> <b> Add a new API Key </b></div>
      <Paper elevation={6} className="form dark-if-needed">
        <Grid container spacing={3}>
          {!showApiKey && (
            <>
            <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel variant="standard" required>API key name</InputLabel>
                <Input
                  required
                  id="api-key-name"
                  type="text"
                  value={name}
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
                <FormHelperText variant="standard">A descriptive name for the API key</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={5}></Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" onClick={handleSubmitApiKey}> Create API Key </Button>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button variant="contained" onClick={navigateToApiKeys}> Cancel </Button>
            </Grid>
            </>
          )}

          {showApiKey && (
            <>
            <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel variant="standard">API key ID</InputLabel>
                <Input
                  disabled
                  id="api-key-id"
                  type="text"
                  value={id}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel variant="standard">API key name</InputLabel>
                <Input
                  disabled
                  id="api-key-name"
                  type="text"
                  value={name}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel variant="standard">Token</InputLabel>
                <Input
                  id="api-key-token"
                  type="text"
                  value={token}
                  fullWidth
                  multiline
                  inputProps={{
                    readOnly: true,
                  }}
                />
                <FormHelperText variant="standard">Use this token when making API request with this API key. This token is provided once.</FormHelperText>
              </FormControl>
            </Grid>
            </>
          )}
        </Grid>        
      </Paper>
    </section>
  )
}

export default AddApiKeyForm
