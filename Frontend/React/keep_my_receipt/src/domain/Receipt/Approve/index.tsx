import React, { useState } from 'react';
import { Container, Grid, Button, Card, TextField, Stack } from '@mui/material';
import ListItem from './Item';
import sample from './sample.json';

export default function ApproveIndex() {
  const [imageUrl, setImageUrl] = useState('');
  const sampleList = sample;

  // function getImageUrlFromDB() {
  //   return "";
  // }

  // useEffect(() => {
  //   setImageUrl(getImageUrlFromDB());
  // }, [setImageUrl]);

  return (
    <Container maxWidth="xs">
      <Grid container direction="column" alignItems="center" spacing={2}>
        <img src={imageUrl} alt="" />
        <br></br>
        {sampleList.map((sample) => (
          <Card variant="outlined" style={{ padding: 15, width: '100%' }}>
            <TextField
              label="날짜"
              placeholder="xxxx-xx-xx"
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={sample.date}
            />
            <TextField
              label="총금액"
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={sample.money}
            />
          </Card>
        ))}
        <br></br>
        {sampleList.map((sample) => (
          <ListItem items={sample.items} />
        ))}
        <br></br>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          style={{ width: '100%' }}
        >
          <Button style={{ background: 'red', color: 'white', width: '100%' }}>
            거부
          </Button>
          <Button style={{ background: 'blue', color: 'white', width: '100%' }}>
            승인
          </Button>
        </Stack>
      </Grid>
    </Container>
  );
}
