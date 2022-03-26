import { makeStyles } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import { Box } from "@material-ui/core";

import WaveSeparatorSvg from "./icons/WaveSeparatorSvg";

const useStyles = makeStyles(theme => ({
  background: {
    background: (props) => (`linear-gradient(${props.curColor} 20%, ${props.nextColor})`)
  },
  separator: {
    position: 'relative',
    left: 0,
    top: 0
  },
  flip: {
    transform: 'rotate(180deg)'
  }
}));

export default function BackgroundWaveSeparator({ children, index, ...otherProps }) {
  const theme = useTheme();
  // const backgroundColors = [
  //   theme.palette.primary.light,
  //   theme.palette.secondary.light,
  //   '#90bc7d',
  //   '#a97dbc',
  //   '#a5d5cd',
  //   '#D5A5C5',
  //   theme.palette.primary.main
  // ]
  
  // const curColor = backgroundColors[index % backgroundColors.length];
  // const nextColor = backgroundColors[(index + 1) % backgroundColors.length];
  
  const curColor = (index % 2 === 0) ? theme.palette.primary.light : theme.palette.secondary.light
  const nextColor = (index % 2 === 0) ? theme.palette.secondary.light : theme.palette.primary.light

  const cls = useStyles({ curColor: curColor, nextColor: nextColor });
  // const cls = useStyles({ index });

  return (
    <Box className={cls.background}>
      {children}
      <WaveSeparatorSvg className={cls.separator} startColor={curColor} endColor={nextColor} opacity={0.5} />
    </Box>
  );
}