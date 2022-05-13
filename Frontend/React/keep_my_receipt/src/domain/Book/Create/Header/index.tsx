import React, { memo } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
// import { Schedule, PointOfSale } from '@mui/icons-material';

import { BookAction, updateBook } from '../../bookReducer';
import toCurrency from '../../../../services/toCurrency';

interface HeaderType {
  date: string;
  totalValue: number;
  length: number;
  dispatch: React.Dispatch<BookAction>;
}

function Header({ date, totalValue, length, dispatch }: HeaderType) {
  const changeDate = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(updateBook('date', event.target.value));
  };

  return (
    <>
      <Stack>
        <h1 style={{ textAlign: 'center' }}>거래등록</h1>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={1}
        >
          <Typography>날짜</Typography>
          <TextField
            type="date"
            defaultValue={date}
            onChange={changeDate}
            variant="standard"
            // label="시작일"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            // style={{ width: '100%' }}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between" marginBottom={1}>
          <Typography>총금액</Typography>
          <Typography>{toCurrency(totalValue)}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" marginBottom={1}>
          <Typography>거래 개수</Typography>
          <Typography>{length}</Typography>
        </Stack>
        <Button variant="outlined" color="secondary" sx={{ marginTop: 1 }}>
          영수증 확인
        </Button>
      </Stack>
    </>
  );
}

export default memo(Header);
