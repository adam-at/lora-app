import React from "react";
import { Link } from "react-router-dom";
import { TableBody } from "@mui/material";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import {TablePaginationActions} from './TablePagination.jsx';

function SearchResults(props) {

    const ApplicationResult = (props) => {
          return(
            <>
              <TableCell >application</TableCell>
              <TableCell><Link  to={`/organizations/${props.result.organizationID}/applications/${props.result.applicationID}`}>{props.result.applicationName}</Link></TableCell>
              <TableCell>organization: <Link  to={`/organizations/${props.result.organizationID}`}>{props.result.organizationName}</Link></TableCell>
              <TableCell>{props.result.applicationID}</TableCell>
            </>
          );
      }
      
      
      const OrganizationResult = (props) => {
          return(
            <>
              <TableCell >organization</TableCell>
              <TableCell><Link  to={`/organizations/${props.result.organizationID}`}>{props.result.organizationName}</Link></TableCell>
              <TableCell></TableCell>
              <TableCell>{props.result.organizationID}</TableCell>
            </>
          );
        };
      
      
      const DeviceResult = (props) => {
          return(
              <>
              <TableCell >device</TableCell>
              <TableCell><Link  to={`/organizations/${props.result.organizationID}/applications/${props.result.applicationID}/devices/${props.result.deviceDevEUI}`}>{props.result.deviceName}</Link></TableCell>
              <TableCell>organization: <Link  to={`/organizations/${props.result.organizationID}`}>{props.result.organizationName}</Link>, application: <Link  to={`/organizations/${props.result.organizationID}/applications/${props.result.applicationID}`}>{props.result.applicationName}</Link></TableCell>
              <TableCell>{props.result.deviceDevEUI}</TableCell>
              </>
          );
      };
      
      
      const GatewayResult = (props) => {
          return(
            <>
              <TableCell >gateway</TableCell>
              <TableCell><Link  to={`/organizations/${props.result.organizationID}/gateways/${props.result.gatewayMAC}`}>{props.result.gatewayName}</Link></TableCell>
              <TableCell>organization: <Link  to={`/organizations/${props.result.organizationID}`}>{props.result.organizationName}</Link></TableCell>
              <TableCell>{props.result.gatewayMAC}</TableCell>
            </>
          );
        };
      

    const getRow = (obj) => {
        switch (obj.kind) {
            case "application":
              return <ApplicationResult result={obj}/>
            case "organization":
              return <OrganizationResult result={obj}/>
            case "device":
              return <DeviceResult result={obj}/>
            case "gateway":
              return <GatewayResult result={obj}/>
            default:
              break;
          }
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.result.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return(
        <>
        <TableBody>
            {(rowsPerPage > 0
            ? props.result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props).map((item,i) => 
            (
            <TableRow hover
            key={i}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
           {getRow(item)}
            </TableRow>
            )
            )}
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
            count={props.result.length}
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
        </>

);
}

export default SearchResults;