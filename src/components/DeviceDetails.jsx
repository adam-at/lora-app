import React, { useState, useEffect } from "react";

import { Grid, Link } from '@mui/material';
import {key} from "./jwt";
import "./Dashboard.css";
import {proxy} from "./Proxy";

import moment from "moment";
import "./GatewayDetails.css";
import { Line, Bar} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import Heatmap from "./HeatMap"


import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {CircularProgress} from "@mui/material";



function GatewayDetails(props) {

  const path = window.location.pathname.split("/");

  const [data, setData] = useState({});
  const [dataDeviceProfile, setDataDeviceProfile] = useState({});
  const [lastSeenDate, setLastSeenDate] = useState("Never");
  const [state, setState] = useState("Enabled");


  const URLdevice = proxy + "http://203.162.235.53:8080/api/devices/" + path[6];
  const URLdeviceProfile = proxy + "http://203.162.235.53:8080/api/device-profiles/";

  const fetchDeviceData = () => {
    const header ={
      headers: {
        Accept: "application/json",
        "Grpc-Metadata-Authorization": key 
      }
    }
    fetch(URLdevice, header)
    .then((res) =>
        res.json())

    .then((response) => {
        console.log(response);
        setData(response);
        if (response.lastSeenAt !== null) {
          setLastSeenDate(moment(data.lastSeenAt).format("lll"));
        };
        if (response.device.isDisabled) {
          setState("Disabled") ;
        };
        fetchDeviceProfileData(response.device.deviceProfileID);

    })

  };



  const fetchDeviceProfileData = (id) => {
    const header ={
      headers: {
        Accept: "application/json",
        "Grpc-Metadata-Authorization": key 
      }
    }
    fetch(URLdeviceProfile+id, header)
    .then((res) =>
        res.json())

    .then((response) => {
        console.log(response);
        setDataDeviceProfile(response);
    })

  };
  useEffect(() => {
    fetchStats();
    fetchDeviceData();
},[]);




const start = moment().subtract(30, "days").toISOString();
const end = moment().toISOString();
const URLstats = proxy + "http://203.162.235.53:8080/api/devices/" + path[6] + "/stats?interval=DAY&startTimestamp="+start+"&endTimestamp="+end;

const [statsGwRSSI, setStatsGwRSSI] = useState({
  labels: [],
  datasets: [
    {
      label: "RSSU (reported by gateways)",
      borderColor: "rgba(33, 150, 243, 1)",
      backgroundColor: "rgba(0, 0, 0, 0)",
      lineTension: 0,
      pointBackgroundColor: "rgba(33, 150, 243, 1)",
      data: [],
    },
  ],
});

const [statsGwSNR, setStatsGwSNR] = useState({
  labels: [],
  datasets: [
    {
      label: "SNR (reported by gateways)",
      borderColor: "rgba(33, 150, 243, 1)",
      backgroundColor: "rgba(0, 0, 0, 0)",
      lineTension: 0,
      pointBackgroundColor: "rgba(33, 150, 243, 1)",
      data: [],
    },
  ],
});

const [statsUp, setStatsUp] = useState ({
  labels: [],
  datasets: [
    {
      label: "uplink",
      borderColor: "rgba(33, 150, 243, 1)",
      backgroundColor: "rgba(0, 0, 0, 0)",
      lineTension: 0,
      pointBackgroundColor: "rgba(33, 150, 243, 1)",
      data: [],
    },
  ],
});

const [statsUpFreq, setStatsUpFreq] = useState([]);
const [statsUpDr, setStatsUpDr] = useState({
  labels: [],
  datasets: [],
});
const [statsUpDrSet, setStatsUpDrSet] = useState([]);
const [statsErrors, setStatsErrors] = useState({
  labels: [],
  datasets: [],
});
const [statsErrorsSet, setStatsErrorsSet] = useState({});
const [statsCompleted, setStatsCompleted] = useState(false);

const statsOptions = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
            stepSize: 50,
            autoSkip: false
          }
      },
      x: {
        type: "time",
      },
    },
  };


  const barOptions = {
    plugins: {
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: "time",
      },
    },
  };

