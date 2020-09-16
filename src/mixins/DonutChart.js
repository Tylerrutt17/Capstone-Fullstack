import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';


const DonutChart = (props) => {
  return (
    <Doughnut options={props.options} series={props.series} />
  );
};

export default DonutChart;
