import { makeStyles } from "@material-ui/core";
import { Box, CardMedia, Container, Typography } from "@material-ui/core";

import Navbar from "./Navbar";


const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: theme.palette.primary.light
  },
  root: {
    marginTop: '15vh',
    display: 'flex',
    justifyContent: 'center',
  }
}));

export default function PartyPage(props) {
  const cls = useStyles();

  return (
    <Box className={cls.background}>
      <Navbar />
      <Container className={cls.root}>
        <div>
          <Typography variant='h3' align='center'>Are you looking for a place to PARTYYY ??</Typography>
          <Typography variant='subtitle1' style={{ marginBottom: '10vh' }} align='center'>This is the place for you! We have PINATAS !</Typography>
          <CardMedia component='img' image='images/happybirthday-info.png'> 
          </CardMedia>
          <CardMedia component='img' image='images/happybirthday-menu.png'> 
          </CardMedia>
        </div>
      </Container>
    </Box>
  );
}
