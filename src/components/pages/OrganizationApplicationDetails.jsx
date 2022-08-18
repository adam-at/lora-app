import React from 'react';
import '../../App.css';
import UpdateOrganizationApplicationForm from '../UpdateOrganizationApplicationForm';
import "../Form.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {TabPanel} from "../Tabs.jsx";
import '../Dashboard.css';
import '../Navbar.css';
import ApplicationDevices from '../ApplicationDevices';


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

function OrganizationApplicationDetails() {

  

//Handling tabs
const [value, setValue] = React.useState(0);
const handleChange = (event, newValue) => {
  setValue(newValue);
};

  return (
    <section className="home">
      <div className="title text"> <b> Application details </b></div>
      <div className="organization-tabs">
        <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <LinkTab label="Devices" />
        <LinkTab label="Configuration" href="/edit"/>
      </Tabs>
      </div>
      <TabPanel value={value} index={0}>
          <ApplicationDevices/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpdateOrganizationApplicationForm/>
      </TabPanel>

    </section>
  )
}

export default OrganizationApplicationDetails;
