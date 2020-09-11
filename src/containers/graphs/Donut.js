import React from "react";
import ReactApexChart from "react-apexcharts";

const Donut = (props) => {
    
    const series = [44, 55, 41, 17, 15]
    const options = {
        chart: {
        width: 380,
        type: 'donut',
        },
        plotOptions: {
        pie: {
            startAngle: -45
        }
        },
        dataLabels: {
        enabled: false
        },
        fill: {
        type: 'gradient',
        },
        labels:['AAPL','SBUX','NIO','TWTR','IBM'],
        legend: {
        formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
        }
        },
        title: {
        text: 'Gradient Donut with custom Start-angle'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                width: 200
                },
                legend: {
                position: 'bottom'
                }
            }
        }]
    }
      
      return (<ReactApexChart options={options} series={series} type="donut" width={380} />)
};
    
export default Donut;

    
    
