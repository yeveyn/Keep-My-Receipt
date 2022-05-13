import { useState, useEffect } from 'react';
import ListItem from '../Listitem';
import axios from 'axios';
import Pagination from '../../../../components/Pagination';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface AlarmType {
  notificationId: number;
  title: string;
  body: string;
  date: string;
  notiCode: string;
  clubId: number;
  requestId: number;
  read: string;
}

interface ResponseType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  list: AlarmType[];
}

export default function AlertList() {
  const navigate = useNavigate();
  const [alarms, setAlarms] = useState([
    {
      notificationId: 0,
      title: 'test',
      body: 'test',
      date: '2022-05-12T04:22:01',
      notiCode: '테스트',
      clubId: 0,
      requestId: 0,
      read: 'false',
    },
  ]);
  const [res, setRes] = useState<ResponseType>({
    pageNumber: 0,
    size: 0,
    totalPages: 0,
    numberOfElements: 0,
    totalElements: 0,
    list: [],
  });
  const getAlarms = async (page?: number) => {
    await axios
      .get('https://k6d104.p.ssafy.io/api/spring/notifications', {
        params: {
          page: page ? page : 0,
          size: 5,
          sort: 'id,DESC',
        },
      })
      .then((response) => {
        setRes(response.data.data);
        setAlarms(response.data.data.list);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAlarms();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ width: '100%' }}
    >
      {alarms.map((alarm) => (
        <ListItem
          item={alarm}
          key={alarm.notificationId.toString()}
          getAlarms={getAlarms}
        />
      ))}
      <br></br>
      {alarms.length < 1 ? (
        <Typography textAlign="center">
          &nbsp;&nbsp;알림이 존재하지 않습니다.&nbsp;&nbsp;
        </Typography>
      ) : (
        <Pagination
          pageInfo={res}
          paginationSize={5}
          onClickPage={getAlarms}
          bgColor="#ffaa00"
        />
      )}
    </Grid>
  );
}
