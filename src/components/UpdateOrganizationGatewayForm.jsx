import { useState, useEffect, useRef, useMemo } from "react";
import Button from '@mui/material/Button';
import React from 'react';
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Input from '@mui/material/Input';
import "./Form.css";
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {TabPanel} from "./Tabs.jsx";
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {key} from "./jwt";
import "./Dashboard.css";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {proxy} from "./Proxy";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import "./Map.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.jsx";



function UpdateOrganizationGateway() {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = user.isAdmin;
  const path = window.location.pathname.split("/");

  const [boards, setBoards] = useState([]);
  const [description, setDescription] = useState("");
  const [discoveryEnabled, setDiscoveryEnabled] = useState(false);
  const [gatewayProfileID, setGatewayProfileID] = useState("");
  const [id, setId] = useState("");
  const [altitude, setAltitude] = useState(0);


  const [position, setPosition] = useState({
    lat: 16.054407,
    lng: 108.202164
  });
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  );

  const [name, setName] = useState("");
  const [networkServerID, setNetworkServerID] = useState("");
  const [organizationID, setOrganizationID] = useState("");
  const [serviceProfileID, setServiceProfileID] = useState("");
  const [tags, setTags] = useState([]);

  const [serverData, setServerData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [gwData, setGwData] = useState([]);


  const [gateway, setGateway] = useState(
    {
      "gateway": {
        "boards": [
        ],
        "description": "",
        "discoveryEnabled": false,
        "gatewayProfileID": "",
        "id": "string",
        "location": {
          "accuracy": 0,
          "altitude": 0,
          "latitude": 0,
          "longitude": 0,
          "source": "UNKNOWN"
        },
        "metadata": {},
        "name": "",
        "networkServerID": "",
        "organizationID": "",
        "serviceProfileID": "",
        "tags": {}
      }
    }
  );

  useEffect(() => {
      fetchOrgGatewayData();
  }, []);

  const URLgw = proxy + "http://203.162.235.53:8080/api/gateways/" + path[path.length-1];

  const fetchOrgGatewayData = () => {
    const header ={
      headers: {
        Accept: "application/json",
        "Grpc-Metadata-Authorization": key 
      }
    }
    fetch(URLgw, header)
    .then((res) =>
        res.json())

    .then((response) => {
        console.log(response);
        const gw = response.gateway;
        setBoards(gw.boards);
        setName(gw.name);
        setDescription(gw.description);
        setDiscoveryEnabled(gw.discoveryEnabled);
        setGatewayProfileID(gw.gatewayProfileID);
        setId(gw.id);
        setAltitude(gw.location.altitude);
        setOrganizationID(gw.organizationID);
        setPosition({
          lat: gw.location.latitude,
          lng: gw.location.longitude
        });
        setServiceProfileID(gw.serviceProfileID);
        setNetworkServerID(gw.networkServerID);
        setTags(namesValuesFromTags(gw["tags"]));
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
      fetch(URLgw, header)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              if(response.error){
                alert(response.error);
              }else{
              navigateToGateways();
              alert("Gateway deleted !")
              }
          })
  };
  



  const handleTagAdd= () => {
    setTags([...tags,
    ["",""]]);
  };

  const handleTagDelete= (index) =>{
    const tagList = [...tags];
    tagList.splice(index,1);
    setTags(tagList);
  }

  const handleTagChange=(name,e,index)=>{
    const value = e.target.value;
    const tagList = [...tags];
    if(name==="name"){
      tagList[index][0]=value;
    }else{
      tagList[index][1]=value;
    }
    setTags(tagList);
  };

  const tagsFromNamesValues = (tagList) => {
    const tags = {};
    for (let i = 0; i < tagList.length; i++){
      const name = tagList[i][0];
      tags[name] = tagList[i][1];
    };
    return tags;
  };

  const namesValuesFromTags = (tags) => {
    return Object.entries(tags);

  }

  const URL2 = proxy + "http://203.162.235.53:8080/api/network-servers?limit=1000";

    const header ={
        headers: {
          Accept: "application/json",
          "Grpc-Metadata-Authorization": key 
        }
      }
 
    useEffect(() => {
      if(admin){
        fetchData("");
      }else{
        fetchData("&organizationID="+path[2]);
      }
        setOrganizationID(path[2]);
    }, [])
 
 
    const fetchData = (org) => {
        fetch(URL2+org, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                setServerData(response.result);
            })
 
    };


    const fetchServiceData = () => {
      const URL = proxy + "http://203.162.235.53:8080/api/service-profiles?limit=1000&organizationID="+path[2]+"&networkServerID=" + networkServerID; 
      fetch(URL, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                setServiceData(response.result);
                console.log(serviceData);
            })
    };
    const fetchGwData = () => {
      const URL = proxy + "http://203.162.235.53:8080/api/gateway-profiles?limit=1000&organizationID="+path[2]+"&networkServerID=" + networkServerID; 
      fetch(URL, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                setGwData(response.result);
            })
    };

    useEffect(() => {
      if(networkServerID){
        fetchServiceData();
        fetchGwData();
      }
  }, [networkServerID])

