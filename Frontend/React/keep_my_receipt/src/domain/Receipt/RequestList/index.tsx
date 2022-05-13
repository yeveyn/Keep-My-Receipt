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
import axios from 'axios';
import Pagination from '../../../components/Pagination';
import Navigation from '../../../header';
interface ItemType {
  requestId: number;
  crewName: string;
  price: number;
  state: string;
}

interface resopnseType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  list: ItemType[];
}

export default function RequestListIndex() {
  const { id } = useParams();
  const matches = useMediaQuery('(min-width:500px)');
  const [res, setRes] = useState<resopnseType>({
    pageNumber: 0,
    size: 0,
    totalPages: 0,
    numberOfElements: 0,
    totalElements: 0,
    list: [],
  });
  const [requests, setRequests] = useState(res.list);
  const getRequestList = async (page?: number) => {
    await axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${id}/requests`, {
        params: {
          state: 'ALL',
          page: page ? page : 0,
          size: 5,
          sort: 'id,DESC',
        },
      })
      .then((response) => {
        setRes(response.data.data);
        setRequests(response.data.data.list);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [manageable, setManageable] = useState(false);
  const checkManageable = async () => {
    await axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${id}/crew/auth`)
      .then((response) => {
        if (response.data.data === '리더' || response.data.data === '관리자') {
          setManageable(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRequestList(0);
    checkManageable();
  }, []);

  return (
    <Container maxWidth="md">
      <Navigation />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={
          matches
            ? { marginTop: 20, marginBottom: 30, width: '100%' }
            : { marginTop: 0, marginBottom: 100, width: '100%' }
        }
      >
        <Card
          variant="outlined"
          style={{
            padding: 5,
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
              xs={3}
              sm={3}
              md={3}
              item
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
              sm={5}
              md={5}
              item
              container
              justifyContent="center"
              alignItems="center"
            >
              <CardContent>
                <Typography style={{ fontWeight: 'bold' }}>총금액</Typography>
              </CardContent>
            </Grid>
            <Grid
              xs={3}
              sm={3}
              md={3}
              item
              container
              justifyContent="center"
              alignItems="center"
            >
              <CardContent>
                <Typography style={{ fontWeight: 'bold' }}>상태</Typography>
              </CardContent>
            </Grid>
            <Grid
              xs={1}
              sm={1}
              md={1}
              item
              container
              justifyContent="center"
              alignItems="center"
            >
              <CardContent>
                <Typography style={{ fontWeight: 'bold' }}></Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
        {requests.map((request: ItemType) => (
          <ItemIndex
            requestId={request.requestId}
            name={request.crewName}
            price={request.price}
            state={request.state}
            manageable={manageable}
            key={request.requestId.toString()}
          />
        ))}
        <br></br>
        <Pagination
          pageInfo={res}
          paginationSize={5}
          onClickPage={getRequestList}
          bgColor="#ffaa00"
        />
      </Grid>
    </Container>
  );
}
