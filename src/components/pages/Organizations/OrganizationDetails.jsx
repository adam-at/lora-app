import React, {useState, useEffect} from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';


import '../../../App.css';
import "../../css/Form.css";
import '../../css/Dashboard.css';
import '../../css/Navbar.css';

import {TabPanel} from "../../Tabs.jsx";
import DashboardLayout from '../../DashboardLayout';
import UpdateOrganizationForm from '../../Organizations/UpdateOrganizationForm';
import {key} from "../../jwt";


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
  const URL = "http://203.162.235.53:8080/api/gateways?limit=1000&organizationID="+path[2];
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
  const URLSummary = "http://203.162.235.53:8080/api/internal/gateways/summary?organizationID="+path[2];



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
  const URLSummary2 = "http://203.162.235.53:8080/api/internal/devices/summary?organizationID="+path[2];



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
