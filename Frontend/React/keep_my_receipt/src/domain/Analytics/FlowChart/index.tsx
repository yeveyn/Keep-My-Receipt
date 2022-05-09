import React from 'react';
import Graph from './Graph';
import { Grid, Typography } from '@mui/material';

export default function FlowChart() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Typography>월별 추이</Typography>
      <Graph />
    </Grid>
  );
}
