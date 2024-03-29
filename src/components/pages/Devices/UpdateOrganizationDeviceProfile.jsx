import React, { useState, useEffect } from "react";
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox, Input, Button, Tabs, Tab, Box, FormHelperText, MenuItem, Select, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

import {Controlled as CodeMirror} from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import 'codemirror/lib/codemirror.css';

import "../../css/Form.css";
import "../../css/Dashboard.css";

import UserProfile from "../../Users/UserProfile";
import {TabPanel} from "../../Tabs.jsx";
import {key} from "../../jwt";
import DeleteConfirmationDialog from "../../DeleteConfirmationDialog.jsx";


function UpdateOrganizationDeviceProfile() {
  const path = window.location.pathname.split('/');
  const org = UserProfile.getOrganizationFromId(path[2]);
  const user = UserProfile.getUser();
  const admin = user.isAdmin;
  const disable = !(admin || org && (org.isAdmin || org.isDeviceAdmin));

  const [adrAlgorithmID, setAdrAlgorithmID] = useState("");
  const [classBTimeout, setClassBTimeout] = useState(0);
  const [classCTimeout, setClassCTimeout] = useState(0);
  const [factoryPresetFreqs, setFactoryPresetFreqs] = useState("");
  const [geolocBufferTTL, setGeolocBufferTTL] = useState(0);
  const [geolocMinBufferSize, setGeolocMinBufferSize] = useState(0);
  const [id, setId] = useState("");
  const [macVersion, setMacVersion] = useState("");
  const [maxDutyCycle, setMaxDutyCycle] = useState(0);
  const [maxEIRP, setMaxEIRP] = useState(0);
  const [name, setName] = useState("");
  const [networkServerID, setNetworkServerID] = useState("");
  const [organizationID, setOrganizationID] = useState("");
  const [payloadCodec, setPayloadCodec] = useState("");
  const [payloadDecoderScript, setPayloadDecoderScript] = useState("");
  const [payloadEncoderScript, setPayloadEncoderScript] = useState("");
  const [pingSlotDR, setPingSlotDR] = useState(0);
  const [pingSlotFreq, setPingSlotFreq] = useState(0);
  const [pingSlotPeriod, setPingSlotPeriod] = useState(0);
  const [regParamsRevision, setRegParamsRevision] = useState("");
  const [rfRegion, setRfRegion] = useState("EU868");
  const [rxDROffset1, setRxDROffset1] = useState(0);
  const [rxDataRate2, setRxDataRate2] = useState(0);
  const [rxDelay1, setRxDelay1] = useState(0);
  const [rxFreq2, setRxFreq2] = useState(0);
  const [supports32BitFCnt, setSupports32BitFCnt] = useState(false);
  const [supportsClassB, setSupportsClassB] = useState(false);
  const [supportsClassC, setSupportsClassC] = useState(false);
  const [supportsJoin, setSupportsJoin] = useState(false);
  const [tags, setTags] = useState([]);
  const [uplinkInterval, setUplinkInterval] = useState("");

  const [deviceProfile, setDeviceProfile] = useState(
    {
      "deviceProfile": {
        "adrAlgorithmID": "",
        "classBTimeout": 0,
        "classCTimeout": 0,
        "factoryPresetFreqs": [
          0
        ],
        "geolocBufferTTL": 0,
        "geolocMinBufferSize": 0,
        "id": "",
        "macVersion": "",
        "maxDutyCycle": 0,
        "maxEIRP": 0,
        "name": "",
        "networkServerID": "",
        "organizationID": "",
        "payloadCodec": "",
        "payloadDecoderScript": "",
        "payloadEncoderScript": "",
        "pingSlotDR": 0,
        "pingSlotFreq": 0,
        "pingSlotPeriod": 0,
        "regParamsRevision": "",
        "rfRegion": "",
        "rxDROffset1": 0,
        "rxDataRate2": 0,
        "rxDelay1": 0,
        "rxFreq2": 0,
        "supports32BitFCnt": true,
        "supportsClassB": true,
        "supportsClassC": true,
        "supportsJoin": true,
        "tags": {},
        "uplinkInterval": ""
      }
    }
  );

  const macVersionOptions = [
    {value: "1.0.0", label: "1.0.0"},
    {value: "1.0.1", label: "1.0.1"},
    {value: "1.0.2", label: "1.0.2"},
    {value: "1.0.3", label: "1.0.3"},
    {value: "1.0.4", label: "1.0.4"},
    {value: "1.1.0", label: "1.1.0"},
  ];


  const regParamsOptions = [
    {value: "A", label: "A"},
    {value: "B", label: "B"},
    {value: "RP002-1.0.0", label: "RP002-1.0.0"},
    {value: "RP002-1.0.1", label: "RP002-1.0.1"},
    {value: "RP002-1.0.2", label: "RP002-1.0.2"},
    {value: "RP002-1.0.3", label: "RP002-1.0.3"},
  ];

  const pingSlotPeriodOptions = [
    {value: 32 * 1, label: "every second"},
    {value: 32 * 2, label: "every 2 seconds"},
    {value: 32 * 4, label: "every 4 seconds"},
    {value: 32 * 8, label: "every 8 seconds"},
    {value: 32 * 16, label: "every 16 seconds"},
    {value: 32 * 32, label: "every 32 seconds"},
    {value: 32 * 64, label: "every 64 seconds"},
    {value: 32 * 128, label: "every 128 seconds"},
  ];

  const payloadCodecOptions = [
    {value: "", label: "None"},
    {value: "CAYENNE_LPP", label: "Cayenne LPP"},
    {value: "CUSTOM_JS", label: "Custom JavaScript codec functions"},
  ];

  const codeMirrorOptions = {
    lineNumbers: true,
    mode: "javascript",
    theme: "default",
  };

  const stringToIntegerList = (s) => {
    if(s.length==0){
      return [];
    }else{
    const list = s.split(",");
    for(let i = 0; i < list.length; i++){
      if(list[i]!==''){
        list[i]=parseInt(list[i]);
      }
    };
    return list;
  }
  }

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

  const [serverData, setServerData] = useState([]);
  const [adrData, setAdrData] = useState([]);
  const URL2 = "http://203.162.235.53:8080/api/network-servers?limit=1000";

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
        fetchDeviceData();
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


    const fetchAdrData = () => {
      const URL3 = "http://203.162.235.53:8080/api/network-servers/" + networkServerID + "/adr-algorithms"; 
      fetch(URL3, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                setAdrData(response.adrAlgorithms);
            })
    };

    useEffect(() => {
      if(networkServerID){
        fetchAdrData();
      }
  }, [networkServerID])

