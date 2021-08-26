import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Stepper, Step, StepButton, StepLabel, StepConnector, Typography } from "@material-ui/core";

import ColoredStepIcon from './ColoredStepIcon';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      bottom: '0',
      width: '30%',
      padding: theme.spacing(0, 1)
    },
    [theme.breakpoints.up('sm')]: {
      bottom: 'auto',
      top: '40%',
      width: 'auto'
    },
    alignItems: 'flex-start',
    backgroundColor: theme.palette.primary.light,
    zIndex: 1,
  }, 
  navLabel: {
    marginTop: theme.spacing(1.1),
    fontWeight: 400,
  },
  stepLabel: {
    letterSpacing: 1,
    lineHeight: 1,
    textAlign: 'center'
  }
}));

export default function MenuNavbar(props) {
  const mobileView = window.matchMedia('(max-width: 600px)').matches;
  const cls = useStyles();
  const { sectionTitles, sectionRefs, focusedSectionIndex } = props

  function scrollToElement(index) {
    sectionRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return (
    <Stepper className={cls.root} 
      activeStep={focusedSectionIndex} 
      orientation={'vertical'} elevation={3} square={false} 
      connector={mobileView ? null : <StepConnector style={{ alignSelf: 'center', display: 'flex' }} />}
      nonLinear
      alternativeLabel={mobileView}
    >
      {sectionTitles.map((title, index) => {
        return (
          <Step key={title} completed={false} style={{ width: '100%' }}>
            <StepButton style={{ justifyContent: mobileView ? 'center' : 'flex-start' }} onClick={() => scrollToElement(index)}>
              <StepLabel StepIconComponent={ColoredStepIcon} className={cls.navLabel}> 
                <Typography variant='body2' className={cls.stepLabel} style={{ transform: mobileView ? 'translateY(-8px)' : 'none' }}>
                  { title }
                </Typography>
              </StepLabel>
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
}