const fetchStats = () =>{
    const header ={
        headers: {
          Accept: "application/json",
          "Grpc-Metadata-Authorization": key 
        }
      }
      fetch(URLstats, header)
      .then((res) =>
        res.json())
  
      .then((response) => {
        console.log(response);
        const sUp = statsUp;
        const sRSSI = statsGwRSSI;
        const sSNR = statsGwSNR;
        const sUpFreq = statsUpFreq;
        const sUpDr = statsUpDr;
        const sUpDrSet = statsUpDrSet;
        const sErrors = statsErrors;
        const sErrorsSet = statsErrorsSet;

        

        for (const row of response.result) {
          sUp.labels.push(moment(row.timestamp).format("YYYY-MM-DD"));
          sUp.datasets[0].data.push(row.rxPackets);
  
          sRSSI.labels.push(moment(row.timestamp).format("YYYY-MM-DD"));
          sSNR.labels.push(moment(row.timestamp).format("YYYY-MM-DD"));
  
          if (row.rxPackets !== 0) {
            sRSSI.datasets[0].data.push(row.gwRssi);
            sSNR.datasets[0].data.push(row.gwSnr);
          } else {
            sRSSI.datasets[0].data.push(null);
            sSNR.datasets[0].data.push(null);
          }
  
          sUpFreq.push({
            x: moment(row.timestamp).format("YYYY-MM-DD"),
            y: row.rxPacketsPerFrequency,
          });
  
          sErrors.labels.push(moment(row.timestamp).format("YYYY-MM-DD"));
          Object.entries(row.errors).forEach(([k, v]) => {
            if (sErrorsSet[k] === undefined) {
              sErrorsSet[k] = [];
            }
  
            
            for (let i = sErrorsSet[k].length; i < sErrors.labels.length - 1; i++) {
              sErrorsSet[k].push(0);
            }
  
            sErrorsSet[k].push(v);
          });
  
          sUpDr.labels.push(moment(row.timestamp).format("YYYY-MM-DD"));
          Object.entries(row.rxPacketsPerDr).forEach(([k, v]) => {
            if (sUpDrSet[k] === undefined) {
              sUpDrSet[k] = [];
            }
  
            
            for (let i = sUpDrSet[k].length; i < sUpDr.labels.length - 1; i++) {
              sUpDrSet[k].push(0);
            }
  
            sUpDrSet[k].push(v);
          });
        };

        let backgroundColors = ['#8bc34a', '#ff5722', '#ff9800', '#ffc107', '#ffeb3b', '#cddc39', '#4caf50', '#009688', '#00bcd4', '#03a9f4', '#2196f3', '#3f51b5', '#673ab7', '#9c27b0', '#e91e63'];

        Object.entries(sErrorsSet).forEach(([k, v]) => {
          sErrors.datasets.push({
            label: k,
            data: v,
            backgroundColor: backgroundColors.shift(),
          });
        });
  
        backgroundColors = ['#8bc34a', '#ff5722', '#ff9800', '#ffc107', '#ffeb3b', '#cddc39', '#4caf50', '#009688', '#00bcd4', '#03a9f4', '#2196f3', '#3f51b5', '#673ab7', '#9c27b0', '#e91e63'];
  
        Object.entries(sUpDrSet).forEach(([k, v]) => {
          sUpDr.datasets.push({
            label: k,
            data: v,
            backgroundColor: backgroundColors.shift(),
          });
        });

        console.log(statsUp);
        setStatsUp(sUp);
        setStatsUpFreq(sUpFreq);
        setStatsUpDr(sUpDr);
        setStatsUpDrSet(sUpDrSet);
        setStatsErrors(sErrors);
        setStatsErrorsSet(sErrorsSet);
        setStatsGwSNR(sSNR);
        setStatsGwRSSI(sRSSI);
        setStatsCompleted(true);        
            })
}



while(!(dataDeviceProfile.deviceProfile && data.deviceStatusBattery && statsCompleted )){
  return(<CircularProgress/>)
}
    return (
        <Grid container spacing={3} className="details-grid">
          <Grid item xs={12} sm={6}>
                <Card className="dark-if-needed">
                <CardHeader title="Device informations" />
                <CardContent>
                <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell>Device name</TableCell>
                        <TableCell>{data.device.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>{data.device.description}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Device profile</TableCell>
                        <TableCell><Link href={'/organizations/'+path[2]+'/device-profiles/'+data.device.deviceProfileID}>{dataDeviceProfile.deviceProfile.name}</Link></TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </CardContent>
                </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card className="dark-if-needed">
                <CardHeader title="Device status" />
                <CardContent>
                <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell>Last seen at</TableCell>
                        <TableCell>{lastSeenDate}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>State</TableCell>
                        <TableCell>{state}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </CardContent>
                </Card>
            </Grid>

          <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Received" />
            <CardContent className="line-chart">
              <Line height={75} options={statsOptions} data={statsUp} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Errors" />
            <CardContent className="line-chart">
              <Bar data={statsErrors} options={barOptions} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="SNR" />
            <CardContent className="line-chart">
              <Line height={75} options={statsOptions} data={statsGwSNR} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="RSSI" />
            <CardContent className="line-chart">
              <Line height={75} options={statsOptions} data={statsGwRSSI} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Frequency received" />
            <CardContent className="line-chart">
              <Heatmap data={statsUpFreq} fromColor="rgb(227, 242, 253)" toColor="rgb(33, 150, 243, 1)" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Data-rate received" />
            <CardContent className="line-chart">
              <Bar data={statsUpDr} options={barOptions} />
            </CardContent>
          </Card>
        </Grid>

        </Grid>
      )
  
}

export default GatewayDetails;
