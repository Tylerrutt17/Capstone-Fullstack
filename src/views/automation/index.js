import React, { useState } from 'react';
import PortStepper from './PortStepper';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import ProductCard from './ProductCard';
import data from './data';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const LeaderList = () => {
  const classes = useStyles();
  const [products] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Automations"
    >
      <Container maxWidth={false}>
  
        <Box mt={3}>
          <PortStepper/>
          
        </Box>
      </Container>
    </Page>
  );
};

export default LeaderList;
