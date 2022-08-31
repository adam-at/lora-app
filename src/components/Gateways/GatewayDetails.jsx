import React, { useState, useEffect } from "react";

import { Grid } from '@mui/material';
import {key} from "../jwt";
import "../css/Dashboard.css";

import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import {Icon} from 'leaflet';
import moment from "moment";
import "../css/Map.css";
import "../css/GatewayDetails.css";
import { Line} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import Heatmap from "../HeatMap"


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


  const URLgw = "http://203.162.235.53:8080/api/gateways/" + path[path.length-1];

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
        setData(response);
    })

  };

  useEffect(() => {
    fetchStats();
    fetchOrgGatewayData();
},[]);

let lastSeenDate = "Never";
if (data.lastSeenAt !== null) {
  lastSeenDate = moment(data.lastSeenAt).format("lll");
};


const start = moment().subtract(30, "days").toISOString();
const end = moment().toISOString();
const URLstats = "http://203.162.235.53:8080/api/gateways/" + path[path.length-1] + "/stats?interval=DAY&startTimestamp="+start+"&endTimestamp="+end;

const [statsDown, setStatsDown] = useState({
    labels: [],
    datasets: [
    {
        label: "rx received",
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
        label: "tx emitted",
        borderColor: "rgba(33, 150, 243, 1)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        lineTension: 0,
        pointBackgroundColor: "rgba(33, 150, 243, 1)",
        data: [],
    },
    ],
});

const [statsUpFreq, setStatsUpFreq] = useState([]);
const [statsDownFreq, setStatsDownFreq] = useState([]);
const [statsUpDr, setStatsUpDr] = useState([]);
const [statsDownDr, setStatsDownDr] = useState([]);
const [statsCompleted, setStatsCompleted] = useState(false);

const statsOptions = {
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
        const sDown = statsDown;
        const sUpFreq = statsUpFreq;
        const sDownFreq = statsDownFreq;
        const sDownDr = statsDownDr;
        const sUpDr = statsUpDr;
        

        for (const row of response.result) {
            sUp.labels.push(moment(row.timestamp).format("YYYY-MM-DD"));
            sUp.datasets[0].data.push(row.txPacketsEmitted);

            sDown.labels.push(moment(row.timestamp).format("YYYY-MM-DD"));
            sDown.datasets[0].data.push(row.rxPacketsReceivedOK);
            

            sUpFreq.push({
            x: moment(row.timestamp).format("YYYY-MM-DD"),
            y: row.rxPacketsPerFrequency,
            });

            sDownFreq.push({
            x: moment(row.timestamp).format("YYYY-MM-DD"),
            y: row.txPacketsPerFrequency,
            });

            sUpDr.push({
            x: moment(row.timestamp).format("YYYY-MM-DD"),
            y: row.rxPacketsPerDr,
            });

            sDownDr.push({
            x: moment(row.timestamp).format("YYYY-MM-DD"),
            y: row.txPacketsPerDr,
            });
        }
        console.log(statsDown);
        console.log(statsUp);
        setStatsDown(sDown);
        setStatsUp(sUp);
        setStatsUpFreq(sUpFreq);
        setStatsDownFreq(sDownFreq);
        setStatsUpDr(sUpDr);
        setStatsDownDr(sDownDr);
        setStatsCompleted(true);        
            })

}



while(!data.createdAt || !statsCompleted){
  return(<CircularProgress/>)
}
    return (
        <Grid container spacing={3} className="details-grid">
            <Grid item xs={12} sm={6}>
                <Card className="dark-if-needed">
                <CardHeader title="Gateway informations" />
                <CardContent>
                <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell>Gateway ID</TableCell>
                        <TableCell>{data.gateway.id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Altitude</TableCell>
                        <TableCell>{data.gateway.location.altitude} meters</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>GPS coordinates</TableCell>
                        <TableCell>{data.gateway.location.latitude}, {data.gateway.location.longitude}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Last seen at</TableCell>
                        <TableCell>{lastSeenDate}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
            <MapContainer className="details-map" center={[data.gateway.location.latitude,data.gateway.location.longitude]} zoom={16} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> 
                <Marker
                icon={new Icon({iconUrl: 'http://www.wanderfinder.com/wp-content/uploads/leaflet-maps-marker-icons/wifi.png', iconSize: [32, 37], iconAnchor: [16, 10]})}
                position={[data.gateway.location.latitude,data.gateway.location.longitude]}>
                </Marker>
              </MapContainer>
            </Grid>
            <Grid item xs={12} sm={6} >
            <Card className="dark-if-needed">
                <CardHeader title="Received" />
                <CardContent className="line-chart">
                    <Line height={75} options={statsOptions} data={statsDown}/>     
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={12} sm={6} >
            <Card className="dark-if-needed">
                <CardHeader title="Transmitted" />
                <CardContent className="line-chart">
                    <Line height={75} options={statsOptions} data={statsUp}/>     
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Frequency received (Hz)" />
            <CardContent className="line-chart">
            <Heatmap data={statsUpFreq} fromColor="rgb(227, 242, 253)" toColor="rgb(33, 150, 243, 1)" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Frequency transmitted (Hz)" />
            <CardContent className="line-chart">
            <Heatmap data={statsDownFreq} fromColor="rgb(227, 242, 253)" toColor="rgb(33, 150, 243, 1)" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Data-rate received (bit/s)" />
            <CardContent className="line-chart">
            <Heatmap data={statsUpDr} fromColor="rgb(227, 242, 253)" toColor="rgb(33, 150, 243, 1)" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Data-rate transmitted (bit/s)" />
            <CardContent className="line-chart">
            <Heatmap data={statsDownDr} fromColor="rgb(227, 242, 253)" toColor="rgb(33, 150, 243, 1)" />
            </CardContent>
          </Card>
        </Grid>
        </Grid>
      )
  
}

export default GatewayDetails;
