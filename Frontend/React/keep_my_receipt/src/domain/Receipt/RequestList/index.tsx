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
import axios from 'axios';
import Pagination from '../../../components/Pagination';

interface listItemTypes {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface resopnseType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  list: listItemTypes[];
}

// https://cotak.tistory.com/112
export default function RequestListIndex() {
  const { params } = useParams();
  const [requests, setRequests] = useState(sample);
  const matches = useMediaQuery('(min-width:500px)');
  const [res, setRes] = useState<resopnseType>({
    pageNumber: 0,
    size: 0,
    totalPages: 0,
    numberOfElements: 0,
    totalElements: 0,
    list: [],
  });
  const { list } = res || null;
  const getClubList = async (page?: number) => {
    await axios
      .get('https://k6d104.p.ssafy.io/api/spring/clubs/joined', {
        params: {
          page: page ? page : 0,
          size: 5,
          sort: 'id,DESC',
        },
      })
      .then((response) => {
        // console.log(response);
        // console.log(response.data.data);
        setRes(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getClubList(0);
  }, []);

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
            ? { marginTop: 100, marginBottom: 30, width: '100%' }
            : { marginTop: 70, marginBottom: 100, width: '100%' }
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
        <Pagination
          pageInfo={res}
          paginationSize={5}
          onClickPage={getClubList}
          bgColor="#ffaa00"
        />
      </Grid>
    </Container>
  );
}