const navigate = useNavigate();
const navigateToDeviceProfiles = () => {
  navigate(-1);
};

const URL = "http://203.162.235.53:8080/api/device-profiles/"+path[4];

const fetchDeviceData = () => {
  const header ={
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Grpc-Metadata-Authorization": key
    }
  };
    fetch(URL, header)
        .then((res) =>
            res.json())

        .then((response) => {
            console.log(response);
            /* if error 400 stay on the same page with an error alert, else go go to /device-profiles*/ 
            if(response.error){
              alert(response.error);
            }else{
              const res = response.deviceProfile;
              setName(res["name"]);
              setAdrAlgorithmID(res["adrAlgorithmID"]);
              setClassBTimeout(res["classBTimeout"]);
              setClassCTimeout(res["classCTimeout"]);
              setFactoryPresetFreqs(res["factoryPresetFreqs"].toString());
              setGeolocBufferTTL(res["geolocBufferTTL"]);
              setGeolocMinBufferSize(res["geolocMinBufferSize"]);
              setId(res["id"]);
              setMacVersion(res["macVersion"]);
              setMaxDutyCycle(res["maxDutyCycle"]);
              setMaxEIRP(res["maxEIRP"]);
              setNetworkServerID(res["networkServerID"]);
              setOrganizationID(res["organizationID"]);
              setPayloadCodec(res["payloadCodec"]);
              setPayloadDecoderScript(res["payloadDecoderScript"]);
              setPayloadEncoderScript(res["payloadEncoderScript"]);
              setPingSlotDR(res["pingSlotDR"]);
              setPingSlotFreq(res["pingSlotFreq"]);
              setPingSlotPeriod(res["pingSlotPeriod"]);
              setRegParamsRevision(res["regParamsRevision"]);
              setRfRegion(res["rfRegion"]);
              setRxDROffset1(res["rxDROffset1"]);
              setRxDataRate2(res["rxDataRate2"]);
              setRxDelay1(res["rxDelay1"]);
              setRxFreq2(res["rxFreq2"]);
              setSupports32BitFCnt(res["supports32BitFCnt"]);
              setSupportsClassB(res["supportsClassB"]);
              setSupportsClassC(res["supportsClassC"]);
              setSupportsJoin(res["supportsJoin"]);
              setTags(namesValuesFromTags(res["tags"]));
              setUplinkInterval(res["uplinkInterval"].slice(0,-1));

            
            }
        })

};
    
 
 
