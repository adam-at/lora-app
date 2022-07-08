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
            <div className="header grid-text">Active devices</div><hr/>
            <div className="devies-content grid-text"> No data available</div>
          </div>
          <div className="grid-item">
            <div className="header grid-text"> Active gateways</div><hr/>
            <div className="gatewayscontent grid-text"> No data available</div>
          </div>
          <div className="grid-item">
            <div className="header grid-text"> Device data-rate usage</div><hr/>
            <div className="data-usage-content grid-text"> No data available</div>
          </div>
          <div className="grid-item">
            <div className="header grid-text"> Gateway Locations</div><hr/>
            <div className="gateways-locations-content grid-text"> No data available</div>
          </div>

        </div>
    </section>
  )
}

export default Dashboard