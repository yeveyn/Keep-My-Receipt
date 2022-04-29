import React from 'react';
import { Box, Button, Stack, Grid, TextField, Container } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

export default function GroupCreate() {
  return (
    <Container maxWidth="md">
      <h2>모임 생성</h2>
      <Grid container direction="column">
        <Stack spacing={2}>
          <Stack alignItems="center">
            <Box
              component="span"
              sx={{ width: 200, height: 200, backgroundColor: '#DDDDDD' }}
            >
              대표 이미지
              <PhotoCamera />
            </Box>
          </Stack>

          <TextField label="모임 이름" />

          <TextField label="모임 소개" />
          <Button variant="contained">완료</Button>
        </Stack>
      </Grid>
    </Container>
  );
}
