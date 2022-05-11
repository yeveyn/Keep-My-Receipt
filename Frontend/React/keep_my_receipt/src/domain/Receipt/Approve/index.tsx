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
import ListItem from './Item';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

// Todolist : 웹 상에선 사진과 입력란 가로로 1:1
// 거절 테스트 필요
export default function ApproveIndex() {
  const navigate = useNavigate();
  const clubId = useParams();
  const { state }: { state: any } = useLocation();
  const [newDate, setDate] = useState(state.date);
  const [newMoney, setMoney] = useState(state.value);
  const imgUrl = state.receiptUrl;
  const [newItems, setItems] = useState([
    { id: Math.random().toString(36).substr(2, 11), content: '', money: '' },
  ]);
  const matches = useMediaQuery('(min-width:500px)');

  function createItem() {
    const nextItems = [...newItems];
    const newSize = nextItems.length;
    nextItems[newSize] = {
      id: Math.random().toString(36).substr(2, 11),
      content: '',
      money: '',
    };
    setItems(nextItems);
  }

  function renderingItems() {
    return newItems.map((item) => (
      <ListItem
        id={item.id}
        content={item.content}
        money={item.money}
        setItems={setItems}
        newItems={newItems}
        key={item.id}
      />
    ));
  }

  function approveHandler(event: any) {
    event.preventDefault();

    let sum = 0;
    newItems.forEach((item) => {
      if (item.money === '' || item.content === '') {
        alert('비어있는 항목이 존재합니다');
        return;
      }
      sum += parseInt(item.money);
    });
    if (sum !== parseInt(newMoney)) {
      alert(
        `항목 금액의 총계(${sum
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
          .concat('원')})가 총금액(${newMoney
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
          .concat('원')})과 일치하지 않습니다`,
      );
      return;
    }
    const prop = {
      imgUrl: imgUrl,
      date: newDate,
      money: newMoney,
      items: newItems,
    };
    console.log('submit', prop);
    navigate(`/club/${clubId}/book/create`, { state: prop });
  }

  function rejectHandler(event: any) {
    event.preventDefault();
    axios
      .put(
        `https://k6d104.p.ssafy.io/api/spring/club/request/${state.requestId}/refusal`,
      )
      .then((response) => {
        console.log(`${state.requestId} request refusal: ${response}`);
        navigate(`/club/${clubId}/receipt/requestList`);
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
          direction={matches ? 'row' : 'column'}
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
            <br></br>
          </Stack>
          {renderingItems()}
        </Grid>
        <br></br>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignContent="center"
        >
          <AddCircleIcon onClick={createItem} />
        </Grid>
        <br></br>
        <br></br>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignContent="center"
        >
          <Grid xs={5.8} sm={4.8} md={3.8}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={rejectHandler}
            >
              거부
            </Button>
          </Grid>
          <Grid xs={5.8} sm={4.8} md={3.8}>
            <Button variant="contained" fullWidth onClick={approveHandler}>
              승인
            </Button>
          </Grid>
        </Grid>
        <br></br>
      </div>
    </Container>
  );
}
