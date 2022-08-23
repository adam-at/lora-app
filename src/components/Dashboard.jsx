import React from 'react';
import { useState, useEffect} from "react";

import '../App.css';
import './Dashboard.css';
import './Navbar.css';
import Grid from '@mui/material/Grid';
import DashboardLayout from './DashboardLayout';

import {key} from "./jwt";
import {proxy} from "./Proxy";

import UserProfile from "./UserProfile";


function Dashboard() {
  const user = UserProfile.getUser();
  const admin = user.isAdmin;
  
  const [dataGw, setDataGw] = useState([]);
  const URL = proxy + "http://203.162.235.53:8080/api/gateways?limit=1000";
  const header ={
      headers: {
        Accept: "application/json",
        "Grpc-Metadata-Authorization": key
      }
    }

  useEffect(() => {
    if(admin){
      fetchData();
      fetchSummaryGw();
      fetchSummaryDv();
    }
  }, []);



  const fetchData = () => {
      fetch(URL, header)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              setDataGw(response.result);
          })

  }

  const [summaryGw, setSummaryGw] = useState([]);
  const URLSummary = proxy + "http://203.162.235.53:8080/api/internal/gateways/summary";



  const fetchSummaryGw = () => {
      fetch(URLSummary, header)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              setSummaryGw(response);
          })

  }

  const [summaryDv, setSummaryDv] = useState([]);
  const URLSummary2 = proxy + "http://203.162.235.53:8080/api/internal/devices/summary";



  const fetchSummaryDv = () => {
      fetch(URLSummary2, header)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              setSummaryDv(response);
          })

  }

  
  console.log(JSON.parse(localStorage.getItem("user")));
  
  if(admin){
  return (
    <section className='home'>
        <div className="title text">
          <b>Dashboard</b>
        </div>
        <div className="card-grid">
          <Grid container spacing={3}>
            <DashboardLayout gateways={dataGw} gatewaySummary={summaryGw} deviceSummary={summaryDv}/>
          </Grid>
        </div>
    </section>
  )
  }else{
    return(<></>)
  }
}

export default Dashboard