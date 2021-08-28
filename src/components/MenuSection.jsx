import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Container, Grid } from "@material-ui/core";

import { useTrail, animated, config } from '@react-spring/web';

import BackgroundWaveSeparator from './BackgroundWaveSeparator';
import SectionTitle from './SectionTitle';
import MenuItem from './MenuItem';
import SweetsSection from './SweetsSection';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2),
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 2),
      marginLeft: '40%',
      width: '60%'
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 4),
      marginLeft: '28%',
      width: '60%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(0, 8),
      width: '45%'
    },
  },
  sectionTitle: {
    marginBottom: theme.spacing(2)
  }
}));

const AnimatedGrid = animated(Grid);

export default function MenuSection(props) {
  const cls = useStyles(props);
  const { index, title, items, refProp, inView, reverseAnim } = props;

  const countNested = (obj) => {
    return (Object.entries(items).reduce((acc, [category, catItems]) => {
      acc += Object.keys(catItems).length;
      return acc;
    }, 0))
  }

  let numAnims = title !== 'Sweets & more' ? Object.keys(items).length : countNested(items)

  let itemsAnimation = useTrail(numAnims, {
    config: config.gentle,
    to: {
      opacity: inView ? 1 : 0, 
      transform: inView ? 'translate(0%, 0%)' : 'translate(-20%, -50%)'
    },
    from: { opacity: 0, transform: 'translate(-20%, -50%)' }
  })

  if (reverseAnim) {
    itemsAnimation.reverse();
  }

  return(
    <BackgroundWaveSeparator index={index}>
      <Container className={cls.container}>
          <Grid container direction='column' ref={refProp} spacing={2}>
            <Grid item align='center' className={cls.sectionTitle} >
              <SectionTitle title={title} />
            </Grid>
            { title !== 'Sweets & more' 
              ? Object.entries(items).map(([item, price], index) => {
                  return(
                    <AnimatedGrid item key={index} style={{ height: '100%', ...itemsAnimation[index] }}>
                      <MenuItem name={item} price={price} />
                    </AnimatedGrid>
                  );
                })
              : <SweetsSection items={Object.entries(items)} itemsAnimation={itemsAnimation}/>
            }
          </Grid>
      </Container>
    </BackgroundWaveSeparator>
  );
}