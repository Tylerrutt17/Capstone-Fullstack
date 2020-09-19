import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DonutChart from '../../mixins/DonutChart'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const PortfolioDonut = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63.20, 15.85, 23.45,23.58,13],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.green[600],
          colors.blue[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Tesla', 'Apple', 'Starbucks','General Eletric','Twitter']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'TSLA',
      value: 63.20,
      color: colors.indigo[500]
    },
    {
      title: 'AAPL',
      value: 15.85,
      color: colors.red[600]
    },
    {
      title: 'SBUX',
      value: 23.45,
      color: colors.orange[600]
    },
    {
      title: 'GE',
      value: 23.58,
      color: colors.green[600]
    },
    {
      title: 'TWTR',
      value: 13,
      color: colors.blue[600]
    }
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Overall Allocation" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <DonutChart
            data={data}
            options={options}
            height='100%'
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection='column'
          mt={2}
        >
          {devices.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

PortfolioDonut.propTypes = {
  className: PropTypes.string
};

export default PortfolioDonut;
