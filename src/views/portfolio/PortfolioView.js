import React from 'react';
import { Container, Grid, makeStyles, CardHeader } from '@material-ui/core';
import Page from 'src/components/Page';
import LatestOrders from '../DashboardView/LatestOrders';
import PortfolioPerformance from './PortfolioPerformance';
import TodaysChange from '../DashboardView/TodaysChange';
import TotalFollowers from '../DashboardView/TotalFollowers';
import TotalBalance from '../DashboardView/TotalBalance';
import OverviewDonut from '../DashboardView/OverviewDonut';
import FollowBar from '../DashboardView/FollowBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const PortfolioView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Portfolio">
      <Container maxWidth={false}>
        <Typography variant ='h1'>Portfolio 1</Typography>
        <Grid container spacing={3}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="stretch"
            id="port-totals"
            container spacing={3}
          >
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TodaysChange />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalFollowers />
            </Grid>
            {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TodaysChange />
            </Grid> */}
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalBalance />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <PortfolioPerformance />
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
        </Grid>
      </Container>
    </Page>
  );
};

export default PortfolioView;
