import React from 'react';
import ReactApexChart from 'react-apexcharts';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

const AreaChart = (props) => {
  return (
    <ReactApexChart options={props.options} series={props.series} type={props.type} />
  );
};

export default AreaChart;
