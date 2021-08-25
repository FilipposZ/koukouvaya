import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, IconButton, Slide, Toolbar, Typography, useScrollTrigger } from '@material-ui/core';
import GrandmaOwlIcon from './icons/GrandmaOwlIcon';

const useStyles = makeStyles(theme => ({
  appbar: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0)
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2)
    },
    backgroundColor: theme.palette.primary,
    alignItems: 'center'
  },
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(0.7)'
    },
    [theme.breakpoints.up('sm')]: {
      transform: 'scale(1)'
    },
  },
  clickable: {
    cursor: 'pointer'
  }
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


export default function Navbar(props) {
  const cls = useStyles();

  function scrollTop() {
    window.scrollTo({ left:0, top:0, behavior: 'smooth' });
  }

  return (
    <HideOnScroll {...props}>
      <AppBar position="sticky" className={cls.appbar}>
        <Toolbar className={cls.toolbar}>
          <IconButton edge='start' className={cls.clickable} onClick={scrollTop} aria-label='menu'>
            <GrandmaOwlIcon style={{ fontSize: '3em' }}/>
          </IconButton>
          <Typography variant='h1' className={cls.clickable} color='textSecondary' onClick={scrollTop}>
            { props.title }
          </Typography>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};