import React from "react";
import ReactApexChart from "react-apexcharts";


const FollowBar = () => {

    const series = [{
        name: 'Follower Count',
        data: [13,-4,-1,14,16,5,18]
    }]
    const options =  {
          chart: {
            type: 'bar',
            // height: 350
          },
          plotOptions: {
            bar: {
              colors: {
                ranges: [{
                  from: -100,
                  to: -46,
                  color: '#F15B46'
                }, {
                  from: -45,
                  to: 0,
                  color: '#FEB019'
                }]
              },
              columnWidth: '80%',
            }
          },
          dataLabels: {
            enabled: false,
          },
          yaxis: {
            title: {
              text: 'Gain/Loss',
            },
            labels: {
              formatter: function (y) {
                return y.toFixed(0);
              }
            }
          },
          xaxis: {
            categories: ['Sunday','Monday','Tuesday',"Wednesday","Thursday", "Friday", "Saturday"],
            labels: {
              rotate: -90
            }
          }
        }
      
      
      
    
      return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>)
};

export default FollowBar