import React from 'react';
import '../../App.css';
import UpdateOrganizationGatewayForm from '../UpdateOrganizationGatewayForm';
import "../Form.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {TabPanel} from "../Tabs.jsx";
import '../Dashboard.css';
import '../Navbar.css';
import GatewayDetails from '../GatewayDetails';


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

function OrganizationGatewayDetails() {

  

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
      </Tabs>
      </div>
      <TabPanel value={value} index={0}>
          <GatewayDetails/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpdateOrganizationGatewayForm/>
      </TabPanel>

    </section>
  )
}

export default OrganizationGatewayDetails;