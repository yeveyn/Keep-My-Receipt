import React, { useState, useEffect } from 'react';
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
import sample from './sample.json';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Todolist : 웹 상에선 사진과 입력란 가로로 1:1
// 이 페이지 들어올 때 : db를 통해 sample.json 형식으로 데이터 읽어와서 변수에 할당해주기
// 승인 : 해당 영수증은 db에 저장 && 거래 등록 페이지로 넘어감(state 넘겨주기) && 알림에서 삭제
// 거부 : 메인 페이지로 넘어감 && 알림에서 삭제
export default function ApproveIndex() {
  const navigate = useNavigate();
  const [newDate, setDate] = useState(sample[0].date);
  const [newMoney, setMoney] = useState(sample[0].money);
  const imgUrl = sample[0].image;
  const [newItems, setItems] = useState(sample[0].items);
  const matches = useMediaQuery('(min-width:500px)');

  // useEffect(loadingDataFromDB, []);
  // function loadingDataFromDB() {
  //   // 구현되면 useState() <- 값 비워두고, DB 결과를 setState() 해준다
  //   fetch('https://k6d104.p.ssafy.io/api/spring/book/{groupid}/request', {
  //     method: 'GET',
  //   }).then((res) => {
  //     if (res.ok) {
  //     } else {
  //       return res.json().then((data) => {
  //         console.log(data);
  //       });
  //     }
  //   });
  // }

  function createItem() {
    const nextItems = [...newItems];
    const newSize = nextItems.length;
    nextItems[newSize] = {
      id: newSize,
      content: newSize.toString(),
      money: newSize.toString(),
    };
    setItems(nextItems);
  }

  function renderingItems() {
    return newItems.map((item, index) => (
      <ListItem
        id={item.id}
        content={item.content}
        money={item.money}
        setItems={setItems}
        newItems={newItems}
        key={item.money + index}
      />
    ));
  }

  function submitHandler(event: any) {
    event.preventDefault();
    const prop = {
      imgUrl: imgUrl,
      date: newDate,
      money: newMoney,
      items: newItems,
    };
    console.log('submit', prop);
    newItems.forEach((item) => {
      if (item.money === '' || item.content === '') {
        alert('비어있는 항목이 존재합니다');
        return;
      }
    });

    // 영수증 db에 저장
    // 알림 삭제

    //navigate('/book/create', { state: prop });
  }

  function previousHandler(event: any) {
    event.preventDefault();
    //알림 삭제

    //navigate(-1);
  }

  return (
    <Container maxWidth="md">
      <div style={matches ? { marginTop: 30 } : { marginTop: '0' }}>
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
            <br></br>
            {renderingItems()}
          </Stack>
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
              onClick={previousHandler}
            >
              거부
            </Button>
          </Grid>
          <Grid xs={5.8} sm={4.8} md={3.8}>
            <Button variant="contained" fullWidth onClick={submitHandler}>
              승인
            </Button>
          </Grid>
        </Grid>
        <br></br>
      </div>
    </Container>
  );
}
