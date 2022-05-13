import { Grid, Card, CardContent, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { teal } from '@mui/material/colors';

interface ItemType {
  notificationId: number;
  title: string;
  body: string;
  date: string;
  notiCode: string;
  clubId: number;
  requestId: number;
  read: string;
}

export default function ListItem({
  item,
  getAlarms,
}: {
  item: ItemType;
  getAlarms: any;
}) {
  const navigate = useNavigate();
  const grey = teal[500];
  function connectNotification(alarm: ItemType) {
    updateNotification(alarm.notificationId);
    const notiCode = alarm.notiCode;
    if (notiCode === '가입') {
      navigate(`/club/${alarm.clubId}/manage`);
    } else if (notiCode === '청구') {
      navigateApprove(alarm.clubId, alarm.requestId);
    } else {
      getAlarms();
    }
  }
  const updateNotification = async (notificationId: number) => {
    await axios
      .put(
        `https://k6d104.p.ssafy.io/api/spring/notification/${notificationId}`,
      )
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const deleteNotification = async (notificationId: number) => {
    await axios
      .delete(
        `https://k6d104.p.ssafy.io/api/spring/notification/${notificationId}`,
      )
      .then((response) => {
        console.log(response);
        getAlarms();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const navigateApprove = async (clubId: number, requestId: number) => {
    axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/request/${requestId}`)
      .then((response) => {
        const data = response.data.data;
        if (data.state === '신청') {
          navigate(`/club/${clubId}/receipt/approve`, {
            state: {
              requestId: data.requestId,
              date: data.payDate,
              value: data.price,
              receiptUrl: data.receiptUrl,
            },
          });
        } else {
          alert('이미 처리된 청구입니다');
          getAlarms();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const [clubImg, setClubImg] = useState('');
  const [clubName, setClubName] = useState('');
  const getClubInfo = async (clubId: number) => {
    axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${clubId}`)
      .then((response) => {
        setClubImg(response.data.data.image);
        setClubName(response.data.data.name);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getClubInfo(item.clubId);
  }, []);

  return (
    <Card style={{ width: '100%' }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        style={{ width: '100%', paddingTop: 10, paddingBottom: 10 }}
        sx={{
          ':hover': {
            backgroundColor: '#FFF5E1',
          },
        }}
      >
        <Grid
          item
          xs={3}
          sm={3}
          md={3}
          container
          justifyContent="center"
          alignItems="center"
          style={{ width: '100%' }}
        >
          {clubImg.substring(0, 4) === 'http' ? (
            <img src={clubImg} style={{ width: '100%' }} />
          ) : (
            <Typography fontSize="0.7rem">No Image</Typography>
          )}
        </Grid>
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          container
          direction="column"
          justifyContent="space-between"
          alignItems="start"
          onClick={() => connectNotification(item)}
        >
          <Typography
            fontSize="0.7rem"
            style={
              item.read.toString() === 'false' ? { fontWeight: 'bold' } : {}
            }
          >
            {item.title}
          </Typography>
          <Typography
            fontSize="1rem"
            style={
              item.read.toString() === 'false' ? { fontWeight: 'bold' } : {}
            }
          >
            {item.body}
          </Typography>
          <Typography
            fontSize="0.7rem"
            color={grey}
            style={
              item.read.toString() === 'false' ? { fontWeight: 'bold' } : {}
            }
          >
            {item.date.split('T')[0].substring(5)[0] === '0'
              ? item.date.split('T')[0].substring(6).replace('-', '/')
              : item.date.split('T')[0].substring(5).replace('-', '/')}
            &nbsp;&nbsp;&nbsp;
            {item.date.split('T')[1].substring(0, 5)}
            &nbsp;&nbsp;&nbsp;
            {clubName}
          </Typography>
        </Grid>
        <Grid item xs={1} sm={1} md={1}>
          <CancelIcon
            onClick={() => deleteNotification(item.notificationId)}
            style={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
