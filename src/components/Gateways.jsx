import React, { useState, useEffect } from 'react';
import'../App.css';
import {Button} from './Button';
import './Dashboard.css';
import './NetworkServers.css'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'



function Gateways(){

    const [data, getData] = useState([]);
    const URL = '';
 
    useEffect(() => {
        fetchData()
    }, [])
 
 
    const fetchData = () => {
        fetch(URL)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                getData(response);
            })
 
    }

    return(
    <section className="home">
        <div className="title text">
             <b>Gateways</b>
        </div>
        <div className="add-button">
            <Button><FontAwesomeIcon icon={solid("plus")}/>Add</Button>
        </div>
        <table className="table">
            <tbody>
                <tr className='text ttext'>
                    <th>Name</th>
                    <th>Network Server</th>
                </tr>
                {data.map((item, i) => (
                    <tr key={i} className='text ttext'>
                        <td>{item.name}</td>
                        <td>{item.networkServerName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
    );
}

export default Gateways;