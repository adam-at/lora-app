import React from 'react';
import { useState, useEffect} from "react";

import '../App.css';
import './Dashboard.css';
import './Navbar.css';
import Grid from '@mui/material/Grid';
import DashboardLayout from './DashboardLayout';

import {key} from "./jwt";
import {proxy} from "./Proxy";


function Dashboard() {
  const [data, getData] = useState([]);
  const URL = proxy + "http://203.162.235.53:8080/api/gateways?limit=1000";
  const header ={
      headers: {
        Accept: "application/json",
        "Grpc-Metadata-Authorization": key
      }
    }

  useEffect(() => {
      fetchData();
  }, []);



  const fetchData = () => {
      fetch(URL, header)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              getData(response.result);
          })

  }

  
  console.log(JSON.parse(localStorage.getItem("user")));
  
  return (
    <section className='home'>
        <div className="title text">
          <b>Dashboard</b>
        </div>
        <div className="card-grid">
          <Grid container spacing={3}>
            <DashboardLayout gateways={data}/>
          </Grid>
        </div>
    </section>
  )
}

export default Dashboard