import { makeStyles } from "@material-ui/core";
import { Divider, Grid, Typography } from "@material-ui/core";

import { animated } from '@react-spring/web';

const useStyles = makeStyles(theme => ({
  leftDivider: {
    width: '100%',
    borderImage: 'linear-gradient(to right, #ffffff00, #000) 1',
    borderTop: '1px solid',
    borderRadius: '100%'
  },
  rightDivider: {
    width: '100%',
    borderImage: 'linear-gradient(to right, #000, #ffffff00) 1',
    borderTop: '1px solid',
    borderRadius: '100%'
  },
  verticalSpace: {
    margin: theme.spacing(4, 0, 2, 0)
  }
}));

function TextDivider({ children, ...otherProps }) {
  const cls = useStyles();

  return (
    <Grid container direction='row' alignItems='center' spacing={2} {...otherProps}>
      <Grid item xs={6} sm>
        <Divider className={cls.leftDivider} />
      </Grid>
      <Grid item>
        {children}
      </Grid>
      <Grid item xs={6} sm>
        <Divider className={cls.rightDivider}  />
      </Grid>
    </Grid>
  );
}

const AnimatedGrid = animated(Grid)

export default function SweetsSection({ items, itemsAnimation, ...otherProps}) {
  const cls = useStyles();

  return (
    <Grid container direction='column' className={cls.textColor}>
      {
        items.map(([category, catItems]) => {
          return (
            <Grid key={category} item>
              <TextDivider className={cls.verticalSpace}>
                <Typography variant='h4'>{ category }</Typography>  
              </TextDivider>
              <Grid container direction='column' alignItems='flex-start' spacing={3}>
                {
                  Object.entries(catItems).map(([name, desc], index) => {
                    return (
                      <AnimatedGrid item key={name} style={itemsAnimation[index]}>
                        <Typography variant='body1'>{name.normalize("NFD").replace(/\p{Diacritic}/gu, '')}</Typography>
                        <Typography variant='caption' style={{ fontSize: 16 }}>{desc}</Typography>
                      </AnimatedGrid>
                    )
                  })
                }
              </Grid>
            </Grid>
          );
        })
      }
    </Grid>
  );
}