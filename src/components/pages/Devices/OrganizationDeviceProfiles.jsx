import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

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
import Link from '@mui/material/Link';

import'../../../App.css';
import '../../css/Dashboard.css';
import '../../css/Table.css';
import '../../css/Navbar.css';

import {key} from "../../jwt";
import {TablePaginationActions} from '../../TablePagination.jsx';
import UserProfile from "../../Users/UserProfile";


function OrganizationDeviceProfiles(){
    const path = window.location.pathname.split('/');
    const org = UserProfile.getOrganizationFromId(path[2]);
    

    
    const [data, getData] = useState([]);
    const URL = "http://203.162.235.53:8080/api/device-profiles?limit=1000&organizationID="+path[2];
    const header ={
        headers: {
          Accept: "application/json",
          "Grpc-Metadata-Authorization": key
        }
      }
 
    useEffect(() => {
        fetchData()
    }, []);
 
 
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

    const navigateToAddDeviceProfile = () => {
        navigate('add');
      };


    return(
    <section className="home">
        <div className="title text">
             <b>Organization Device Profiles</b>
        </div>
        {(org.isAdmin || org.isDeviceAdmin) && (
            <>
            <div className="add-button">
            <Button variant="contained" onClick={navigateToAddDeviceProfile}><FontAwesomeIcon icon={solid("plus")}/>Add</Button>
            </div>
            </>
        )}
        <div className="table">
            <TableContainer component={Paper} className="dark-if-needed">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 200 }}>Name</TableCell>
                            <TableCell sx={{ width: 200 }}>ID</TableCell>
                            <TableCell sx={{ width: 200 }}>Network server</TableCell>
                            <TableCell sx={{ width: 50 }}></TableCell>
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
                                {item.name}
                            </TableCell>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.networkServerName}</TableCell>
                            <TableCell> <Link href={'device-profiles/'+item.id}><FontAwesomeIcon icon={solid("pen-to-square")}/></Link></TableCell>
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
                            colSpan={4}
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
    </section>
    );
}

export default OrganizationDeviceProfiles;