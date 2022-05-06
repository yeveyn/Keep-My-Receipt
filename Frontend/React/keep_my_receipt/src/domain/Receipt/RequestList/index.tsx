import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ItemIndex from './Item';
import sample from './sample.json';

// https://cotak.tistory.com/112
export default function RequestListIndex() {
  const { params } = useParams();
  const [requests, setRequests] = useState(sample);
  const matches = useMediaQuery('(min-width:500px)');

  // useEffect(() => {
  //   fetch("http://k6d104.p.ssafy.io/api/spring/")
  //     .then((res) => res.json())
  //     .then((data) => setRequests(data));
  // }, []);

  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={
          matches
            ? { marginTop: 30, marginBottom: 30, width: '100%' }
            : { marginTop: 0, marginBottom: 30, width: '100%' }
        }
      >
        <Card
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
            justifyContent="space-evenly"
            alignItems="center"
            style={{ width: '100%' }}
          >
            <Grid
              xs={4}
              sm={4}
              md={4}
              container
              justifyContent="center"
              alignItems="center"
            >
              <CardContent>
                <Typography style={{ fontWeight: 'bold' }}>날짜</Typography>
              </CardContent>
            </Grid>
            <Grid
              xs={3}
              sm={4}
              md={4}
              container
              justifyContent="center"
              alignItems="center"
            >
              <CardContent>
                <Typography style={{ fontWeight: 'bold' }}>멤버</Typography>
              </CardContent>
            </Grid>
            <Grid
              xs={5}
              sm={4}
              md={4}
              container
              justifyContent="center"
              alignItems="center"
            >
              <CardContent>
                <Typography style={{ fontWeight: 'bold' }}>총금액</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        {requests.map((request) => (
          <ItemIndex
            id={request.id}
            name={request.name}
            date={request.date}
            money={request.money}
          />
        ))}
      </Grid>
    </Container>
  );
}
