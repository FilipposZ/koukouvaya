import React, { useState, useRef, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, Typography, useScrollTrigger } from '@material-ui/core';

import { InView } from 'react-intersection-observer';

import Navbar from './Navbar';
import MenuNavbarHorizontal from './MenuNavbarHorizontal';
import MenuSection from './MenuSection';
import menuItems from '../menu-items';

import { getYOffsetBreakpoints } from '../lib/utils.js';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
  },
  footer: {
    paddingTop: theme.spacing(10),
    padding: theme.spacing(5, 0, 2, 0),
    backgroundColor: theme.palette.primary.dark,
    opacity: 0.4
  },
  '@global': {
    'a': {
      textDecoration: 'none',
      color: theme.palette.common.black
    }
  }
}));

const year = new Date().getFullYear(); // used for the copyright

/**
 * The Menu page component
 * 
 * @component
 */

export default function MenuPage() {
  const cls = useStyles();
  const sectionRefs = useRef([]);
  const yBreakpoints = useRef([]);

  const [focusedSectionIndex, setFocusedSectionIndex] = useState(0);

  const scrollTrigger = useScrollTrigger();

  useEffect(() => {
    yBreakpoints.current = getYOffsetBreakpoints(sectionRefs.current);
  }, []);

  const handleViewChange = (inView, entry) => {
    for (let i = yBreakpoints.current.length - 1; i >= 0; i--) {
      if (yBreakpoints.current[i] < window.pageYOffset) {
        setFocusedSectionIndex(i);
        break;
      }
    }
  };

  /**
   * Adds an element to the references array if it does not exist
   * @param {ReactNode} node The reference to each section
   */
  const addToRefs = useCallback( (node, inViewRef) => {
    if (node && !sectionRefs.current.includes(node)) {
      sectionRefs.current.push(node);
      inViewRef(node);
    }
  }, []);

  return(
    <Box className={cls.root}>
      <Navbar />
      <MenuNavbarHorizontal sectionTitles={Object.keys(menuItems)} 
        sectionRefs={sectionRefs}
        focusedSectionIndex={focusedSectionIndex}
      />

      { Object.entries(menuItems).map(([section, items], index) => {
        return(
          <InView key={index} onChange={handleViewChange}>
            {({ inView, ref }) => {
              return (<MenuSection index={index} refProp={node => addToRefs(node, ref)}
                title={section} 
                items={items}
                inView={inView}
                reverseAnim={!scrollTrigger}
              />)
            }}
          </InView>
        );
      }) }
      <Grid className={cls.footer} container direction='column' alignItems='center'>
        <Grid item>
          <Typography>Koukouvaya {year} © All rights reserved</Typography>
        </Grid>
        <Grid item>
          <Typography style={{ fontSize: 12 }}>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></Typography>
        </Grid>
      </Grid>
    </Box>
  );
}