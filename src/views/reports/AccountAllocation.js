import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DonutChart from '../../mixins/DonutChart';
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

const DonutChart = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  
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
            data={props.data}
            options={props.options}
            height='100%'
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
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

DonutChart.propTypes = {
  className: PropTypes.string
};

export default DonutChart;
