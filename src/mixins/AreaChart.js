import React from "react";
import ReactApexChart from "react-apexcharts";
import clsx from 'clsx';
import{ makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

const AreaChart = ({ className, ...rest }) => {

    const useStyles = makeStyles(() => ({
        root: {
          height: '100%'
        }
    }));
    
    const classes = useStyles();

    const series = [
        {
          name: "XYZ MOTORS",
          data: [[1, 34], [3.8, 43], [5, 31] , [10, 43], [13, 33], [15, 43], [18, 33] , [20, 52]]
          
        }
      ];
      const options = {
        chart: {
          type: "area",
          stacked: false,
          height: 30,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          colors:['#3F51B5'],
          toolbar: {
            autoSelected: "zoom",
          },
        },
        fill: {
            colors:['#3F51B5']
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0
        },
        fill: {
            colors: '#3F51B5',
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
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
          type: "datetime",
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
            <ReactApexChart
            options={options}
            series={series}
            type="area"
            />
    </Card>
  );
};

export default AreaChart;
