import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Cookies from 'js-cookie';
import env from "react-dotenv";

export default function DataTable({ transaction, fetchTransaction, setEditTransaction }) {
    const token = Cookies.get('token');
    async function remove(id) {
        if (!window.confirm("Are You Sure ?")) return;
        // console.log("id -> ", id);
        // let a = 0;
        const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(res);
        if (res.ok) {
            // console.log(res);
            fetchTransaction();
            window.alert('Deleted Successfully');
        }
    }
    function formatDate(originalDate) {
        const date = new Date(originalDate);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
    }
    return (
        <Container>
            <Typography variant="h6"> All Transactions </Typography>
            <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Amount</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transaction.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" align='center'>
                                    {row.amount}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="center">{formatDate(row.date)}</TableCell>
                                <TableCell align='center'>
                                    <IconButton aria-label="edit" color='primary' onClick={() => setEditTransaction(row)}>
                                        <EditSharpIcon />
                                    </IconButton>
                                    <IconButton aria-label="delete" color='primary' onClick={() => remove(row._id)}>
                                        <DeleteSharpIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}