const updateData = (device) => {
    const strDevice = JSON.stringify(device);
    const header ={
      body: strDevice,
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
              /* if error 400 stay on the same page with an error alert, else go go to /device-profiles*/ 
              if(response.error){
                alert(response.error);
              }else{
              navigateToDeviceProfiles();
              }
          })

  };

const handleDeviceProfileUpdate = () => {
  const updated_deviceProfile = deviceProfile;
  updated_deviceProfile["deviceProfile"]["name"]=name;
  updated_deviceProfile["deviceProfile"]["adrAlgorithmID"]= adrAlgorithmID;
  updated_deviceProfile["deviceProfile"]["classBTimeout"]= classBTimeout;
  updated_deviceProfile["deviceProfile"]["classCTimeout"]= classCTimeout;
  updated_deviceProfile["deviceProfile"]["factoryPresetFreqs"]=stringToIntegerList(factoryPresetFreqs);
  updated_deviceProfile["deviceProfile"]["geolocBufferTTL"]=geolocBufferTTL;
  updated_deviceProfile["deviceProfile"]["geolocMinBufferSize"]=geolocMinBufferSize;
  updated_deviceProfile["deviceProfile"]["id"]=id;
  updated_deviceProfile["deviceProfile"]["macVersion"]=macVersion;
  updated_deviceProfile["deviceProfile"]["maxDutyCycle"]=maxDutyCycle;
  updated_deviceProfile["deviceProfile"]["maxEIRP"]=maxEIRP;
  updated_deviceProfile["deviceProfile"]["networkServerID"]=networkServerID;
  updated_deviceProfile["deviceProfile"]["organizationID"]=organizationID;
  updated_deviceProfile["deviceProfile"]["payloadCodec"]=payloadCodec;
  if(payloadCodec === "CUSTOM_JS"){
    updated_deviceProfile["deviceProfile"]["payloadDecoderScript"]=payloadDecoderScript;
    updated_deviceProfile["deviceProfile"]["payloadEncoderScript"]=payloadEncoderScript;
  }else{
    updated_deviceProfile["deviceProfile"]["payloadDecoderScript"]="";
    updated_deviceProfile["deviceProfile"]["payloadEncoderScript"]="";
  }
  updated_deviceProfile["deviceProfile"]["pingSlotDR"]=pingSlotDR;
  updated_deviceProfile["deviceProfile"]["pingSlotFreq"]=pingSlotFreq;
  updated_deviceProfile["deviceProfile"]["pingSlotPeriod"]=pingSlotPeriod;
  updated_deviceProfile["deviceProfile"]["regParamsRevision"]=regParamsRevision;
  updated_deviceProfile["deviceProfile"]["rfRegion"]=rfRegion;
  updated_deviceProfile["deviceProfile"]["rxDROffset1"]=rxDROffset1;
  updated_deviceProfile["deviceProfile"]["rxDataRate2"]=rxDataRate2;
  updated_deviceProfile["deviceProfile"]["rxDelay1"]=rxDelay1;
  updated_deviceProfile["deviceProfile"]["rxFreq2"]=rxFreq2;
  updated_deviceProfile["deviceProfile"]["supports32BitFCnt"]=supports32BitFCnt;
  updated_deviceProfile["deviceProfile"]["supportsClassB"]=supportsClassB;
  updated_deviceProfile["deviceProfile"]["supportsClassC"]=supportsClassC;
  updated_deviceProfile["deviceProfile"]["supportsJoin"]=supportsJoin;
  updated_deviceProfile["deviceProfile"]["tags"]=tagsFromNamesValues(tags);
  updated_deviceProfile["deviceProfile"]["uplinkInterval"]=uplinkInterval+"s";
  setDeviceProfile(updated_deviceProfile);
  console.log(deviceProfile);

  updateData(deviceProfile);
}

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
            navigateToDeviceProfiles();
            alert("Device profile deleted !")
            }
        })
};


