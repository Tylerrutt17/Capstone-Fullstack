import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AllocationSlider from './elements/AllocationSlider';

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
});

function createData(stock, allocation) {
  return { stock, allocation};
}

const rows = [
    createData('Apple', 'AAPL', 3.7, 67),
    createData('Tesla', 'TSLA', 25.0, 51),
    createData('GE', 'GE', 1.0, 24),
    createData('Twitter', 'TWTR', 6.0, 24),
    createData('Groupon', 'GRP', 6.0, 49),
    createData('Homewell', 'HWL', 3.2, 87),
    createData('The Home Depot', 'THD', 9.0, 37),
    createData('Jelly Belly', 'JB', -2.3, 94),
    createData('Walmart', 'WM', 26.0, 65),
    createData('kellogs', 'KLG', 0.2, 98),
    createData('Microsoft', 'MSFT', -6.3, 81),
    createData('Splunk', 'SPLK', -19.0, 9),
    createData('Bitcoin', 'BTC', 18.0, 63)
  ];

export default function AcccessibleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <caption>Select your desired allocation using the sliders above</caption>
        <TableHead>
          <TableRow>
            {/* <TableCell align="right">Delete Stock</TableCell> */}
            <TableCell>Stock</TableCell>
            <TableCell align="right">Allocation amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.stock}>
              <TableCell component="th" scope="row">
                {row.stock}
              </TableCell>
              <TableCell align="right"><AllocationSlider/></TableCell>
              {/* <TableCell align="right"><AllocationSlider/></TableCell>
              <TableCell align="right"><AllocationSlider/></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
