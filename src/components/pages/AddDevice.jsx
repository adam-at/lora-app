import { useState, useEffect} from "react";
import Button from '@mui/material/Button';
import React from 'react';
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Input from '@mui/material/Input';
import "../Form.css";
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {TabPanel} from "../Tabs.jsx";
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {key} from "../jwt";
import "../Dashboard.css";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {proxy} from "../Proxy";
import EUI64Field from "../EUI64";

import UserProfile from "../UserProfile";



function AddDevice() {
  const path = window.location.pathname.split('/');

  const user = UserProfile.getUser();
  const admin = user.isAdmin;

  const org = UserProfile.getOrganizationFromId(path[2]);
  const orgAdmin = org && org.isAdmin;
  const devAdmin = org && org.isDeviceAdmin;
  const permitted = admin || orgAdmin || devAdmin;

  const [applicationID, setApplicationID] = useState([]);
  const [description, setDescription] = useState("");
  const [devEUI, setDevEUI] = useState("");
  const [deviceProfileID, setDeviceProfileID] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [name, setName] = useState("");
  const [skipFCntCheck, setSkipFCntCheck] = useState(false);

  const [tags, setTags] = useState([]);
  const [variables, setVariables] = useState([]);



  const [device, setDevice] = useState(
    {
        "device": {
          "applicationID": "",
          "description": "",
          "devEUI": "",
          "deviceProfileID": "",
          "isDisabled": false,
          "name": "",
          "referenceAltitude": 0,
          "skipFCntCheck": false,
          "tags": {},
          "variables": {}
        }
      }
  );



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

  const handleVariableAdd= () => {
    setVariables([...variables,
    ["",""]]);
  };

  const handleVariableDelete= (index) =>{
    const variableList = [...variables];
    variableList.splice(index,1);
    setVariables(variableList);
  }

  const handleVariableChange=(name,e,index)=>{
    const value = e.target.value;
    const variableList = [...variables];
    if(name==="name"){
      variableList[index][0]=value;
    }else{
      variableList[index][1]=value;
    }
    setVariables(variableList);
  };

  const VariablesFromNamesValues = (variableList) => {
    const variables = {};
    for (let i = 0; i < variableList.length; i++){
      const name = variableList[i][0];
      variables[name] = variableList[i][1];
    };
    return variables;
  };

  const URLprofile = proxy + "http://203.162.235.53:8080/api/device-profiles?limit=1000&applicationID="+path[4];

  const [deviceProfileData, setDeviceProfileData] = useState([]);

    const header ={
        headers: {
          Accept: "application/json",
          "Grpc-Metadata-Authorization": key 
        }
      }
 
    useEffect(() => {
        fetchDataDeviceProfile();
        setApplicationID(path[4]);
    }, [])
 
 
    const fetchDataDeviceProfile = () => {
        fetch(URLprofile, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                setDeviceProfileData(response.result);
            })
 
    };


const navigate = useNavigate();
const navigateToAppDetails = () => {
  navigate("/organizations/"+path[2]+"/applications/"+path[4]);
};

const URL = proxy + "http://203.162.235.53:8080/api/devices";
    
 
 
const postData = (device) => {
    const strDevice = JSON.stringify(device);
    const header ={
      body: strDevice,
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
              /* if error 400 stay on the same page with an error alert, else go go to previous page*/ 
              if(response.error){
                alert(response.error);
              }else{
              navigateToAppDetails();
              }
          })

  };

const handleDeviceSubmit = () => {
  const new_device = device;
  new_device["device"]["applicationID"]=applicationID;
  new_device["device"]["description"]=description;
  new_device["device"]["name"]=name;
  new_device["device"]["devEUI"]=devEUI;
  new_device["device"]["deviceProfileID"]=deviceProfileID;
  new_device["device"]["skipFCntCheck"]=skipFCntCheck;
  new_device["device"]["isDisabled"]=isDisabled;

  new_device["device"]["tags"]=tagsFromNamesValues(tags);
  new_device["device"]["variables"]=VariablesFromNamesValues(variables);

  setDevice(new_device);
  console.log(new_device);

  postData(device);
}


//Handling tabs
const [value, setValue] = React.useState(0);
const handleChange = (event, newValue) => {
  setValue(newValue);
};

