import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Container, Grid, Typography } from "@material-ui/core";

import { useTrail, animated, config } from '@react-spring/web';

import BackgroundWaveSeparator from './BackgroundWaveSeparator';
import MenuItem from './MenuItem';
import SweetsSections from './SweetsSection';

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 2, 4, 2),
      width: '75%',
      // marginRight: '0%'
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8, 4),
      marginRight: '0%',
      width: '60%'
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 4),
      marginLeft: '28%',
      width: '60%'
    },
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(8),
      width: '45%'
    },
  },
  marginBot: {
    marginBottom: theme.spacing(6)
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
            <Grid item align='center' className={cls.marginBot} >
              <Typography variant='h2'> { title.normalize("NFD").replace(/\p{Diacritic}/gu, '').toUpperCase() } </Typography>
            </Grid>
            { title !== 'Sweets & more' 
              ? Object.entries(items).map(([item, price], index) => {
                  return(
                    <AnimatedGrid item key={index} style={{ height: '100%', ...itemsAnimation[index] }}>
                      <MenuItem name={item} price={price} />
                    </AnimatedGrid>
                  );
                })
              : <SweetsSections items={Object.entries(items)} itemsAnimation={itemsAnimation}/>
            }
          </Grid>
      </Container>
    </BackgroundWaveSeparator>
  );
}