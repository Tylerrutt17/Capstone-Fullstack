import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = (props) => {
 
  return (
    <ReactApexChart
      options={props.options}
      series={props.series}
      type="area"
      height={props.height}
    />
  );
};

export default AreaChart;
