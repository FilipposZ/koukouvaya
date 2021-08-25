import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Grid, Typography } from '@material-ui/core';

import Navbar from './Navbar';
import MenuNavbar from './MenuNavbar';
import MenuSection from './MenuSection';
import menuItems from '../menu-items';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
    overflowX: 'hidden'
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
  sectionRefs.current = [];
  const [visibleSections, setVisibleSections] = useState(new Array(Object.keys(menuItems).length).fill(false));
  const [focusedSectionIndex, setFocusedSectionIndex] = useState(0);
  const scroll = useRef({ direction: 'down', yOffset: window.pageYOffset });

  /**
   * Sets the scrolling direction and
   * Checks which sections are currently inside the viewport
   * The section is considered in view when either it's bottom or it's top border is inside the viewport
   */
  function onScroll() {
    if (window.pageYOffset >= scroll.current.yOffset) {
      scroll.current.direction = 'down';
    } else {
      scroll.current.direction = 'up';
    }
    scroll.current.yOffset = window.pageYOffset;

    // Check which sections are visible and how much area is inside the viewport
    const visibility = sectionRefs.current.map(sectionEl => {
      let rect = sectionEl.getBoundingClientRect();
  
      if (rect.top > window.innerHeight || rect.bottom < 0) return [false, 0];

      const upper = rect.top > 0 ? rect.top : 0;
      const lower = rect.bottom < window.innerHeight ? rect.bottom : window.innerHeight;

      const areaInView = Math.abs(upper - lower);
      return [areaInView > 0 ? true : false, areaInView];
    });

    // Find the section with the max area inside the viewport
    const maxAreaIndex = visibility.reduce((maxIndex, currSection, currIndex) => {
      const area = currSection[1];
      if (area > visibility[maxIndex][1]) {
        maxIndex = currIndex;
      }
      return maxIndex;
    }, 0);
    
    // console.log(`index: ${maxAreaIndex}, area: ${visibility[maxAreaIndex][1]} scrollY: ${scroll.current.yOffset}`);
    setFocusedSectionIndex(maxAreaIndex);
    setVisibleSections(visibility.map(el => el[0]));
  }

  /**
   * Initialise the in view sections and set up the scroll listener 
   */
  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => (window.removeEventListener('scroll', onScroll));
  }, []);

  /**
   * Adds an element to the references array if it does not exist
   * @param {ReactNode} el The reference to each section
   */
  function addToRefs(el) {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return(
    <Box className={cls.root}>
      <Navbar />
      <MenuNavbar sectionTitles={Object.keys(menuItems)} 
        sectionRefs={sectionRefs}
        focusedSectionIndex={focusedSectionIndex}
      />

      { Object.entries(menuItems).map(([section, items], index) => {
        return(
          <MenuSection key={index} index={index} refProp={addToRefs}
            title={section} 
            items={items}
            inView={visibleSections[index]}
            reverseAnim={scroll.current.direction === 'up' ? true : false}
          />
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