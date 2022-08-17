import React, {useState, useEffect} from 'react';

import "./Dashboard.css";
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import "./Map.css";
import {Icon} from 'leaflet';
import {Popup} from 'react-leaflet';
import { CircularProgress, Link } from "@mui/material";
import LastSeen from "./LastSeen";




export default function GatewaysLocations (props){

    const data = props.gateways;
    const [noData, setNoData] = useState(false);
    useEffect(() => {
        setInterval(() => {
          setNoData(true);
        }, 1400);
      }, []);


    if(data.length!==0){
        return(
            <>
            <MapContainer className="map" center={[data[0]["location"]["latitude"],data[0]["location"]["longitude"]]} zoom={15} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data.map((gw,index) => 
                <Marker key={index}
                icon={new Icon({iconUrl: 'http://www.wanderfinder.com/wp-content/uploads/leaflet-maps-marker-icons/wifi.png', iconSize: [32, 37], iconAnchor: [16, 10]})}
                position={[gw.location.latitude,gw.location.longitude]}>
                    <Popup>
                    <Link href={'/organizations/'+gw.organizationID+'/gateways/'+gw.id}>{gw.name}</Link> <br/>
                    Last seen: &nbsp;
                    <LastSeen gateway={gw}/>
                    </Popup>
                </Marker>
                )}
              </MapContainer>
            </>
        )
    }
    else{
        return(<>
            {!noData && (
            <CircularProgress className="loading"/>
        )}
        {noData && (
            <div className="devies-content grid-text"> No data available</div>
        )}
        </>
        )
    }



}