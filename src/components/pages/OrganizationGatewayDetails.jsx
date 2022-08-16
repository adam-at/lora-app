import React from 'react';
import '../../App.css';
import UpdateOrganizationGatewayForm from '../UpdateOrganizationGatewayForm';
import "../Form.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {TabPanel} from "../Tabs.jsx";
import '../Dashboard.css';
import '../Navbar.css';
import Grid from '@mui/material/Grid';


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
      <div className="title text"> <b> Gateway details </b></div>
      <div className="organization-tabs">
        <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where each tab needs to be selected manually"
      >
        <LinkTab label="Details" />
        <LinkTab label="Configuration" href="/edit"/>
        <LinkTab label="Certificate" href="/certificate"/>
        <LinkTab label="Gateway Discovery" href="/discovery"/>
        <LinkTab label="Live Lorawan Frame" href="/frame"/>
      </Tabs>
      </div>
      <TabPanel value={value} index={0}>
          <p>To do</p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpdateOrganizationGatewayForm/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <p>To do</p>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <p>To do</p>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <p>To do</p>
      </TabPanel>

    </section>
  )
}

export default UpdateOrganization
