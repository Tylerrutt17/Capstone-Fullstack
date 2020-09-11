import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Taskbar from "./Taskbar";
import AreaChart from "../containers/graphs/AreaChart"

const Dashboard = (props) => {
    const series = [
        {
          name: "XYZ MOTORS",
          data: [[1, 34], [3.8, 43], [5, 31] , [10, 43], [13, 33], [15, 43], [18, 33] , [20, 52]],
          
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
          toolbar: {
            autoSelected: "zoom",
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0
        },
        title: {
          text: "Stock Price Movement",
          align: "left",
        },
        fill: {
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
    <div id="body">
      <Taskbar />
      <div className="dash">
        <Paper id="info-card" pct="179%">
          <h4>Total Change</h4>
          <h5>179%</h5>
        </Paper>
        <Paper id="info-card" pct="179%">
          <h3>Lobster Total</h3>
          <h5>$14,345.23</h5>
        </Paper>
        <Paper id="info-card" pct="179%">
          <h4>Change in dollars</h4>
          <h5>$7,845.29</h5>
        </Paper>
      </div>
      <div className="dash">
        <Paper className="char">
            <AreaChart options={options} series={series} height={350}/>
        </Paper>
        
      </div>
    </div>
  );
};

export default Dashboard;
