import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, Drawer, IconButton, Link, Grid, Slide, Toolbar, useScrollTrigger } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
    width: '100%',
    justifyContent: 'flex-end',
  },
  centered: {
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(0.6)',
      left: '0%',
    },
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center'
  },
  clickable: {
    cursor: 'pointer'
  },
  navLink: {
    '&:hover': {
      textDecoration: 'none'
    }
  },
  paperBackground: {
    backgroundColor: theme.palette.primary.dark,
    width: '20%'
  }
}));


/**
 * 
 * Hides it's children when the user is scrolling down.
 * 
 * @param {React.ReactElement[]} children The items that will be hidden on scroll
 */
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function MenuLinks({ vertical }) {
  const cls = useStyles();
  
  return (
    <Grid container direction={vertical ? 'column' : 'row'} justifyContent='flex-end' style={{marginTop: vertical ? '5vh' : 'none'}}>
      <Button>
        <Link variant='subtitle2' className={cls.navLink} color='textSecondary' component={RouterLink} to='/'>
          Menu
        </Link>
      </Button>
      <Button>
        <Link variant='subtitle2' className={cls.navLink} color='textSecondary' component={RouterLink} to='/party'>
          Party
        </Link>   
      </Button>
    </Grid>
  )
}

function CollapsedMenu(props) {
  const cls = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Drawer PaperProps={{ className: cls.paperBackground }}
        anchor='right'
        open={open}
        onClose={handleClose}
      >
        <MenuLinks vertical />
      </Drawer>
    </>
  );
}

export default function Navbar(props) {
  const cls = useStyles();
  const history = useHistory();
  
  const collapseMenu = window.matchMedia('(max-width: 800px)').matches;
  
  function scrollTop() {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

  return (
    <HideOnScroll {...props}>
      <AppBar position="sticky" className={cls.appbar}>
        <Toolbar className={cls.toolbar}>
          <Box className={cls.centered}>
            <IconButton edge='start' className={cls.clickable} onClick={() => { history.push('/'); scrollTop() }} aria-label='menu'>
              <GrandmaOwlIcon style={{ fontSize: '3em' }} />
            </IconButton>
            <Link variant='h1' className={cls.navLink} color='textSecondary' component={RouterLink} onClick={scrollTop} to='/'>
              ΚΟΥΚΟΥΒΑΓΙΑ
            </Link>
          </Box>
          {!collapseMenu
            ? <MenuLinks />
            : <CollapsedMenu />
          }
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};