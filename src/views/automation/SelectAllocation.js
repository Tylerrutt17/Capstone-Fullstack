import React from 'react';
import FundsSlider from '../automation/elements/FundsSlider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Card';
import { Container } from '@material-ui/core';


let usableBal = 2347.23

export default function SelectAllocation() {
  return (
    <Container>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography variant="h1">
          Select the desired allocation for your new portfolio
        </Typography>
        <br/>
        <Typography variant="h3">Avaliable Balance: $2,456.23</Typography>
      </Grid>
      <Grid>
          <br/>
        <FundsSlider avail ={usableBal}/>
      </Grid>
    </Container>
  );
};
