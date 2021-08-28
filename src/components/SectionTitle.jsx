import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';

import KoukouvayaIcon from './icons/KoukouvayaIcon';

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: '2em',
  }
}));

/**
 * The component renders the title with an icon next to it.
 */
function SectionTitle({ title, ...otherProps }) {
  const cls = useStyles()

  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item>
        <KoukouvayaIcon className={cls.icon} animation />
      </Grid>
      <Grid item>
        <Typography variant='h2'> { title.normalize("NFD").replace(/\p{Diacritic}/gu, '').toUpperCase() } </Typography>
      </Grid>
    </Grid>
  );
};

SectionTitle.propTypes = {
  /** The title of the section. */
  title: PropTypes.string,

  /** The position of the icon. */
  iconPos: PropTypes.oneOf(['start', 'end'])
};

SectionTitle.defaultProps = {
  iconPos: 'end'
}

export default SectionTitle;

