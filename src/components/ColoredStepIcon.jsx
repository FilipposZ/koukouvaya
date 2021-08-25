import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";

import CoffeeIcon from './icons/CoffeeIcon';
import JuiceIcon from './icons/JuiceIcon';
import SnackIcon from './icons/SnackIcon';
import CocktailIcon from './icons/CocktailIcon';
import BeerIcon from './icons/BeerIcon';
import PancakeIcon from './icons/PancakeIcon';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundColor: theme.palette.tertiary.dark,
    boxShadow: "0px 5px 10px 2px rgba(0,0,0,0.8)"
  }
}));

export default function ColoredStepIcon(props) {
    const classes = useStyles();
    const { active } = props;
  
    const icons = {
      1: <CoffeeIcon />,
      2: <JuiceIcon />,
      3: <SnackIcon />,
      4: <CocktailIcon />,
      5: <BeerIcon />,
      6: <PancakeIcon />
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }