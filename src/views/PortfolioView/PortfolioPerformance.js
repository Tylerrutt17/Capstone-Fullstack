import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import AreaChart from 'src/mixins/AreaChart';

const useStyles = makeStyles(() => ({
  root: {}
}));

const PortfolioPerformance = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  
  const series = [{
    name: 'Value',
    data: [31, 40, 28, 51, 42, 109, 100],
    type: 'area'
  }, {
    name: 'Followers',
    data: [11, 32, 45, 32, 34, 52, 41],
    type:'line'
  }]
  const options = {
    chart: {
      height: 350,
      dropShadow: {
        enabled: [false,true]
      },
    },
    colors:['#3F51B5','#A72927'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      dashArray: [0,9],
      width: [3,10]
    },
    markers: {
      size: [0,8]
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  }




  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Performance Summary"
      />
      <Divider />
      <CardContent>
        <Box
          position="relative"
          // height={400}
        >
          <AreaChart
            series = {series}
            options={options}
            type='area'
          />
        </Box>
      </CardContent>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
      </Box>
    </Card>
  );
};

PortfolioPerformance.propTypes = {
  className: PropTypes.string
};

export default PortfolioPerformance;
