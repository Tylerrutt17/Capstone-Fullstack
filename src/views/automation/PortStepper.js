import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Card';
import AssetTable from './AssetTable';
import AllocationSlider from '../../components/AllocationSlider';
import AllocationTable from './AllocationTable';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import SelectAllocation from './SelectAllocation';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function getSteps() {
  return ['Allocate Funds','Select Assets', 'Select Allocations', 'Name your Portfolio'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (<SelectAllocation/>);
    case 0:
      return (<AssetTable/>);
    case 1:
      return (<AllocationTable/>) ;
    case 2:
      return (<Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography>Enter Your New Portfolio Name</Typography>
        <FormControl fullWidth variant="filled">
          <InputLabel htmlFor="filled-prtfolio-name">Portfolio Name</InputLabel>
          <FilledInput
            id="filled-prtfolio-name"
          />
        </FormControl>
      </Grid>
      );
    default:
      return 'Portfolio Created';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>Your Portfolio has been created</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Save
          </Button>
        </Paper>
      )}
    </div>
  );
}