if(permitted){
  return (
    <section className="home">
      <div className="title text"> <b> Add a new device </b></div>
      <Paper elevation={6} className="form dark-if-needed">
        <Grid container spacing={3}>
        <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <Tab label="General" />
        <Tab label="Variables" />
        <Tab label="Tags" />
      </Tabs>
      <TabPanel value={value} index={0}>

            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Device name</InputLabel>
              <Input
                required
                id="device-name"
                type="text"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText variant="standard">The name may only contain words, numbers and dashes.</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Device description</InputLabel>
              <Input
                required
                id="device-description"
                type="text"
                value={description}
                fullWidth
                multiline
                rows={2}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl sx={{m:1, width: '95%'}}>
            <EUI64Field
            id="dev-eui"
            label="Device EUI"
            margin="normal"
            value={devEUI}
            onChange={(e)=>setDevEUI(e.target.value)}
            required
            fullWidth
            random="true"
          />
          </FormControl>


            <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '95%'}}>
          <InputLabel variant="standard" required>Device Profile</InputLabel>
            <Select
              required
              id="device-profile"
              variant="standard"
              value={deviceProfileID}
              fullWidth
              onChange={(e) => setDeviceProfileID(e.target.value)}
            >
              {deviceProfileData.map((deviceProfile,index) => 
                <MenuItem key={index} value={deviceProfile.id}>{deviceProfile.name}</MenuItem>
              )}
            </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
          <FormControlLabel
              control={<Checkbox color="primary" name="skip-check" checked={skipFCntCheck} value={skipFCntCheck} onChange={() => setSkipFCntCheck(!skipFCntCheck)} />}
              label="Disable frame-counter validation" className="text"
            />
              <FormControl sx={{ ml: 4, width: '95%'}}>
                <FormHelperText variant="standard"><b>Important:</b> Note that disabling the frame-counter validation will compromise security as it enables people to perform replay-attacks.</FormHelperText>
              </FormControl>
          </Grid>

          <Grid item xs={12}>
          <FormControlLabel
              control={<Checkbox color="primary" name="isDisabled" checked={isDisabled} value={isDisabled} onChange={() => setIsDisabled(!isDisabled)} />}
              label="Device is disabled" className="text"
            />
              <FormControl sx={{ ml: 4, width: '95%'}}>
                <FormHelperText variant="standard">When checked, ChirpStack Network Server will ignore received uplink frames and join-requests from disabled devices.</FormHelperText>
              </FormControl>
          </Grid>



      </TabPanel>

      <TabPanel value={value} index={1}>
                <Grid item xs={12}>
                 <label className="permission-text">Variables can be used to substitute placeholders in for example integrations, e.g. in case an integration requires the configuration of a device specific token.</label>
                 </Grid>

                 <Grid item xs={12} sm={5}>
                  <Button variant="outlined" onClick={handleVariableAdd}> Add new variable </Button>
                </Grid>

                 {variables.map((variable,index) =>(
                  <Grid container key={index} spacing={3}>
                  <Grid item xd={12} sm={6}>
                    <FormControl sx={{ m: 1, width: '95%'}}>
                      <InputLabel variant="standard" required>Name</InputLabel>
                      <Input
                        required
                        id="variable-name"
                        type="text"
                        value={variable[0]}
                        fullWidth
                        onChange={(e) => handleVariableChange("name",e,index)}
                      />
                    </FormControl>  
                  </Grid>
                  <Grid item xd={12} sm={5}>
                    <FormControl sx={{ m: 1, width: '95%'}}>
                      <InputLabel variant="standard" required>Value</InputLabel>
                      <Input
                        required
                        id="variable-name"
                        type="text"
                        value={variable[1]}
                        fullWidth
                        onChange={(e) => handleVariableChange("value",e,index)}
                      />
                    </FormControl>  
                  </Grid>
                  <Grid item xd={12} sm={1}>
                    <IconButton aria-label="delete" onClick={()=>handleVariableDelete(index)} className="delete-icon">
                      <DeleteIcon />
                    </IconButton>
                  </Grid>

                  </Grid>
                 )
                 )}

              </TabPanel>

              <TabPanel value={value} index={2}>
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
          
          
          <Grid item xs={12} sm={5}></Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleDeviceSubmit}> Add Device </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToAppDetails}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
    </section>
  )
  }else{
    return(<></>)
  }
}

export default AddDevice;
