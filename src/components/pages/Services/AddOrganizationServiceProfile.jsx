import React, { useState, useEffect } from "react";
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox, Button, Input, FormHelperText, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import "../../css/Form.css";

import {key} from "../../jwt";


function AddOrganizationServiceProfile() {
  const [name, setName] = useState("");
  const [networkServerId, setNetworkServerId] = useState("");
  const [addGWMetaData, setAddGWMetaData] = useState(false);
  const [nwkGeoLoc, setNwkGeoLoc] = useState(false);
  const [devStatusReqFreq, setDevStatusReqFreq] = useState(0);
  const [reportDevStatusMargin, setReportDevStatusMargin] = useState(false);
  const [reportDevStatusBattery, setReportDevStatusBattery] = useState(false);
  const [drMin, setDrMin] = useState(0);
  const [drMax, setDrMax] = useState(0);
  const [gwsPrivate, setGwsPrivate] = useState(false);
  const [organizationId, setOrganizationId] = useState("");

  const [serviceProfile, setServiceProfile] = useState(
    { "serviceProfile": {
        "name": "",
        "networkServerID": "",
        "addGWMetaData": false,
        "nwkGeoLoc": false,
        "devStatusReqFreq": 0,
        "reportDevStatusMargin": false,
        "reportDevStatusBattery": false,
        "drMin": 0,
        "drMax": 0,
        "gwsPrivate": false,
        "organizationID": ""
        }
      }
  );

  const [data, getData] = useState([]);
  const URL2 = "http://203.162.235.53:8080/api/network-servers?limit=1000";
  const header ={
      headers: {
        Accept: "application/json",
        "Grpc-Metadata-Authorization": key 
      }
    }

  useEffect(() => {
      fetchData();
      setOrganizationId(window.location.pathname.substring(15,window.location.pathname.length-21))
  }, [])


  const fetchData = () => {
      fetch(URL2, header)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              getData(response.result);
          })

  }

  const URL = "http://203.162.235.53:8080/api/service-profiles";
    
 
 
    const postData = (service) => {
      const strService = JSON.stringify(service);
      const header ={
        body: strService,
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
                navigateToServiceProfiles();
                }
            })
 
    };


const navigate = useNavigate();
const navigateToServiceProfiles = () => {
  //  navigate to /service-profiles
  navigate(window.location.pathname.substring(0,window.location.pathname.length-4));
};

const handleSubmit = () => {
  const new_service = serviceProfile;
  new_service["serviceProfile"]["name"] = name;
  new_service["serviceProfile"]["networkServerID"] = networkServerId;
  new_service["serviceProfile"]["addGWMetaData"] = addGWMetaData;
  new_service["serviceProfile"]["nwkGeoLoc"] = nwkGeoLoc;
  new_service["serviceProfile"]["devStatusReqFreq"] = devStatusReqFreq;
  new_service["serviceProfile"]["reportDevStatusMargin"] = reportDevStatusMargin;
  new_service["serviceProfile"]["reportDevStatusBattery"] = reportDevStatusBattery;
  new_service["serviceProfile"]["drMin"] = drMin;
  new_service["serviceProfile"]["drMax"] = drMax;
  new_service["serviceProfile"]["gwsPrivate"] = gwsPrivate;
  new_service["serviceProfile"]["organizationID"] = organizationId;
  

  setServiceProfile(new_service);
  console.log(serviceProfile);

  postData(serviceProfile);

  /* if error 400 stay on the same page with an error alert, else go go to /users*/ 
}

  return (
    <section className="home">
      <div className="title text"> <b> Add a new service to the organization</b></div>
      <Paper elevation={6} className="form dark-if-needed">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Name</InputLabel>
              <Input
                required
                id="service-name"
                type="text"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            <FormHelperText variant="standard">A name to identify the service profile.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '95%'}}>
            <InputLabel variant="standard" required>Network Server</InputLabel>
            <Select
              required
              id="network-server"
              variant="standard"
              value={networkServerId}
              fullWidth
              onChange={(e) => setNetworkServerId(e.target.value)}
            >
              {data.map((server,index) => 
                <MenuItem key={index} value={server.id}>{server.name}</MenuItem>
              )}
            </Select>
            <FormHelperText variant="standard">The network server on which this service profile will be provisioned. After creating the service profile, this value can't be changed.</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="gwMetaData" checked={addGWMetaData} value={addGWMetaData} onChange={()=>setAddGWMetaData(!addGWMetaData)} />}
              label="Add gateway meta-data" className="text"
            />
            <FormHelperText variant="standard">GW metadata (RSSI, SNR, GW geoloc., etc.) are added to the packet sent to the application-server.</FormHelperText>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="network-geolocation" checked={nwkGeoLoc} value={nwkGeoLoc} onChange={()=>setNwkGeoLoc(!nwkGeoLoc)} />}
              label="Enable network geolocation" className="text"
            />
            <FormHelperText variant="standard">When enabled, the network server will try to resolve the location of the devices under this service-profile. Please note that you need to have gateways supporting the fine-timestamp feature and that the network-server needs to be configured in order to provide geolocation support.</FormHelperText>
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Device status request frequency</InputLabel>
              <Input
                required
                id="status-request-frequency"
                type="number"
                value={devStatusReqFreq}
                fullWidth
                onChange={(e) => setDevStatusReqFreq(e.target.value)}
              />
              <FormHelperText variant="standard">Frequency to initiate an End-Device status request (request/day). Set to 0 to disable.</FormHelperText>
            </FormControl>
          </Grid>

          {devStatusReqFreq!=0 && (
          <>
          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="gwMetaData" checked={reportDevStatusMargin} value={reportDevStatusMargin} onChange={()=>setReportDevStatusMargin(!reportDevStatusMargin)} />}
              label="Report device link margin to application-server" className="text"
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="network-geolocation" checked={reportDevStatusBattery} value={reportDevStatusBattery} onChange={()=>setReportDevStatusBattery(!reportDevStatusBattery)} />}
              label="Report device battery level to application-server" className="text"
            />
          </Grid>
          </>
          )}

          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Minimum allowed data-rate</InputLabel>
              <Input
                required
                id="min-data-rate"
                type="number"
                value={drMin}
                fullWidth
                onChange={(e) => setDrMin(e.target.value)}
              />
              <FormHelperText variant="standard">Minimum allowed data rate. Used for ADR.</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Maximum allowed data-rate</InputLabel>
              <Input
                required
                id="max-data-rate"
                type="number"
                value={drMax}
                fullWidth
                onChange={(e) => setDrMax(e.target.value)}
              />
              <FormHelperText variant="standard">Maximum allowed data rate. Used for ADR.</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="network-geolocation" checked={gwsPrivate} value={gwsPrivate} onChange={()=>setGwsPrivate(!gwsPrivate)} />}
              label="Private gateways" className="text"
            />
            <FormHelperText variant="standard">When enabled, the network server will try to resolve the location of the devices under this service-profile. Please note that you need to have gateways supporting the fine-timestamp feature and that the network-server needs to be configured in order to provide geolocation support.</FormHelperText>
          </Grid>
          
          <Grid item xs={12} sm={5}></Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleSubmit}> Add Service Profile </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToServiceProfiles}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
    </section>
  )
}

export default AddOrganizationServiceProfile;
