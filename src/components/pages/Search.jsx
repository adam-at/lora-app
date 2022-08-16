import React, { useState, useEffect } from "react";
import {key} from "../jwt";
import SearchResults from "../SearchResults.jsx";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {proxy} from "../Proxy";

function Search() {

    const [data, getData] = useState([]);
    const URL = proxy + "http://203.162.235.53:8080/api/internal"+window.location.href.substring(21)+"&limit=1000";
    console.log(window.location.pathname);
    console.log(window.location.href.substring(21));
    const header ={
        headers: {
          Accept: "application/json",
          "Grpc-Metadata-Authorization": key 
        }
      }
 
    useEffect(() => {
        fetchData()
    }, [])
 
 
    const fetchData = () => {
        fetch(URL, header)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                getData(response.result);
            })
 
    }

    return(
    <section className="home">
    <div className="title text">
        <b>Search</b>
    </div>
    <div className="table">
      <TableContainer component={Paper} className="dark-if-needed">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                    <TableCell>Kind</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell></TableCell>
                    <TableCell>ID</TableCell>
                  </TableRow>
              </TableHead>
              <SearchResults result={data}></SearchResults>
          </Table>
      </TableContainer>
  </div>
  </section>
);
}

export default Search;