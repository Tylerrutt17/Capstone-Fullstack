import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';


const DonutChart = ({data,options}) => {
  return (
    <Doughnut options={options} data={data} />
  );
};

export default DonutChart;
