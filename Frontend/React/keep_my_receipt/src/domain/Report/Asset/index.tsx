import { useState } from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import { AssetReportType } from './type';
import sample from './sample.json';

export default function AssetReport() {
  const sampleList: AssetReportType = sample;

  const date = new Date();
  const year = String(date.getFullYear());
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const curStart = year.concat('-').concat(month).concat('-').concat('01');
  const curEnd = year.concat('-').concat(month).concat('-').concat(day);
  const [startDate, setStartDate] = useState(curStart);
  const [endDate, setEndDate] = useState(curEnd);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // loadData();
    setOpen(false);
  };

  return (
    <>
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
          <Grid xs={8} sm={8} md={8} container justifyContent="start">
            <Typography
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                width: '100%',
              }}
            >
              {startDate}　~　{endDate}
            </Typography>
          </Grid>
          <Grid xs={4} sm={4} md={4} container justifyContent="end">
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
    </>
  );
}
