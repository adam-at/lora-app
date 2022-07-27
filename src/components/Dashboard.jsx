import React from 'react';
import '../App.css';
import './Dashboard.css';
import './Navbar.css';
import Grid from '@mui/material/Grid';
import DashboardLayout from './DashboardLayout';

function Dashboard() {
  return (
    <section className='home'>
        <div className="title text">
          <b>Dashboard</b>
        </div>
        <div className="card-grid">
          <Grid container spacing={3}>
            <DashboardLayout/>
          </Grid>
        </div>
    </section>
  )
}

export default Dashboard