const navigate = useNavigate();
const navigateToGateways = () => {
  navigate(-1);
};

const URL = proxy + "http://203.162.235.53:8080/api/gateways";
    
 
 
const updateData = (gateway) => {
    const strGateway = JSON.stringify(gateway);
    const header ={
      body: strGateway,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Grpc-Metadata-Authorization": key
      },
      method: "PUT"
    };
      fetch(URLgw, header)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              /* if error 400 stay on the same page with an error alert, else go go to /device-profiles*/ 
              if(response.error){
                alert(response.error);
              }else{
              navigateToGateways();
              }
          })

  };

const handleGatewayUpdate = () => {
  const new_gateway = gateway;
  new_gateway["gateway"]["boards"]=boards;
  new_gateway["gateway"]["description"]=description;
  new_gateway["gateway"]["discoveryEnabled"]=discoveryEnabled;
  new_gateway["gateway"]["gatewayProfileID"]=gatewayProfileID;
  new_gateway["gateway"]["id"]=id;
  new_gateway["gateway"]["location"]["altitude"]=altitude;
  new_gateway["gateway"]["location"]["latitude"]=position.lat;
  new_gateway["gateway"]["location"]["longitude"]=position.lng;
  new_gateway["gateway"]["name"]=name;
  new_gateway["gateway"]["networkServerID"]=networkServerID;
  new_gateway["gateway"]["organizationID"]=organizationID;
  new_gateway["gateway"]["serviceProfileID"]=serviceProfileID;
  new_gateway["gateway"]["tags"]=tagsFromNamesValues(tags);
  setGateway(new_gateway);
  console.log(gateway);

  updateData(gateway);
}


