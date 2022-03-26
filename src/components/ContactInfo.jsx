import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

import PhoneIcon from '@material-ui/icons/Phone';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import KoukouvayaIcon from './icons/KoukouvayaIcon';
import GoogleMaps from './GoogleMaps';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0, 3)
  },
  logo: {
    fontSize: '2.5em'
  }
}))

export default function ContactInfo(props) {
  const cls = useStyles();

  return(
    <Grid className={cls.container} container direction='row' alignItems='flex-start' alignContent='space-between' spacing={5}>
      <Grid container item sm direction='column' alignItems='center'>
        <Grid item>
          <KoukouvayaIcon className={cls.logo} animation />
        </Grid>
        <Grid item>
          <Typography variant='body1'>Koukouvaya</Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1'>The Family Cafe</Typography>
        </Grid>
      </Grid>
      
      <Grid container item sm direction='column' alignItems='center' justifyContent='space-between'>
        <Grid item>
          <Typography variant='body2'>Μίλησε μας</Typography>
        </Grid>
        <Grid item>
          <PhoneIcon style={{color:'darkorange'}}/>
        </Grid>
        <Grid item>
          <Typography variant='body2'>23920 20350</Typography>
        </Grid>
      </Grid>

      <Grid container item sm direction='column' alignItems='center' justifyContent='center'>

        <Grid item>
          <Typography variant='body2'>Socials</Typography>
        </Grid>

        <Grid item container direction='row' justifyContent='center'>
          <Grid item>
            <FacebookIcon />
          </Grid>
          <Grid item>
            <InstagramIcon />
          </Grid>
          <Grid item>
            <LinkedInIcon />
          </Grid>
          <Grid item>
            <TwitterIcon />
          </Grid>
        </Grid>

      </Grid>

      <Grid item sm container direction='column' justifyContent='center' alignItems='center'>
        <Grid item>
          <Typography variant='body2'>Βρείτε μας εδώ</Typography>
        </Grid>

        <Grid item>
          <LocationOnIcon />
        </Grid>

        <Grid item>
          <GoogleMaps />
        </Grid>
      </Grid>
    </Grid>
  );
}