import React from 'react';
import { Container, Grid, makeStyles,CardHeader } from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import AreaChart from '../../../mixins/AreaChart';
import PerformanceSummary from './PerformanceSummary';
import TodaysChange from './TodaysChange';
import TotalFollowers from './TotalFollowers';
import TotalBalance from './TotalBalance';
import DonutChart from './DonutChart';
import FollowBar from '../../../mixins/FollowBar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalFollowers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TodaysChange />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalBalance />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <AreaChart />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <DonutChart />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <CardHeader
              title="Followers Gained/Lost"
            />
            <FollowBar />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