//Handling tabs
const [value, setValue] = React.useState(0);
const handleChange = (event, newValue) => {
  setValue(newValue);
};


  return (
    <section className="home">
      <div className="title text"> <b> Update a device profile </b></div>
      {!disable && (
      <div className="delete-button">
        <DeleteConfirmationDialog fun={deleteData} name="device profile"/>
      </div>
      )}
      
      <Paper elevation={6} className="form dark-if-needed">
        <Grid container spacing={3}>
        <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <Tab label="General" />
        <Tab label="Join (OTAA/ABP)" />
        <Tab label="Class-B" />
        <Tab label="Class-C" />
        <Tab label="Codec" />
        <Tab label="Tags" />
      </Tabs>
      <TabPanel value={value} index={0}>

            <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
              <InputLabel variant="standard" required>Device-profile name</InputLabel>
              <Input
                required
                id="device-profile-name"
                type="text"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
              <FormHelperText variant="standard">A name to identify the device-profile.</FormHelperText>
            </FormControl>

            <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
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
            <FormHelperText variant="standard">The network-server on which this device-profile will be provisioned. After creating the device-profile, this value can't be changed.</FormHelperText>
            </FormControl>
          </Grid>

            <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
            <InputLabel variant="standard" required>LoRaWAN MAC Version</InputLabel>
            <Select
              required
              id="network-server"
              variant="standard"
              value={macVersion}
              fullWidth
              onChange={(e) => setMacVersion(e.target.value)}
            >
              {macVersionOptions.map((mac,index) => 
                <MenuItem key={index} value={mac.value}>{mac.label}</MenuItem>
              )}
            </Select>
            <FormHelperText variant="standard">The LoRaWAN MAC version supported by the device.</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
            <InputLabel variant="standard" required>LoRaWAN regional parameters revision</InputLabel>
            <Select
              required
              id="network-server"
              variant="standard"
              value={regParamsRevision}
              fullWidth
              onChange={(e) => setRegParamsRevision(e.target.value)}
            >
              {regParamsOptions.map((reg,index) => 
                <MenuItem key={index} value={reg.value}>{reg.label}</MenuItem>
              )}
            </Select>
            <FormHelperText variant="standard">Revision of the regional parameters specification supported by the device.</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
          <FormControl sx={{ m: 1, width: '95%'}} disabled={adrData.length==0 || disable}>
            <InputLabel variant="standard" required>ADR algorithm</InputLabel>
            <Select
              required
              id="adr-algorithm"
              variant="standard"
              value={adrAlgorithmID}
              fullWidth
              onChange={(e) => setAdrAlgorithmID(e.target.value)}
            >
              {adrData.map((adr,index) => 
                <MenuItem key={index} value={adr.id}>{adr.name}</MenuItem>
              )}
            </Select>
            <FormHelperText variant="standard">The ADR algorithm that will be used for controlling the device data-rate. {adrData.length==0 && (<p>(Select a network server first)</p>)}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
              <InputLabel variant="standard" required>Max EIRP</InputLabel>
              <Input
                required
                id="notes"
                type="number"
                value={maxEIRP}
                fullWidth
                onChange={(e) => setMaxEIRP(e.target.value)}
              />
            <FormHelperText variant="standard">Maximum EIRP supported by the device.</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
              <InputLabel variant="standard" required>Uplink interval (seconds)</InputLabel>
              <Input
                required
                id="notes"
                type="number"
                value={uplinkInterval}
                fullWidth
                onChange={(e) => setUplinkInterval(e.target.value)}
              />
            <FormHelperText variant="standard">The expected interval in seconds in which the device sends uplink messages. This is used to determine if a device is active or inactive.</FormHelperText>
            </FormControl>
          </Grid>

      </TabPanel>

      
      <TabPanel value={value} index={1}>
      <FormControlLabel disabled={disable}
              control={<Checkbox color="primary" name="supports-join" checked={supportsJoin} value={supportsJoin} onChange={()=>setSupportsJoin(!supportsJoin)} />}
              label="Device supports OTAA" className="text"
            />
              {!supportsJoin && (
                <>

                <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
                  <InputLabel variant="standard" required>RX1 delay</InputLabel>
                  <Input
                    required
                    id="rx-delay"
                    type="number"
                    value={rxDelay1}
                    fullWidth
                    onChange={(e) => setRxDelay1(e.target.value)}
                  />
                  <FormHelperText variant="standard">RX1 delay (valid values are 0 - 15).</FormHelperText>
                </FormControl>
          
         
              <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
                <InputLabel variant="standard" required>RX1 data-rate offset</InputLabel>
                <Input
                  required
                  id="rx-datarate-offset"
                  type="number"
                  value={rxDROffset1}
                  fullWidth
                  onChange={(e) => setRxDROffset1(e.target.value)}
                />
                <FormHelperText variant="standard">Please refer the LoRaWAN Regional Parameters specification for valid values.</FormHelperText>
              </FormControl>
 
              <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
                <InputLabel variant="standard" required>RX2 data-rate</InputLabel>
                <Input
                  required
                  id="rx2-datarate"
                  type="number"
                  value={rxDataRate2}
                  fullWidth
                  onChange={(e) => setRxDataRate2(e.target.value)}
                />
                <FormHelperText variant="standard">Please refer the LoRaWAN Regional Parameters specification for valid values</FormHelperText>
              </FormControl>

              <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
                <InputLabel variant="standard" required>RX2 channel frequency (Hz)</InputLabel>
                <Input
                  required
                  id="rx2-frequency"
                  type="number"
                  value={rxFreq2}
                  fullWidth
                  onChange={(e) => setRxFreq2(e.target.value)}
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
              <InputLabel variant="standard" required>Factory-preset frequencies (Hz)</InputLabel>
              <Input
                required
                id="device-profile-name"
                type="text"
                value={factoryPresetFreqs}
                fullWidth
                onChange={(e) => setFactoryPresetFreqs(e.target.value)}
              />
              <FormHelperText variant="standard">List of factory-preset frequencies (Hz), separated by comma.</FormHelperText>
            </FormControl>
       
            </>
              )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FormControlLabel disabled={disable}
              control={<Checkbox color="primary" name="supports-classB" checked={supportsClassB} value={supportsClassB} onChange={()=>setSupportsClassB(!supportsClassB)} />}
              label="Device supports Class-B" className="text"
            />
              {supportsClassB && (
                <>

                <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
                  <InputLabel variant="standard" required>Class-B confirmed downlink timeout</InputLabel>
                  <Input
                    required
                    id="classb-downlink-timeout"
                    type="number"
                    value={classBTimeout}
                    fullWidth
                    onChange={(e) => setClassBTimeout(e.target.value)}
                  />
                  <FormHelperText variant="standard">Class-B timeout (in seconds) for confirmed downlink transmissions.</FormHelperText>
                </FormControl>
          
         
                <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
                  <InputLabel variant="standard" required>Class-B ping-slot periodicity</InputLabel>
                  <Select
                    required
                    id="classb-ping-periodicity"
                    variant="standard"
                    value={pingSlotPeriod}
                    fullWidth
                    onChange={(e) => setPingSlotPeriod(e.target.value)}
                  >
                    {pingSlotPeriodOptions.map((ping,index) => 
                      <MenuItem key={index} value={ping.value}>{ping.label}</MenuItem>
                    )}
                  </Select>
                  <FormHelperText variant="standard">Select Class-B ping-slot periodicity.</FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
                  <InputLabel variant="standard" required>Class-B ping-slot data-rate</InputLabel>
                  <Input
                    required
                    id="classb-ping-datarate"
                    type="number"
                    value={pingSlotDR}
                    fullWidth
                    onChange={(e) => setPingSlotDR(e.target.value)}
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
                  <InputLabel variant="standard" required>Class-B ping-slot frequency (Hz)</InputLabel>
                  <Input
                    required
                    id="classb-ping-frequency"
                    type="number"
                    value={pingSlotFreq}
                    fullWidth
                    onChange={(e) => setPingSlotFreq(e.target.value)}
                  />
                </FormControl>
          
              </>
              
              )}
            
      </TabPanel>

      <TabPanel value={value} index={3}>
        <FormControlLabel disabled={disable}
              control={<Checkbox color="primary" name="supports-classC" checked={supportsClassC} value={supportsClassC} onChange={()=>setSupportsClassC(!supportsClassC)} />}
              label="Device supports Class-C" className="text"
            />
            <FormControl sx={{ ml: 4, width: '95%'}} disabled={disable}>
                <FormHelperText variant="standard">Select this option when the device will operate as Class-C device immediately after activation. In case it sends a DeviceModeInd mac-command when it changes to Class-C, do not select this option.</FormHelperText>
              </FormControl>

                <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
                  <InputLabel variant="standard" required>Class-C confirmed downlink timeout</InputLabel>
                  <Input
                    required
                    id="classc-downlink-timeout"
                    type="number"
                    value={classCTimeout}
                    fullWidth
                    onChange={(e) => setClassCTimeout(e.target.value)}
                  />
                  <FormHelperText variant="standard">Class-C timeout (in seconds) for confirmed downlink transmissions.</FormHelperText>
                </FormControl>
      
              </TabPanel>

              <TabPanel value={value} index={4}>
                <Grid item xs={12}>
                  <FormControl sx={{ m: 1, width: '95%'}}>
                   <InputLabel variant="standard" required>Payload codec</InputLabel>
                      <Select
                        required
                        id="payload-codec"
                        variant="standard"
                        value={payloadCodec}
                        fullWidth
                        onChange={(e) => setPayloadCodec(e.target.value)}
                      >
                      {payloadCodecOptions.map((payload,index) => 
                        <MenuItem key={index} value={payload.value}>{payload.label}</MenuItem>
                      )}
                      </Select>
                  <FormHelperText variant="standard">By defining a payload codec, ChirpStack Application Server can encode and decode the binary device payload for you.</FormHelperText>
                 </FormControl>
                </Grid>

                {payloadCodec === "CUSTOM_JS" && <FormControl sx={{ m: 1, width: '95%'}}>
            <CodeMirror
              value={payloadDecoderScript}
              options={codeMirrorOptions}
              onBeforeChange={(editor, data, value) => {
                setPayloadDecoderScript(value);
              }}
            />
            <FormHelperText>
              The function must have the signature <strong>function Decode(fPort, bytes)</strong> and must return an object.
              ChirpStack Application Server will convert this object to JSON.
            </FormHelperText>
          </FormControl>}
          {payloadCodec === "CUSTOM_JS" && <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
            <CodeMirror
              value={payloadEncoderScript}
              options={codeMirrorOptions}
              onBeforeChange={(editor, data, value) => {
                setPayloadEncoderScript(value);
              }}
            />
            <FormHelperText>
              The function must have the signature <strong>function Encode(fPort, obj)</strong> and must return an array
              of bytes.
            </FormHelperText>
          </FormControl>}
              </TabPanel>

              <TabPanel value={value} index={5}>
                <Grid item xs={12}>
                 <label className="permission-text">Tags can be used to store additional key/value data.</label>
                 </Grid>

                 <Grid item xs={12} sm={5}>
                  <Button variant="outlined" onClick={handleTagAdd} disabled={disable}> Add new tag </Button>
                </Grid>

                 {tags.map((tag,index) =>(
                  <Grid container key={index} spacing={3}>
                  <Grid item xd={12} sm={6}>
                    <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
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
                    <FormControl sx={{ m: 1, width: '95%'}} disabled={disable}>
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
                    <IconButton aria-label="delete" onClick={()=>handleTagDelete(index)} className="delete-icon" disabled={disable}>
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
            <Button variant="contained" onClick={handleDeviceProfileUpdate} disabled={disable}> Update Device Profile </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToDeviceProfiles}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
    </section>
  )
}

export default UpdateOrganizationDeviceProfile;
