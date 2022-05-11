import React, { useState } from 'react';
import {
  Container,
  Grid,
  Button,
  Card,
  TextField,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

// Todolist : 웹 상에선 사진과 입력란 가로로 1:1
// 이 페이지 들어올 때 : db를 통해 sample.json 형식으로 데이터 읽어와서 변수에 할당해주기
// 승인요청 : 알림 보내기 && 요청테이블 create API
export default function RequestIndex() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state }: { state: any } = useLocation();
  const [newDate, setDate] = useState(state.date);
  const [newMoney, setMoney] = useState(state.value);
  const imgUrl = state.receiptUrl;
  const matches = useMediaQuery('(min-width:500px)');

  function submitHandler(event: any) {
    event.preventDefault();
    // date 및 money 제약사항

    axios
      .post(`https://k6d104.p.ssafy.io/api/spring/club/${id}/request`, {
        params: {
          data: newDate,
          price: newMoney,
          receiptUrl: imgUrl,
        },)
      .then((response) => {
        console.log(response);
        //navigate(`/club/${id}/receipt/receiptList`);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Container maxWidth="md">
      <div
        style={
          matches
            ? { marginTop: 100, marginBottom: 0, width: '100%' }
            : { marginTop: 70, marginBottom: 70, width: '100%' }
        }
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          style={{ width: '100%' }}
        >
          <Stack spacing={2} style={{ width: '100%' }}>
            <Card variant="outlined" style={{ padding: 15, width: '100%' }}>
              <img src={imgUrl} alt="" style={{ width: '100%' }} />
            </Card>
            <br></br>
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
                value={newDate}
                onChange={(e: any) => setDate(e.target.value)}
              />
              <TextField
                label="총금액"
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={newMoney}
                onChange={(e: any) => setMoney(e.target.value)}
              />
            </Card>
          </Stack>
        </Grid>
        <br></br>
        <br></br>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignContent="center"
        >
          <Button
            variant="contained"
            fullWidth
            color="success"
            onClick={submitHandler}
          >
            승인요청
          </Button>
        </Grid>
        <br></br>
      </div>
    </Container>
  );
}
