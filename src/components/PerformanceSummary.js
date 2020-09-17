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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AreaChart from 'src/mixins/AreaChart';

const useStyles = makeStyles(() => ({
  root: {}
}));

const PerformanceSummary = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  
  const series = [
    {
      name: "XYZ MOTORS",
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
      // type: "gradient",
      // gradient: {
      //   shadeIntensity: 1,
      //   inverseColors: false,
      //   opacityFrom: 0.5,
      //   opacityTo: 0,
      //   stops: [0, 90, 100],
      // },
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
            type="area"
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

PerformanceSummary.propTypes = {
  className: PropTypes.string
};

export default PerformanceSummary;
