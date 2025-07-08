import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CompareCustomTable = ({ rows, TableName, username1, username2 }) => {
    return (
        <div>
            <TableContainer component={Paper}
          sx={{
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden' // Ensures corners clip inner table
          }}>
                <Table>
                    <TableHead
                        sx={{
                            backgroundColor: 'rgba(62, 132, 212, 0.8)'
                        }}
                    >
                        <TableRow>
                            <TableCell sx={{ borderBottom: 'none' }}>
                                <strong>{TableName}</strong>
                            </TableCell>
                            <TableCell sx={{ borderBottom: 'none' }} align="right">
                                <strong>{username1}</strong>
                            </TableCell>
                            <TableCell sx={{ borderBottom: 'none' }} align="right">
                                <strong>{username2}</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            backgroundColor: 'rgb(193, 232, 247)'
                        }}
                    >
                        {Array.isArray(rows) && rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{ borderBottom: 'none' }} component="th" scope="row">
                                <strong>{row?.name ?? '—'}</strong>
                                </TableCell>
                                <TableCell sx={{ borderBottom: 'none' }} align="right">
                                <strong>{row?.data1 ?? '—'}</strong>
                                </TableCell>
                                <TableCell sx={{ borderBottom: 'none' }} align="right">
                                <strong>{row?.data2 ?? '—'}</strong>
                                </TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CompareCustomTable;
