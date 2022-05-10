import React from 'react';
import Graph from './Graph';
import { Grid, Typography, Stack, Paper } from '@mui/material';

interface ItemType {
  date: string;
  value: string;
}

export default function FlowChart({
  sumValue,
  items,
  startDate,
  endDate,
}: {
  sumValue: number;
  items: ItemType[];
  startDate: string;
  endDate: string;
}) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ width: '100%' }}
    >
      <Stack spacing={2} style={{ width: '100%' }}>
        <Grid container justifyContent="start">
          <Typography
            style={{ fontWeight: 'bold', marginTop: 60, marginLeft: 15 }}
          >
            월별 추이
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="center"
          style={{ width: '100%', marginTop: 30 }}
        >
          <Graph items={items} />
        </Grid>
        <Paper
          variant="outlined"
          style={{
            padding: 15,
            width: '100%',
            background: '#FFF5E1',
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid xs={7} sm={7} md={7} container>
              <Typography style={{ fontWeight: 'bold' }}>연 지출액</Typography>
            </Grid>
            <Grid xs={4} sm={4} md={4} container justifyContent="end">
              <Typography>
                {String(sumValue)
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                  .concat('원')}
              </Typography>
            </Grid>
            <Grid xs={1} sm={1} md={1} container justifyContent="end">
              &nbsp;
            </Grid>
          </Grid>
        </Paper>
      </Stack>
    </Grid>
  );
}
