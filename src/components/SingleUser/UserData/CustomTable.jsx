import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CustomTable = ({ rows, TableName }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'rgba(62, 132, 212, 0.8)' }}>
            <TableCell align="center" colSpan={2} sx={{ borderBottom: 'none' }}>
              <strong>{TableName}</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ backgroundColor: 'rgba(193, 232, 247, 0.9)' }}>
              <TableCell component="th" scope="row" sx={{ borderBottom: 'none' }}>
                <strong>{row.name}</strong>
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: 'none' }}>
                <strong>{row.data}</strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
