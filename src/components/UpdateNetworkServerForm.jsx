import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import React from 'react';
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Input from '@mui/material/Input';
import "./AddNetworkServerForm.css";
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {TabPanel} from "./Tabs.jsx";
import FormHelperText from '@mui/material/FormHelperText';
import {key} from "./jwt";
import "./UpdateUserForm.css"
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.jsx";


function UpdateNetworkServerForm() {
  const [name, setName] = useState("");
  const [server, setServer] = useState("");
  const [gatewayDiscovery, setGatewayDiscovery] = useState(false);
  const [interval, setInterval] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [datarate, setDatarate] = useState(0);
  const [caCert, setCaCert] = useState("");
  const [tlsCert, setTlsCert] = useState("");
  const [tlsKey, setTlsKey] = useState("");
  const [routingCaCert, setRoutingCaCert] = useState("");
  const [routingTlsCert, setRoutingTlsCert] = useState("");
  const [routingTlsKey, setRoutingTlsKey] = useState("");
  const [networkServer, setNetworkServer] = useState(
    {
    "networkServer": {
      "caCert": "",
      "gatewayDiscoveryDR": 0,
      "gatewayDiscoveryEnabled": false,
      "gatewayDiscoveryInterval": 0,
      "gatewayDiscoveryTXFrequency": 0,
      "id": "0",
      "name": "",
      "routingProfileCACert": "",
      "routingProfileTLSCert": "",
      "routingProfileTLSKey": "",
      "server": "",
      "tlsCert": "",
      "tlsKey": ""
    }
  }
  );


const changeGatewayDiscovery = () => {
    setGatewayDiscovery(!gatewayDiscovery);
  }

const navigate = useNavigate();
const navigateToNetworkServers = () => {
  navigate('/network-servers');
};
 
 
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
                  const res = response.networkServer;
                  setName(res.name);
                  setServer(res.server);
                  setGatewayDiscovery(res.gatewayDiscoveryEnabled);
                  setCaCert(res.caCert);
                  setDatarate(res.gatewayDiscoveryDR);
                  setFrequency(res.gatewayDiscoveryTXFrequency);
                  setInterval(res.gatewayDiscoveryInterval);
                  setRoutingCaCert(res.routingProfileCACert);
                  setRoutingTlsCert(res.routingProfileTLSCert);
                  setRoutingTlsKey(res.routingProfileTLSKey);
                  setTlsCert(res.tlsCert);
                  setTlsKey(res.tlsKey);
                }
            })
 
    };

  useEffect(() => {
    fetchData();}, []
  );

  const updateData= (server) => {
    const strServer = JSON.stringify(server);
      const header ={
        body: strServer,
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
                navigateToNetworkServers();
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
                navigateToNetworkServers();
                alert("Network Server deleted !")
                }
            })
    };



const handleNetworkServerUpdate = () => {
  const updated_networkServer = networkServer;
  updated_networkServer["networkServer"]["caCert"]= caCert;
  updated_networkServer["networkServer"]["gatewayDiscoveryDR"]= datarate;
  updated_networkServer["networkServer"]["gatewayDiscoveryEnabled"]=gatewayDiscovery;
  updated_networkServer["networkServer"]["gatewayDiscoveryInterval"]=interval;
  updated_networkServer["networkServer"]["gatewayDiscoveryTXFrequency"]=frequency;
  updated_networkServer["networkServer"]["name"]=name;
  updated_networkServer["networkServer"]["routingProfileCACert"]=routingCaCert;
  updated_networkServer["networkServer"]["routingProfileTLSCert"]=routingTlsCert;
  updated_networkServer["networkServer"]["routingProfileTLSKey"]=routingTlsKey;
  updated_networkServer["networkServer"]["server"]=server;
  updated_networkServer["networkServer"]["tlsCert"]=tlsCert;
  updated_networkServer["networkServer"]["tlsKey"]=tlsKey;
  setNetworkServer(updated_networkServer);
  console.log(networkServer);

  updateData(networkServer);
}


