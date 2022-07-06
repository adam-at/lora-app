import React from 'react';
import'../App.css';
import {Button} from './Button';
import './Dashboard.css';
import './Navbar.css'

function Dashboard() {
  return (
    <section className='home'>
        <div className="title text">
          <b>Dashboard</b>
        </div>
        <div className="card-grid">
          <div className="grid-item">
            <div className="devices-header grid-text"> Active devices</div>
            <div className="devies-content grid-text"> No data available</div>
          </div>
          <div className="grid-item">
            <div className="gateways-header grid-text"> Active gateways</div>
            <div className="gatewayscontent grid-text"> No data available</div>
          </div>
          <div className="grid-item">
            <div className="data-usage-header grid-text"> Device data-rate usage</div>
            <div className="data-usage-content grid-text"> No data available</div>
          </div>
          <div className="grid-item">
            <div className="gateways-locations-header grid-text"> Gateway Locations</div>
            <div className="gateways-locations-content grid-text"> No data available</div>
          </div>

        </div>
    </section>
  )
}

export default Dashboard