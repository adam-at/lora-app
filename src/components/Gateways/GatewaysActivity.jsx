import React, {useState, useEffect} from 'react';

import "../css/Dashboard.css";
import "../css/Map.css";
import { CircularProgress } from "@mui/material";
import { Doughnut } from 'react-chartjs-2';
import {ArcElement} from 'chart.js';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);





export default function GatewaysActivity (props){

    let data = null;
    const sum = props.summary;
    const [noData, setNoData] = useState(false);
    useEffect(() => {
        setInterval(() => {
          setNoData(true);
        }, 1400);
      }, []);

    
    if(sum.length!==0 && (sum.activeCount !== 0 || sum.inactiveCount !== 0 || sum.neverSeenCount !==0)){
        data = {
            labels: ["Never seen", "Inactive", "Active"],
            datasets: [
              {
                data: [sum.neverSeenCount, sum.inactiveCount, sum.activeCount],
                backgroundColor: [
                    'rgb(204, 102, 0)',
                    'rgb(153, 0, 0)',
                    'rgb(76, 153, 0)'
                ],
              },
            ],
          };

        return(
            <>
            <Doughnut data={data} className="doughnut-chart" />
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