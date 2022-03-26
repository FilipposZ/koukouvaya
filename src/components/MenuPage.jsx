import React, { useState, useRef, useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, useScrollTrigger } from '@material-ui/core';

import { InView } from 'react-intersection-observer';

import Navbar from './Navbar';
import MenuNavbarHorizontal from './MenuNavbarHorizontal';
import MenuSection from './MenuSection';
import Footer from './Footer';
import menuItems from '../menu-items';

import { getYOffsetBreakpoints } from '../lib/utils.js';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.light,
  },
  '@global': {
    'a': {
      textDecoration: 'none',
      color: theme.palette.common.black
    }
  }
}));

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
      <Footer />
    </Box>
  );
}