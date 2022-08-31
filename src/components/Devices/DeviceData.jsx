import React, {useState, useEffect} from 'react';
import { Line } from "react-chartjs-2";
import { StreamingPlugin, RealTimeScale } from 'chartjs-plugin-streaming';
import {Chart as ChartJS} from 'chart.js';
import 'chartjs-adapter-moment';
import moment from "moment";

import "../css/GatewayDetails.css";
import "../css/Dashboard.css";

import { Grid, Card, CardHeader, CardContent, CardActions, IconButton, Button } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DownloadIcon from '@mui/icons-material/Download';

import {key} from "../jwt";

ChartJS.register(StreamingPlugin, RealTimeScale);


function DeviceData() {

    const [eventList, setEventList] = useState([]);
    const [event, setEvent] = useState({});
    const path = window.location.pathname.split('/');
    const URL = "http://203.162.235.53:8080/api/devices/" + path[6] +"/events";
    const eventListen = () => {

        const header ={
            headers: {
              Accept: "application/json",
              "Grpc-Metadata-Authorization": key 
            }
          }
          fetch(URL, header)
          .then((res) =>
              res.json())
      
          .then((response) => {
              if(response.error){
                alert(response.error);
              }else{
                setEvent(response);
              }
             
          })
    }

    useEffect(() => {
        eventListen();
    },[]);



    const data = {
        datasets: [
          {
            label: "Data value",
            borderColor: "rgba(33, 150, 243, 1)",
            backgroundColor: "rgba(0, 0, 0, 0)",
            fill: false,
            lineTension: 0,
            borderDash: [8, 4],
            data: []
          }
        ]
      };
      
      const options = {
        plugins: {
          streaming: {
            ttl: 60000,
            pause: false,
            duration: 20000,
            delay: 3000
          }
        },
        interaction: {
          intersect: false
        },
        elements: {
          line: {
            tension: 0.5
          }
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: 
            {
              type: "realtime",
              distribution: "linear",
              realtime: {
                onRefresh: function(chart) {
                  chart.data.datasets[0].data.push({
                    x: moment(),
                    y: Math.random()*100
                    //y: parseFloat(event.phyPayload)
                  });
                },
                time: {
                  displayFormat: "h:mm"
                },
              },
              ticks: {
                displayFormats: 1,
                maxRotation: 0,
                minRotation: 0,
                stepSize: 1,
                maxTicksLimit: 30,
                minUnit: "second",
                source: "auto",
                autoSkip: true,
                callback: function(value) {
                  return moment(value, "HH:mm:ss").format("HH:mm:ss");
                }
              }
            }
          ,
          yAxes: 
            {
              ticks: {
                beginAtZero: true,
                max: 1
              }
            }
          
        }
      };

      const pauseChart = () =>{
        options.plugins.streaming.pause = true;
      }

      const playChart = () => {
        options.plugins.streaming.pause = false;
      }

      const downloadDeviceData = () => {
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(data.datasets[0].data)], {type: 'text/plain'});
        element.href = window.URL.createObjectURL(file);
        element.download = "Data_received.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }

    
    return(
      <Grid container spacing={3} className="details-grid">
        <Grid item xs={12} sm={8}>

        <Card className="dark-if-needed">
          <CardHeader title="Data received from the device"/> 
          <CardContent>
            <Line className="line-chart" height={75} options={options} data={data} />
          </CardContent>
          <CardActions>
             <IconButton onClick={pauseChart}><PauseIcon/></IconButton>
             <IconButton onClick={playChart}><PlayArrowIcon/></IconButton>
             </CardActions>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button variant="contained" onClick={downloadDeviceData} startIcon={<DownloadIcon/>}> Download</Button>
      </Grid>
      </Grid>
    )
}

export default DeviceData;