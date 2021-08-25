import { Grid, Typography } from "@material-ui/core";

export default function MenuItem({ name, price }) {
  return(
    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
      <Grid item xs={10}>
        <Typography variant='body1'>{ name.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/ς/g, 'Σ') }</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='body2' style={{ fontSize: 22, fontWeight: 600, lineHeight: 1 }}>{ price } </Typography>
      </Grid>
    </Grid>
  );
}