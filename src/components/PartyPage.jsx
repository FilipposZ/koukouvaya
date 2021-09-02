import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, CardMedia, Container, Grid, IconButton, ImageList, ImageListItem, Typography, useTheme } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { useTrail, useSpring, useChain, config, animated, useSpringRef } from '@react-spring/web';

import Navbar from './Navbar';
import PinataIcon from './icons/PinataIcon';

// Load all the videos from the folder
var pinataVideos = [];
const pinatasContext = require.context('../assets/videos/', true);
pinatasContext.keys().forEach(path => pinataVideos.push(pinatasContext(path).default))

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.primary.light,
  },
  root: {
    marginTop: '15vh',
    display: 'flex',
    justifyContent: 'center',
  },
  fancyWord: {
    fontFamily: 'Pecita',
    fontSize: '2.3rem',
    backgroundImage: 'linear-gradient(45deg, #CA4246 16.666%,  #E16541 16.666%,  #E16541 33.333%,  #F18F43 33.333%,  #F18F43 50%,  #8B9862 50%,  #8B9862 66.666%,  #476098 66.666%,  #476098 83.333%,  #A7489B 83.333%)',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    fontWeight: 700,
    transition: 'background-position 2s',
    '&:hover': {
      backgroundPosition: '10rem'
    }
  },
  pinataIcon: {
    fontSize: '10rem',
    cursor: 'pointer',
    marginBottom: '10%'
  }
}));

const AnimatedGrid = animated(Grid);
const AnimatedImageList = animated(ImageList);
const AnimatedCardMedia = animated(CardMedia);

export default function PartyPage(props) {

  const theme = useTheme();
  const cls = useStyles();
  const [openVideos, setOpenVideos] = useState(false);

  const fadePinataApi = useSpringRef();
  const fadePinataStyles = useSpring({
    ref: fadePinataApi,
    config: config.molasses,
    opacity: openVideos ? 0 : 1,
    maxHeight: openVideos ? '0%' : '300px',
    from: { opacity: 1, maxHeight: '300px' },
  });

  const imageListDisplayStyle = useSpring({
    config: config.slow,
    display: openVideos ? 'flex' : 'none',
    delay: 400,
    from: { display: 'none' }
  });
  
  const videosContainerApi = useSpringRef();
  const videosContainerStyles = useSpring({
    config: config.stiff,
    from: { background: theme.palette.primary.light },
    to: { 
      background: openVideos ? theme.palette.secondary.light : theme.palette.primary.light
    }
  });

  const videosTrailApi = useSpringRef();
  const videosTrail = useTrail(pinataVideos.length, {
    ref: videosTrailApi,
    config: config.wobbly,
    opacity: openVideos ? 1 : 0,
    height: openVideos ? '100%' : '0%',
    from: { opacity: 0, height: '0%' }
  });

  useChain(openVideos ? [videosContainerApi, fadePinataApi, videosTrailApi] : [videosTrailApi, fadePinataApi, videosContainerApi], [
    0,
    0,
    openVideos ? 0.6 : 0.8
  ]);

  return (
    <Box className={cls.background}>
      <Navbar />
      <Container className={cls.root} >
        <Grid container direction='column' alignItems='center' spacing={3}>
          <Grid item>
            <Typography variant='h3' align='center'>ΨΑΧΝΕΙΣ ΤΟ ΜΕΡΟΣ ΓΙΑ ΝΑ ΔΙΟΡΓΑΝΩΣΕΙΣ ΤΟ <span className={cls.fancyWord}>PARTYYY</span> ΣΟΥ ?</Typography>
          </Grid>
          <Grid item>
            <Typography variant='subtitle1' align='center'>Δες τι έχει μέσα η <span className={cls.fancyWord}>πινιάτα</span> για το δικό <span className={cls.fancyWord}>σου</span> πάρτυ!</Typography>
          </Grid>
          <AnimatedGrid item container style={videosContainerStyles} direction='column' alignItems='center'>
            <PinataIcon className={cls.pinataIcon} style={fadePinataStyles} onClick={() => setOpenVideos(true)} />
            { openVideos && <IconButton onClick={() => setOpenVideos(false)}><ExpandLessIcon /></IconButton> }
            <AnimatedImageList cols={2} style={imageListDisplayStyle}>
            { videosTrail.map((style, index) => (
              <ImageListItem key={index}>
                <AnimatedCardMedia className={cls.pinataVideo} style={style}
                  component='video' src={pinataVideos[index]} type='video/mp4' 
                  autoPlay loop muted playsInline />
              </ImageListItem>
            ))}
            </AnimatedImageList>
          </AnimatedGrid>

          <CardMedia component='img' image='images/happybirthday-menu.png' /> 
          <CardMedia component='img' image='images/happybirthday-info.png' /> 
        </Grid>
      </Container>
    </Box>
  );
}
