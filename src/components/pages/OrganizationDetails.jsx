import React, {useState, useEffect} from 'react';
import '../../App.css';
import UpdateOrganizationForm from '../UpdateOrganizationForm';
import "../Form.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {TabPanel} from "../Tabs.jsx";
import '../Dashboard.css';
import '../Navbar.css';
import Grid from '@mui/material/Grid';
import DashboardLayout from '../DashboardLayout';

import {proxy} from "../Proxy";
import {key} from "../jwt";


function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function OrganizationDetails() {

  const [data, getData] = useState([]);
  const path = window.location.pathname.split('/');
  const URL = proxy + "http://203.162.235.53:8080/api/gateways?limit=1000&organizationID="+path[2];
  const header ={
      headers: {
        Accept: "application/json",
        "Grpc-Metadata-Authorization": key
      }
    }

  useEffect(() => {
      fetchData();
      fetchSummaryDv();
      fetchSummaryGw();
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

  const [summaryGw, setSummaryGw] = useState([]);
  const URLSummary = proxy + "http://203.162.235.53:8080/api/internal/gateways/summary?organizationID="+path[2];



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
  const URLSummary2 = proxy + "http://203.162.235.53:8080/api/internal/devices/summary?organizationID="+path[2];



  const fetchSummaryDv = () => {
      fetch(URLSummary2, header)
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              setSummaryDv(response);
          })

  }

//Handling tabs
const [value, setValue] = React.useState(0);
const handleChange = (event, newValue) => {
  setValue(newValue);
};

  return (
    <section className="home">
      <div className="title text"> <b> Organization details </b></div>
      <div className="organization-tabs">
        <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <LinkTab label="Dashboard" />
        <LinkTab label="Configuration" href="/edit"/>
      </Tabs>
      </div>
      <TabPanel value={value} index={0}>
        <div className="organization-dashboard">
        <Grid container spacing={3}>
          <DashboardLayout gateways={data} gatewaySummary={summaryGw} deviceSummary={summaryDv}/>
        </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpdateOrganizationForm/>
      </TabPanel>

    </section>
  )
}

export default OrganizationDetails;
