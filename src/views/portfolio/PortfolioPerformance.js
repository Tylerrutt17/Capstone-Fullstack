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

  
  const series = [
    {
      name: "Portfolio 1",
      data: [[1, 34], [3.8, 43], [5, 31] , [10, 43], [13, 33], [15, 43], [18, 33] , [20, 52]]
      
    }
  ];
  const options = {
    chart: {
      height: '400px',
      type: "area",
      stacked: false,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      
      toolbar: {
        autoSelected: "zoom",
      },
    },
    colors:['#3F51B5'],
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0
    },
    fill: {
        colors: '#3F51B5',
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
      title: {
        text: "Price",
      },
    },
    xaxis: {
      // type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
    },
  };

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
