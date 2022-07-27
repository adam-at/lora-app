import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../App.css';
import './Dashboard.css';
import './Navbar.css';
import Grid from '@mui/material/Grid';


function DashboardLayout(){
    return(
        <>
        <Grid item xs={3}>
            <Card sx={{ minWidth: 275 }} className="dark-if-needed">
              <CardContent>
                <div className="header grid-text">Active devices</div><hr/>
                <div className="devies-content grid-text"> No data available</div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ minWidth: 275 } } className="dark-if-needed">
              <CardContent>
              <div className="header grid-text"> Active gateways</div><hr/>
              <div className="gatewayscontent grid-text"> No data available</div>
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
                <div className="gateways-locations-content grid-text"> No data available</div>
              </CardContent>
            </Card>
          </Grid>
          </>
    )
}

export default DashboardLayout;