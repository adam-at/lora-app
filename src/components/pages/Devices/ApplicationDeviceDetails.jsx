import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import '../../../App.css';
import "../../css/Form.css";
import '../../css/Dashboard.css';
import '../../css/Navbar.css';

import {TabPanel} from "../../Tabs.jsx";
import UpdateDeviceForm from '../../Devices/UpdateDeviceForm';
import DeviceDetails from '../../Devices/DeviceDetails';
import DeviceData from '../../Devices/DeviceData';


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

function ApplicationDeviceDetails() {

  

//Handling tabs
const [value, setValue] = React.useState(0);
const handleChange = (event, newValue) => {
  setValue(newValue);
};

  return (
    <section className="home">
      <div className="title text"> <b> Device details </b></div>
      <div className="organization-tabs">
        <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <LinkTab label="Details" />
        <LinkTab label="Configuration" href="/edit"/>
        <LinkTab label="Data" href="/data"/>
      </Tabs>
      </div>
      <TabPanel value={value} index={0}>
          <DeviceDetails/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpdateDeviceForm/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DeviceData/>
      </TabPanel>

    </section>
  )
}

export default ApplicationDeviceDetails;
