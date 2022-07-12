import React, { useState, useEffect } from 'react';
import'../App.css';
import Button from '@mui/material/Button';
import './Dashboard.css';
import './NetworkServers.css'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'



function ApiKeys(){

    const [data, getData] = useState([]);
    const URL = 'https://jsonplaceholder.typicode.com/posts';
 
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
             <b>API Keys</b>
        </div>
        <div className="add-button">
            <Button variant="contained"><FontAwesomeIcon icon={solid("plus")}/>Add</Button>
        </div>
        <table className="table">
            <tbody>
                <tr className='text ttext'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Admin Key</th>
                </tr>
                {data.map((item, i) => (
                    <tr key={i} className='text ttext'>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td> <FontAwesomeIcon icon={item.isAdmin ? solid("times") : solid("check")}/> </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
    );
}

export default ApiKeys