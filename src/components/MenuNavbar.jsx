import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Stepper, Step, StepButton, StepLabel, StepConnector } from "@material-ui/core";

import ColoredStepIcon from './ColoredStepIcon';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    [theme.breakpoints.down('sm')]: {
      top: '20%',
      width: '20%'
    },
    [theme.breakpoints.up('sm')]: {
      bottom: 'auto',
      top: '40%',
      width: 'auto'
    },
    alignItems: 'flex-start',
    backgroundColor: theme.palette.primary.main,
    zIndex: 1
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
              <StepLabel StepIconComponent={ColoredStepIcon} style={{ fontWeight: 400 }}> 
                { title } 
              </StepLabel>
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
}