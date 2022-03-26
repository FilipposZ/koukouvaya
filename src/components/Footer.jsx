import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

import ContactInfo from './ContactInfo';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(8, 0, 1, 0),
    background: `linear-gradient(${theme.palette.primary.light} 10%, ${theme.palette.primary.dark})`,
  },
  copyrights: {
    fontSize: 15,
    padding: theme.spacing(1.5, 0),
    opacity: 0.5
  },
  credits: {
    fontSize: 11,
    opacity: 0.5
  }
}));

const year = new Date().getFullYear(); // used for the copyright

export default function Footer(props) {
  const cls = useStyles();

  return(
    <Grid className={cls.footer} container direction='column' alignItems='center'>
      <ContactInfo />
      <Grid item>
        <Typography className={cls.copyrights} align='center'>Koukouvaya {year} © All rights reserved</Typography>
      </Grid>
      {/* <Grid item>
        <Typography className={cls.credits}>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></Typography>
      </Grid> */}
    </Grid>
  );
}