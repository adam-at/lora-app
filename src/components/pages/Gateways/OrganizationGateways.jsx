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

import {TablePaginationActions} from '../../TablePagination.jsx';
import {key} from "../../jwt";
import LastSeen from "../../LastSeen";
import UserProfile from '../../Users/UserProfile';


function OrganizationGateways(){
    const path = window.location.pathname.split('/');
  
    const user = UserProfile.getUser();
    const admin = user.isAdmin;
  
    const org = UserProfile.getOrganizationFromId(path[2]);
    const orgAdmin = org && org.isAdmin;
    const gwAdmin = org && org.isGatewayAdmin;
    const permitted = admin || orgAdmin || gwAdmin;

    
    const [data, getData] = useState([]);
    const URL = "http://203.162.235.53:8080/api/gateways?limit=1000&organizationID="+window.location.pathname.substring(15,window.location.pathname.length-9);
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

    const navigateToAddGateway = () => {
        navigate('add');
      };

      

    return(
    <section className="home">
        <div className="title text">
             <b>Organization Gateways</b>
        </div>
        {permitted && (
        <div className="add-button">
            <Button variant="contained" onClick={navigateToAddGateway}><FontAwesomeIcon icon={solid("plus")}/>Add</Button>
        </div>
        )}
        <div className="table">
            <TableContainer component={Paper} className="dark-if-needed">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 120 }}>Last Seen</TableCell>
                            <TableCell sx={{ width: 120 }}>Name</TableCell>
                            <TableCell sx={{ width: 120 }}>Gateway ID</TableCell>
                            <TableCell sx={{ width: 120 }}>Network server</TableCell>
                            <TableCell sx={{ width: 120 }}>Gateway Activity</TableCell>
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
                                <LastSeen gateway={item}/>
                            </TableCell>
                            <TableCell>
                                <Link href={'gateways/'+item.id}>{item.name}</Link>
                            </TableCell>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.networkServerName}</TableCell>
                            <TableCell> No data </TableCell>
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
                            colSpan={5}
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

export default OrganizationGateways;