//Handling tabs
const [value, setValue] = React.useState(0);
const handleChange = (event, newValue) => {
  setValue(newValue);
};


  return (
      <Paper elevation={6} className="form-with-tabs dark-if-needed">
        <Grid container spacing={3}>
        <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <Tab label="General" />
        <Tab label="Tags" />
      </Tabs>
      <TabPanel value={value} index={0}>

            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Gateway name</InputLabel>
              <Input
                required
                id="gateway-name"
                type="text"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText variant="standard">The name may only contain words, numbers and dashes.</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Gateway description</InputLabel>
              <Input
                required
                id="gateway-description"
                type="text"
                value={description}
                fullWidth
                multiline
                rows={2}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '95%'}}>
          <InputLabel variant="standard" required>Network Server</InputLabel>
            <Select
              required
              id="network-server"
              variant="standard"
              value={networkServerID}
              fullWidth
              onChange={(e) => setNetworkServerID(e.target.value)}
            >
              {serverData.map((server,index) => 
                <MenuItem key={index} value={server.id}>{server.name}</MenuItem>
              )}
            </Select>
            <FormHelperText variant="standard">Select the network-server to which the gateway will connect. When no network-servers are available in the dropdown, make sure a service-profile exists for this organization.</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '95%'}} disabled={serviceData.length==0}>
            <InputLabel variant="standard" required>Service profile</InputLabel>
            <Select
              required
              id="service-profile"
              variant="standard"
              value={serviceProfileID}
              fullWidth
              onChange={(e) => setServiceProfileID(e.target.value)}
            >
              {serviceData.map((srv,index) => 
                <MenuItem key={index} value={srv.id}>{srv.name}</MenuItem>
              )}
            </Select>
            <FormHelperText variant="standard">Select the service-profile under which the gateway must be added. {serviceData.length==0 && (<>(Select a network server first)</>)}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '95%'}} disabled={gwData.length==0}>
            <InputLabel variant="standard">Gateway profile</InputLabel>
            <Select
              id="gateway-profile"
              variant="standard"
              value={gatewayProfileID}
              fullWidth
              onChange={(e) => setGatewayProfileID(e.target.value)}
            >
              {gwData.map((gw,index) => 
                <MenuItem key={index} value={gw.id}>{gw.name}</MenuItem>
              )}
            </Select>
            <FormHelperText variant="standard">When assigning a gateway profile to the gateway, ChirpStack Network Server will attempt to update the gateway according to the gateway profile. Note that this does require a gateway with ChirpStack Concentratord. {serviceData.length==0 && (<>(Select a network server first)</>)}</FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
          <FormControlLabel
              control={<Checkbox color="primary" name="canDiscoverGateways" checked={discoveryEnabled} value={discoveryEnabled} onChange={() => setDiscoveryEnabled(!discoveryEnabled)} />}
              label="Enable gateway discovery" className="text"
            />
              <FormControl sx={{ ml: 4, width: '95%'}}>
                <FormHelperText variant="standard">When enabled (and ChirpStack Network Server is configured with the gateway discover feature enabled), the gateway will send out periodical pings to test its coverage by other gateways in the same network.</FormHelperText>
              </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Gateway altitude (meters)</InputLabel>
              <Input
                required
                id="altitude"
                type="number"
                value={altitude}
                fullWidth
                onChange={(e) => setAltitude(e.target.value)}
              />
            <FormHelperText variant="standard">If the gateway has an on-board GPS, this value will be set automatically when the network has received data from the gateway.</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '95%'}}>
          <InputLabel variant="standard" required>Gateway location</InputLabel> <br/> <br/>
          <MapContainer className="map" center={position} zoom={12} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker 
            icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
            position={position} draggable={true} eventHandlers={eventHandlers} ref={markerRef}/>
          </MapContainer>
            <FormHelperText>
              Drag the marker to the location of the gateway. When the gateway has an on-board GPS, this value will be set automatically when the network receives statistics from the gateway.
            </FormHelperText>
          </FormControl>
          </Grid>



      </TabPanel>

              <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                 <label className="permission-text">Tags can be used to store additional key/value data.</label>
                 </Grid>

                 <Grid item xs={12} sm={5}>
                  <Button variant="outlined" onClick={handleTagAdd}> Add new tag </Button>
                </Grid>

                 {tags.map((tag,index) =>(
                  <Grid container key={index} spacing={3}>
                  <Grid item xd={12} sm={6}>
                    <FormControl sx={{ m: 1, width: '95%'}}>
                      <InputLabel variant="standard" required>Name</InputLabel>
                      <Input
                        required
                        id="tag-name"
                        type="text"
                        value={tag[0]}
                        fullWidth
                        onChange={(e) => handleTagChange("name",e,index)}
                      />
                    </FormControl>  
                  </Grid>
                  <Grid item xd={12} sm={5}>
                    <FormControl sx={{ m: 1, width: '95%'}}>
                      <InputLabel variant="standard" required>Value</InputLabel>
                      <Input
                        required
                        id="tag-name"
                        type="text"
                        value={tag[1]}
                        fullWidth
                        onChange={(e) => handleTagChange("value",e,index)}
                      />
                    </FormControl>  
                  </Grid>
                  <Grid item xd={12} sm={1}>
                    <IconButton aria-label="delete" onClick={()=>handleTagDelete(index)} className="delete-icon">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>

                  </Grid>
                 )
                 )}

              </TabPanel>
    </Box>
          
          
          <Grid item xs={12} sm={5}><DeleteConfirmationDialog fun={deleteData} name="gateway"/></Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleGatewayUpdate}> Update Gateway </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToGateways}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
  )
}

export default UpdateOrganizationGateway;
