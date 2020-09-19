import React from 'react';
import { Container, Grid, makeStyles, CardHeader } from '@material-ui/core';
import Page from 'src/components/Page';
import LatestOrders from '../../components/LatestOrders';
import PerformanceSummary from '../../components/PerformanceSummary';
import TodaysChange from '../../components/TodaysChange';
import TotalFollowers from '../../components/TotalFollowers';
import TotalBalance from '../../components/TotalBalance';
import OverviewDonut from '../../components/OverviewDonut';
import FollowBar from '../../components/FollowBar';
import TodaysMoney from '../../components/TodaysMoney'
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
            <TodaysChange  />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalFollowers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TodaysMoney />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalBalance />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <PerformanceSummary />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <OverviewDonut />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <CardHeader title="Followers Gained/Lost" />
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

