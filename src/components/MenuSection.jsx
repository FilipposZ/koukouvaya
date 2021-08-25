import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Box, Container, Grid, Typography } from "@material-ui/core";

import { useTrail, animated, config } from '@react-spring/web';

import BackgroundImages from './BackgroundImages';
import MenuItem from './MenuItem';
import SweetsSections from './SweetsSection';

const backgroundColors = [
  '#7dbca9',
  '#e18437',
  '#04a17a',
  '#8484ac',
  '#4f5399',
  '#ac508f',
  '#7dbca970'
 ]

const useStyles = makeStyles(theme => ({
  background: {
    background: props => (() => {
      let value = props.index % 2 === 0
        ? `linear-gradient(${theme.palette.primary.light} 90%, ${theme.palette.secondary.light})` 
        : `linear-gradient(${theme.palette.secondary.light} 90%, ${theme.palette.primary.light})`
      // const curColor = backgroundColors[props.index % backgroundColors.length];
      // const nextColor = backgroundColors[(props.index + 1) % backgroundColors.length];
      // let value = `linear-gradient(${curColor} 90%, ${nextColor})`;
      return value;
    })()
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 2, 4, 6),
      width: '75%',
      marginRight: '0%'
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
    <Box className={cls.background}>
      <BackgroundImages index={index}>
        <Container className={cls.container}>
            <Grid container direction='column' ref={refProp} spacing={2}>
              <Grid item align='center' className={cls.marginBot} >
                <Typography variant='h3'> { title.normalize("NFD").replace(/\p{Diacritic}/gu, '').toUpperCase() } </Typography>
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
      </BackgroundImages>
    </Box>
  );
}