import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Async from 'react-async';
import { TableFooter } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { Link } from 'react-router-dom';

const loadData = (perPage, page) => {
    return axios.get(`api/v1/operations?page=${page}&per_page=${perPage}`)
    .then(res => {
        return res.status === 200 ? res : Promise.reject(res)})
};

export default function DataTable({perPage, page}) {
  return <Async promiseFn={() => loadData(perPage, page)}>
        {
            ({data, error, isLoading}) => {
                if (isLoading) return 'Loading...';
                if (error) return `Something went wrong: ${error.message}`;
                if (data) {
                    data = data.data.data;
                    return (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>id</TableCell>
                                    <TableCell align="right">Number</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Created at</TableCell>
                                    <TableCell align="right">Updated at</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {data.map((row) => (
                                    <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.number}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.created_at}</TableCell>
                                    <TableCell align="right">{row.updated_at}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                                <TableFooter>
                                <Pagination
                                    page={page}
                                    count={data[0].pages_num}
                                    renderItem={(item) => (
                                        <PaginationItem
                                        component={Link}
                                        to={`/operations?page=${item.page}&per_page=${perPage}`}
                                        {...item}
                                        />
                                    )}/>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    );
                }
            }
        }
        
    </Async>
}