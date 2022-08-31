import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import'../../App.css';
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

import '../css/Dashboard.css';
import '../css/Table.css';
import '../css/Navbar.css';

import {TablePaginationActions} from '../TablePagination.jsx';
import {key} from "../jwt";
import UserProfile from "../Users/UserProfile";

function Organizations(){
    const user = UserProfile.getUser();
    const admin = user.isAdmin;

    
    const [data, getData] = useState([]);
    const URL = "http://203.162.235.53:8080/api/organizations?limit=1000";
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
 
    };

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

    const navigateToAddOrganization = () => {
        //  navigate to /add-organization
        navigate('/add-organization');
      };

    const navigateToOrganization = (e) =>{
        navigate("/organizations/"+e)
    }

    if(admin){
    return(
    <section className="home">
        <div className="title text">
             <b>Organizations</b>
        </div>
        <div className="add-button">
            <Button variant="contained" onClick={navigateToAddOrganization}><FontAwesomeIcon icon={solid("plus")}/>Add</Button>
        </div>
        <div className="table">
            <TableContainer component={Paper} className="dark-if-needed">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 216 }}>Name</TableCell>
                            <TableCell sx={{ width: 216 }}>Display name</TableCell>
                            <TableCell sx={{ width: 216 }}>Can have gateways</TableCell>

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
                            <Link onClick={() => navigateToOrganization(item.id)}>{item.name}</Link>
                            </TableCell>
                            <TableCell>{item.displayName}</TableCell>
                            <TableCell> <FontAwesomeIcon icon={item.canHaveGateways ? solid("check") : solid("times")}/></TableCell>
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
                            colSpan={3}
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
    }else{
        return(<></>)
    }
}

export default Organizations