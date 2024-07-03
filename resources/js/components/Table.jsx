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

const loadData = (perPage, page, model) => {
    return axios.get(`/api/v1/${model}?page=${page}&per_page=${perPage}`)
    .then(res => {
        return res.status === 200 ? res : Promise.reject(res)})
};

export default function DataTable({perPage, page, model}) {
  return <Async promiseFn={() => loadData(perPage, page, model)}>
        {
            ({data, error, isLoading}) => {
                if (isLoading) return 'Loading...';
                if (error) return `Something went wrong: ${error.message}`;
                if (data) {
                    data = data.data.data;
                    const pages_num = data[0].pages_num;
                    data.map((elem) => delete elem.pages_num);
                    const col_names = Object.keys(data[0]);

                    return (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    {col_names.map((col_name) => <TableCell>{col_name}</TableCell>)}
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {data.map((row) => (
                                    <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    {col_names.map((col_name) => <TableCell>{eval('row.' + col_name)}</TableCell>)}
                                    </TableRow>
                                ))}
                                </TableBody>
                                <TableFooter>
                                <Pagination
                                    page={page}
                                    count={pages_num}
                                    renderItem={(item) => (
                                        <PaginationItem
                                        component={Link}
                                        to={`${(new URL(window.location.href)).origin}/${model}?page=${item.page}&per_page=${perPage}`}
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