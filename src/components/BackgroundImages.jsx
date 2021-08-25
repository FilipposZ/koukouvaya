import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  background: {
    background: props => (() => {
      switch(props.index) {
        case 0:
          return 
        default:
          return
      }
    })()
  }
}));

export default function BackgroundImages({ children, index, ...otherProps }) {
  const cls = useStyles({ index })
  
  return (
    <Box className={cls.background}>
      {children}
    </Box>
  );
}