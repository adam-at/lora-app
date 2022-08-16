import React from 'react';
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

function UpdateOrganization() {

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
          <DashboardLayout/>
        </Grid>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpdateOrganizationForm/>
      </TabPanel>

    </section>
  )
}

export default UpdateOrganization
