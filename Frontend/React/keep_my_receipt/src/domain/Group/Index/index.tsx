import React from 'react';
import { Grid, Stack, Container } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import IndexItem from './item';

export default function GroupIndex() {
  return (
    <Container maxWidth="md">
      <Grid container direction="column">
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <h2>내 모임</h2>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Add fontSize="large" />
            <Search fontSize="large" />
          </Stack>
        </Stack>
        <Stack direction="column" alignItems="center" spacing={2}>
          <IndexItem name="고독한 미식가들" budget={123000} />
          <IndexItem name="축구" budget={500000} />
        </Stack>
      </Grid>
    </Container>
  );
}