//Handling tabs
const [value, setValue] = React.useState(0);
const handleChange = (event, newValue) => {
  setValue(newValue);
};

  return (
    <section className="home">
      <div className="title text"> <b> Update a network server </b></div>
      <div className="delete-button">
        <DeleteConfirmationDialog fun={deleteData}/>
      </div>
      <Paper elevation={6} className="form dark-if-needed">
        <Grid container spacing={3}>
        <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <Tab label="General" />
        <Tab label="Gateway Discovery" />
        <Tab label="TLS Certificates" />
      </Tabs>
      <TabPanel value={value} index={0}>

            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Network Server name</InputLabel>
              <Input
                required
                id="network-server-name"
                type="text"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText variant="standard">A name to identify the network-server.</FormHelperText>
            </FormControl>
  
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Network Server server</InputLabel>
              <Input
                id="network-server-server"
                type="text"
                value={server}
                fullWidth
                onChange={(e) => setServer(e.target.value)}
              />
              <FormHelperText variant="standard">The 'hostname:port' of the network-server, for instance: 'localhost:8000'.</FormHelperText>
            </FormControl>

      </TabPanel>
      <TabPanel value={value} index={1}>
      <FormControlLabel
              control={<Checkbox color="primary" name="canDiscoverGateways" checked={gatewayDiscovery} value={gatewayDiscovery} onChange={changeGatewayDiscovery} />}
              label="Enable gateway discovery" className="text"
            />
              <FormControl sx={{ ml: 4, width: '95%'}}>
                <FormHelperText variant="standard">When checked, the gateway discovery feature is enabled for this network server.</FormHelperText>
              </FormControl>

              {gatewayDiscovery && (
                <>

                <FormControl sx={{ m: 1, width: '95%'}}>
                  <InputLabel variant="standard" required>Interval per day</InputLabel>
                  <Input
                    required
                    id="interval"
                    type="number"
                    value={interval}
                    fullWidth
                    onChange={(e) => setInterval(e.target.value)}
                  />
                  <FormHelperText variant="standard">The number of gateway discovery 'pings' per day that ChirpStack Application Server will broadcast through each gateway.</FormHelperText>
                </FormControl>
          
         
              <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel variant="standard" required>TX Frequency (Hz)</InputLabel>
                <Input
                  required
                  id="frequency"
                  type="number"
                  value={frequency}
                  fullWidth
                  onChange={(e) => setFrequency(e.target.value)}
                />
                <FormHelperText variant="standard">The frequency (Hz) used for transmitting the gateway discovery 'pings'. Please consult the LoRaWAN Regional Parameters specification for the channels valid for each region.</FormHelperText>
              </FormControl>
 
              <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel variant="standard" required>TX data-rate (Hz)</InputLabel>
                <Input
                  required
                  id="datarate"
                  type="number"
                  value={datarate}
                  fullWidth
                  onChange={(e) => setDatarate(e.target.value)}
                />
                <FormHelperText variant="standard">The data-rate used for transmitting the gateway discovery 'pings'. Please consult the LoRaWAN Regional Parameters specification for the data-rates valid for each region.</FormHelperText>
              </FormControl>
       
            </>
              )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <label className="subtitle-text">Certificates for ChirpStack Application Server to ChirpStack Network Server connection:</label>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard">CA Certificate</InputLabel>
              <Input
                id="ca-certificate"
                type="text"
                value={caCert}
                fullWidth
                multiline
                rows={2}
                onChange={(e) => setCaCert(e.target.value)}
              />
              <FormHelperText variant="standard">Paste the content of the CA certificate (PEM) file in the above textbox. Leave blank to disable TLS.</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard">TLS Certificate</InputLabel>
              <Input
                id="tls-certificate"
                type="text"
                value={tlsCert}
                fullWidth
                multiline
                rows={2}
                onChange={(e) => setTlsCert(e.target.value)}
              />
              <FormHelperText variant="standard">Paste the content of the TLS certificate (PEM) file in the above textbox. Leave blank to disable TLS.</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard">TLS Key</InputLabel>
              <Input
                id="tls-key"
                type="text"
                value={tlsKey}
                fullWidth
                multiline
                rows={2}
                onChange={(e) => setTlsKey(e.target.value)}
              />
              <FormHelperText variant="standard">Paste the content of the TLS key (PEM) file in the above textbox. Leave blank to disable TLS. Note: for security reasons, the TLS key can't be retrieved after being submitted (the field is left blank). When re-submitting the form with an empty TLS key field (but populated TLS certificate field), the key won't be overwritten.</FormHelperText>
            </FormControl>

            <label className="subtitle-text">Certificates for ChirpStack Network Server to ChirpStack Application Server connection:</label>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard">CA Certificate</InputLabel>
              <Input
                id="ca-certificate"
                type="text"
                value={routingCaCert}
                fullWidth
                multiline
                rows={2}
                onChange={(e) => setRoutingCaCert(e.target.value)}
              />
              <FormHelperText variant="standard">Paste the content of the CA certificate (PEM) file in the above textbox. Leave blank to disable TLS.</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard">TLS Certificate</InputLabel>
              <Input
                id="tls-certificate"
                type="text"
                value={routingTlsCert}
                fullWidth
                multiline
                rows={2}
                onChange={(e) => setRoutingTlsCert(e.target.value)}
              />
              <FormHelperText variant="standard">Paste the content of the TLS certificate (PEM) file in the above textbox. Leave blank to disable TLS.</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard">TLS Key</InputLabel>
              <Input
                id="tls-key"
                type="text"
                value={routingTlsKey}
                fullWidth
                multiline
                rows={2}
                onChange={(e) => setRoutingTlsKey(e.target.value)}
              />
              <FormHelperText variant="standard">Paste the content of the TLS key (PEM) file in the above textbox. Leave blank to disable TLS. Note: for security reasons, the TLS key can't be retrieved after being submitted (the field is left blank). When re-submitting the form with an empty TLS key field (but populated TLS certificate field), the key won't be overwritten.</FormHelperText>
            </FormControl>

            
      </TabPanel>
    </Box>
          
          
          <Grid item xs={12} sm={5}></Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleNetworkServerUpdate}> Update Network Server </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToNetworkServers}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
    </section>
  )
}

export default UpdateNetworkServerForm
