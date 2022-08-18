import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import'../App.css';
import Button from '@mui/material/Button';

import './Dashboard.css';
import './Table.css';
import './Navbar.css';
import "./Form.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import PowerPlug from "mdi-material-ui/PowerPlug";

import {TablePaginationActions} from './TablePagination.jsx';
import {key} from "./jwt";
import Link from '@mui/material/Link';
import {proxy} from "./Proxy";

import moment from "moment";


function ApplicationDevices(){

    const path = window.location.pathname.split('/');
    const [data, getData] = useState([]);
    const URL = proxy + "http://203.162.235.53:8080/api/devices?limit=1000&applicationID="+path[path.length-1];
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

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const navigate = useNavigate();

    const navigateToAddDevice = () => {
        navigate('devices/add');
      };

    const lastSeen = (date) =>{
        let lastSeenDate = "Never";
        if (date !== null) {
            lastSeenDate = moment(data.lastSeenAt).format("lll");
        };
        return lastSeenDate;
    }

    const margin = (obj) => {
        let margin = "n/a";
        if (obj.deviceStatusMargin !== undefined && obj.deviceStatusMargin !== 256) {
            margin = `${obj.deviceStatusMargin} dB`;
          };
        return margin;

    }

    const battery = (obj) => {
        let battery = "n/a";
        if (!obj.deviceStatusExternalPowerSource && !obj.deviceStatusBatteryLevelUnavailable) {
            battery = `${obj.deviceStatusBatteryLevel}%`
          }
      
          if (obj.deviceStatusExternalPowerSource) {
            battery = <PowerPlug />;
          }
        return battery;
    }

    return(
        <> 
        <div className="add-button-device">
        <Button variant="contained" onClick={navigateToAddDevice}><FontAwesomeIcon icon={solid("plus")}/>Add device</Button>
        </div>
        <div className="form-with-tabs">
            <TableContainer component={Paper} className="table-devices dark-if-needed">
                <Table sx={{ minWidth: 1000 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 300 }}>Last seen</TableCell>
                            <TableCell sx={{ width: 300 }}>Device name</TableCell>
                            <TableCell sx={{ width: 300 }}>Device EUI</TableCell>
                            <TableCell sx={{ width: 300 }}>Device profile</TableCell>
                            <TableCell sx={{ width: 300 }}>Link margin</TableCell>
                            <TableCell sx={{ width: 300 }}>Battery</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : data).map((item,i) => (
                            <TableRow hover
                            key={i}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {lastSeen(item.lastSeenAt)}
                            </TableCell>
                            <TableCell>
                            <Link href={item.applicationID+'/devices/'+item.devEUI}>{item.name}</Link>    
                            </TableCell>
                            <TableCell>{item.devEUI}</TableCell>
                            <TableCell>
                            <Link href={"/organizations/"+path[2]+"/device-profiles/"+item.deviceProfileID}>{item.deviceProfileName}</Link>    
                            </TableCell>
                            <TableCell>{margin(item)}</TableCell>
                            <TableCell>{battery(item)}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={6}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
        </>
    );
}

export default ApplicationDevices;