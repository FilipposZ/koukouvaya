import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Stepper, Step, StepButton, StepLabel, StepConnector } from "@material-ui/core";

import ColoredStepIcon from './ColoredStepIcon';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      bottom: '0%',
      top: 'auto',
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      bottom: 'auto',
      top: '30%',
      width: 'auto'
    },
    alignItems: 'flex-start',
    backgroundColor: theme.palette.primary.main,
    zIndex: 1,
    padding: theme.spacing(2)
  },
  navLink: {
    textDecoration: 'none',
  }
}));

export default function MenuNavbar(props) {
  const mobileView = window.matchMedia('(max-width: 600px)').matches;
  const cls = useStyles();
  const { sectionTitles, sectionRefs, focusedSectionIndex } = props

  function scrollToElement(index) {
    sectionRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <Stepper className={cls.root} 
      activeStep={focusedSectionIndex} 
      orientation={mobileView ? 'horizontal' : 'vertical'} elevation={3} square={false} 
      connector={mobileView ? null : <StepConnector style={{ alignSelf: 'center', display: 'flex' }} />}
      nonLinear
      alternativeLabel={mobileView}
    >
      {sectionTitles.map((title, index) => {
        return (
          <Step key={title} completed={false} style={{ width: '100%' }}>
            <StepButton onClick={() => scrollToElement(index)}>
              <StepLabel StepIconComponent={ColoredStepIcon}> 
                { mobileView ? null : title } 
              </StepLabel>
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
}