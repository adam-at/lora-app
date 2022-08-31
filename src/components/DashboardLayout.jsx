import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../App.css';
import './css/Dashboard.css';
import './css/Navbar.css';
import Grid from '@mui/material/Grid';
import GatewaysLocations from './Gateways/GatewaysLocations';
import GatewaysActivity from './Gateways/GatewaysActivity';
import DevicesActivity from './Devices/DevicesActivity';


function DashboardLayout(props){
    return(
        <>
        <Grid item xs={3}>
            <Card sx={{ minWidth: 275 }} className="dark-if-needed">
              <CardContent>
                <div className="header grid-text">Active devices</div><hr/>
                <DevicesActivity summary={props.deviceSummary}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ minWidth: 275 } } className="dark-if-needed">
              <CardContent>
              <div className="header grid-text"> Active gateways</div><hr/>
              <GatewaysActivity summary={props.gatewaySummary}/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ minWidth: 275 }} className="dark-if-needed">
              <CardContent>
                <div className="header grid-text"> Device data-rate usage</div><hr/>
                <div className="data-usage-content grid-text"> No data available</div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9}>
          <Card sx={{ minWidth: 275 }} className="dark-if-needed">
              <CardContent>
                <div className="header grid-text"> Gateway Locations</div><hr/>
                <GatewaysLocations gateways={props.gateways}/>
              </CardContent>
            </Card>
          </Grid>
          </>
    )
}

export default DashboardLayout;