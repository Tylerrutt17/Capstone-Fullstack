import React from 'react';
import { Container, Grid, makeStyles, CardHeader } from '@material-ui/core';
import Page from 'src/components/Page';
import LatestOrders from '../../components/LatestOrders';
import PerformanceSummary from '../../components/PerformanceSummary';
import TodaysChange from '../../components/TodaysChange';
import TotalFollowers from '../../components/TotalFollowers';
// import TotalBalance from '../../components/TotalBalance';
import PortfolioDonut from './PortfolioDonut';
import FollowBar from '../../components/FollowBar';
import TodaysMoney from '../../components/TodaysMoney';
import PortfolioDropdown from '../automation/elements/PortfolioDropdown';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AllocationTable from '../automation/AllocationTable';
import EditTable from './EditTable';
import Button from '@material-ui/core/Button';
import PortfolioPerformance from '../PortfolioView/PortfolioPerformance';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const MarginDiv = withStyles({
  root: {
    marginBottom: '10px'
  }
})(Grid);

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <MarginDiv
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography variant="h1">Portfolio 1</Typography>
            <PortfolioDropdown />
          </MarginDiv>

          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
          >
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TodaysChange />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalFollowers />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TodaysMoney />
            </Grid>
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <PortfolioPerformance />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <PortfolioDonut />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <CardHeader title="Followers Gained/Lost" />
            <FollowBar />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
          <MarginDiv
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography style={{ margin: 1 + 'em' }} variant="h2">
              Edit your Allocations Below
            </Typography>
          </MarginDiv>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <EditTable />
            </Grid>
            <Button variant="contained" color='secondary' size='large'>Update Portfolio</Button>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
