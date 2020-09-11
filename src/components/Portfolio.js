import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Taskbar from "./Taskbar";
import Paper from "@material-ui/core/Paper";
import AreaChart from "../containers/graphs/AreaChart";
import Donut from "../containers/graphs/Donut";

const Portfolio = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const series = [
    {
      name: "XYZ MOTORS",
      data: [
        [1, 34],
        [3.8, 43],
        [5, 31],
        [10, 43],
        [13, 33],
        [15, 43],
        [18, 33],
        [20, 52],
      ],
    },
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
      size: 0,
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
    <div className="body">
      <Taskbar />
      <div id="port-ident" className="dash">
        <h1 className="port-name">Portfolio 1</h1>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className="port-menu"
        >
          Switch Portfolio
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Portfolio 1</MenuItem>
          <MenuItem onClick={handleClose}>Portfolio 2</MenuItem>
          <MenuItem onClick={handleClose}>Portfolio 3</MenuItem>
        </Menu>
      </div>
      <div className="dash">
        <Paper id="port-chart" className="char">
          <AreaChart options={options} series={series} height={500} />
        </Paper>
      </div>
      <div className="dash">
        <Paper id="donut-chart">
          <Donut />
        </Paper>
        <Paper id="port-info">
            
        </Paper>
      </div>
    </div>
  );
};

export default Portfolio;
