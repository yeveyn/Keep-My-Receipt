import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  Container,
  useMediaQuery,
  Grid,
  Card,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  MenuItem,
  Stack,
} from '@mui/material';
import LargeTagChart from './LargeTagChart';
import FlowChart from './FlowChart';
import axios from 'axios';
import sample1 from './sample1.json';
import sample3 from './sample3.json';
import Navigation from '../../header';

export default function MainChartIndex() {
  const { id } = useParams();
  const matches = useMediaQuery('(min-width:500px)');

  const date = new Date();
  const year = String(date.getFullYear());
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const [curYear, setYear] = useState(year);
  const [curMonth, setMonth] = useState(month);
  const yearList = ['2022', '2021', '2020', '2019', '2018'];
  const [monthList, setMonthList] = useState(getMonthList);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    loadData();
    setOpen(false);
  };
  function getMonthList() {
    return [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
    ].filter((item) => parseInt(item) <= parseInt(month));
  }
  function changeYear(e: any) {
    const newYear = e.target.value;
    if (newYear > year) {
      alert(`${curYear}년 이후의 날짜로 설정할 수 없습니다.`);
      e.target.value = newYear;
      return;
    }
    setYear(e.target.value);
    if (newYear === year) {
      setMonthList(
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].filter(
          (item) => parseInt(item) <= parseInt(month),
        ),
      );
    } else {
      setMonthList([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ]);
    }
    if (newYear === year && curMonth > month) {
      setMonth(month);
    }
  }
  function changeMonth(e: any) {
    setMonth(e.target.value);
  }

  const [tagItems, setTagItems] = useState([
    { id: '0', value: '0', rate: '0' },
  ]);
  const [sumTagValue, setSumTagValue] = useState(0);
  const [flowItems, setFlowItems] = useState([{ date: '2022.5', value: '0' }]);
  const [sumFlowValue, setSumFlowValue] = useState(0);

  function loadData() {
    console.log('Analytics : load Data from DB');
    setTagItems(sample1);
    setFlowItems(sample3);
    let tmpSumTagValue = 0;
    sample1.forEach((item) => {
      tmpSumTagValue += parseInt(item.value);
    });
    setSumTagValue(tmpSumTagValue);
    let tmpSumFlowValue = 0;
    sample3.forEach((item) => {
      tmpSumFlowValue += parseInt(item.value);
    });
    setSumFlowValue(tmpSumFlowValue);
    axios
      .get(
        `https://k6d104.p.ssafy.io/api/spring/chart/${id}/${year}/${
          month[0] === '0' ? month[1] : month
        }`,
      )
      .then((response) => {
        console.log('analytics API test', response);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container maxWidth="md">
      <Navigation />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={5.8} sm={5.8} md={5.8}>
              <Select
                id="year"
                value={curYear}
                onChange={changeYear}
                autoWidth
                label="Year"
              >
                {yearList.map((item) => (
                  <MenuItem value={item}>{item}년</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={5.8} sm={5.8} md={5.8}>
              <Select
                id="month"
                value={curMonth[0] === '0' ? curMonth[1] : curMonth}
                onChange={changeMonth}
                autoWidth
                label="Month"
              >
                {monthList.map((item) => (
                  <MenuItem value={item}>{item}월</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0.5}
        style={
          matches
            ? { marginTop: 20, marginBottom: 30, width: '100%' }
            : { marginTop: 0, marginBottom: 100, width: '100%' }
        }
      >
        <Stack spacing={2} style={{ width: '100%' }}>
          <Card
            variant="outlined"
            style={{
              padding: 15,
              width: '100%',
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              style={{ width: '100%' }}
            >
              <Grid item xs={8} sm={8} md={8} container justifyContent="start">
                <Typography
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  {curYear}년&nbsp;
                  {curMonth[0] === '0' ? curMonth[1] : curMonth}
                  월&nbsp;지출&nbsp;분석
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} md={4} container justifyContent="end">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ fontWeight: 'bold' }}
                  onClick={handleOpen}
                >
                  기간설정
                </Button>
              </Grid>
            </Grid>
          </Card>
          <LargeTagChart sumValue={sumTagValue} items={tagItems} />
          <FlowChart sumValue={sumFlowValue} items={flowItems} />
        </Stack>
      </Grid>
    </Container>
  );
}
