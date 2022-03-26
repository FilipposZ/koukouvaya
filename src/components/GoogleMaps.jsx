import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  mapouter: {
    position: 'relative',
    textAlign: 'right',
    height: '243px',
    width: '222px'
  },
  gmapCanvas: {
    overflow: 'hidden',
    background: 'none',
    height: '243px',
    width: '222px'
  }
}))

export default function GoogleMaps(props) {
  const cls = useStyles();

  return(
    <div className={cls.mapouter}>
      <div className={cls.gmapCanvas}>
        <iframe width="222" height="243" id="gmap_canvas" src="https://maps.google.com/maps?q=25%CE%B7%CF%82%20%CE%9C%CE%B1%CF%81%CF%84%CE%AF%CE%BF%CF%85%2044-46,%20%CE%9D%CE%AD%CE%BF%CE%B9%20%CE%95%CF%80%CE%B9%CE%B2%CE%AC%CF%84%CE%B5%CF%82%20570%2019&t=&z=15&ie=UTF8&iwloc=&output=embed"
          frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" title="googlemaps_location"
        >
        </iframe>
        <br />
        <a href="https://www.embedgooglemap.net">custom google map for website
        </a>
      </div>
    </div>
  )
}