import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import React from 'react';
import { Paper, FormControl, InputLabel, Grid, FormControlLabel, Checkbox } from '@mui/material';
import Input from '@mui/material/Input';
import "./AddGatewayForm.css";
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';


/* {
  "bandwidth": 0,
  "bitrate": 0,
  "frequency": 0,
  "modulation": "LORA",
  "spreadingFactors": [
    0
  ]
} */


function AddGatewayForm() {
  const [name, setName] = useState("");
  const [statsInterval, setStatsInterval] = useState(30); //to convert into string for post method: "30s"
  const [enabledChannels, setEnableChannels] = useState("");
  const [networkServerId, setNetworkServerId] = useState("");
  const [extraChannels, setExtraChannels] = useState([]);
  const [gateway, setGateway] = useState({
    "gatewayProfile": {
      "channels": [
        0
      ],
      "extraChannels": [
        {
          "bandwidth": 0,
          "bitrate": 0,
          "frequency": 0,
          "modulation": "LORA",
          "spreadingFactors": [
            0
          ]
        }
      ],
      "id": "",
      "name": "",
      "networkServerID": "",
      "statsInterval": ""
    }
  });

  const stringToIntegerList = (s) => {
    const list = s.split(",");
    for(let i = 0; i < list.length; i++){
      if(list[i]!=''){
        list[i]=parseInt(list[i]);
      }
    };
    return list;
  }

  const handleExtraChannelAdd= () => {
    setExtraChannels([...extraChannels, {
        "bandwidth": 250,
        "bitrate": 0,
        "frequency": 0,
        "modulation": "LORA",
        "spreadingFactors": []
      } ])
  };

  const handleExtraChannelDelete= (index) =>{
    const channels = [...extraChannels];
    channels.splice(index,1);
    setExtraChannels(channels);
  }

  const handleExtraChannelChange=(name,e,index)=>{
    const value = e.target.value;
    const channels=[...extraChannels];
    if(name=="spreadingFactors"){
      channels[index][name]=stringToIntegerList(value);
    }else{
    channels[index][name]=value;
    }
    setExtraChannels(channels);

  }

  const navigate = useNavigate();
const navigateToGateways = () => {
  navigate('/gateways');
};
  const handleGatewaySubmit= () => {
    const new_gateway = gateway;
    new_gateway["gatewayProfile"]["extraChannels"]= extraChannels;
    new_gateway["gatewayProfile"]["name"]=name;
    new_gateway["gatewayProfile"]["networkServerID"]=networkServerId;
    new_gateway["gatewayProfile"]["statsInterval"]=statsInterval.toString() +"s";
    new_gateway["gatewayProfile"]["channels"]=stringToIntegerList(enabledChannels);
    setGateway(new_gateway);
    console.log(new_gateway);
    console.log(gateway);

    /* if error 400 stay on the same page with an error alert, else go go to /gateways*/ 
  }
  useEffect( () => {
    console.log(gateway);
}, [gateway]);

  return (
    <section className="home">
      <div className="title text"> <b> Add a new gateway </b></div>
      <Paper elevation={6} className="form dark-if-needed">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Name</InputLabel>
              <Input
                required
                id="name"
                type="text"
                value={name}
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Stats Interval (seconds) (30 seconds by default)</InputLabel>
              <Input
                required
                id="notes"
                type="number"
                value={statsInterval}
                fullWidth
                onChange={(e) => setStatsInterval(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, width: '95%'}}>
              <InputLabel variant="standard" required>Enabled channels (separate channels by comma)</InputLabel>
              <Input
                required
                id="enabled-channels"
                placeholder="Ex: 0, 1, 2"
                type="text"
                value={enabledChannels}
                fullWidth
                onChange={(e) => setEnableChannels(e.target.value)}
              />
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
                <MenuItem value={1}>Server 1</MenuItem>
                <MenuItem value={2}>Server 2</MenuItem>
                <MenuItem value={3}>Server 3</MenuItem>
            </Select>
            <FormHelperText variant="standard">Select Network Server</FormHelperText>
            </FormControl>
          </Grid>
          <>
          {extraChannels.map((singleExtraChannel,index) =>(
            <Grid container key={index} spacing={3}>
              <Grid item xs={12}>
                <label className="permission-text">Extra Channel</label> <Button variant="outlined" onClick={() => handleExtraChannelDelete(index)}> Delete </Button>
              </Grid>
              <Grid item xd={12} sm={6}>
                <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel variant="standard" required>Modulation</InputLabel>
                <Select
                required
                id="modulation"
                variant="standard"
                value={singleExtraChannel.modulation}
                fullWidth
                onChange={(e) => handleExtraChannelChange("modulation", e, index)}
              >
                  <MenuItem value={"LORA"}>LoRa</MenuItem>
                  <MenuItem value={"FSK"}>FsK</MenuItem>
              </Select>
                </FormControl>
              </Grid>
              <Grid item xd={12} sm={6}>
                <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel variant="standard" required>Bandwidth</InputLabel>
                <Select
                required
                id="bandwidth"
                variant="standard"
                value={singleExtraChannel.bandwidth}
                fullWidth
                onChange={(e) => handleExtraChannelChange("bandwidth", e, index)}
              >
                  <MenuItem value={125}>125 kHz</MenuItem>
                  <MenuItem value={250}>250 kHz</MenuItem>
                  <MenuItem value={500}>500 kHz</MenuItem>
              </Select>
                </FormControl>
              </Grid>
              <Grid item xd={12} sm={6}>
                <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel variant="standard" required>Frequency (Hz)</InputLabel>
                <Input
                  required
                  id="frequency"
                  type="number"
                  value={singleExtraChannel.frequency}
                  fullWidth
                  onChange={(e) => handleExtraChannelChange("frequency", e, index)}
                />
                </FormControl>
              </Grid>

              {singleExtraChannel.modulation=="LORA" && (
              <Grid item xd={12} sm={6}>
                <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel variant="standard" required>Spreading-factors</InputLabel>
                <Input
                  required
                  id="spreading-factors"
                  placeholder="Ex: 7, 8, 9, 10, 11, 12"
                  type="text"
                  value={singleExtraChannel.spreadingFactors}
                  fullWidth
                  onChange={(e) => handleExtraChannelChange("spreadingFactors", e, index)}
                />
                <FormHelperText variant="standard">When defining multiple spreading-factors, the channel will be configured as a multi-SF channel on the gateway</FormHelperText>
                </FormControl>
              </Grid>
              )}

              {singleExtraChannel.modulation=="FSK" && (
              <Grid item xd={12} sm={6}>
                <FormControl sx={{ m: 1, width: '95%'}}>
                <InputLabel variant="standard" required>Bitrate</InputLabel>
                <Input
                  required
                  id="bitrate"
                  placeholder="50000"
                  type="number"
                  value={singleExtraChannel.bitrate}
                  fullWidth
                  onChange={(e) => handleExtraChannelChange("bitrate", e, index)}
                />
                </FormControl>
              </Grid>
              )}

              </Grid>
              ))}
              </>

          <Grid item xs={12} sm={5}> 
            <Button variant="outlined" onClick={handleExtraChannelAdd}> Add Extra Channel </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={handleGatewaySubmit}> Create Gateway </Button>
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button variant="contained" onClick={navigateToGateways}> Cancel </Button>
          </Grid>
        </Grid>        
      </Paper>
    </section>
  )
}

export default AddGatewayForm
