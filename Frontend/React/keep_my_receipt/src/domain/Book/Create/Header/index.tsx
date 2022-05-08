import { memo } from 'react';
import { Button, Stack } from '@mui/material';

interface HeaderType {
  date: string;
  totalValue: number;
  length: number;
}

function Header({ date, totalValue, length }: HeaderType) {
  return (
    <>
      <Stack>
        <h1 style={{ textAlign: 'center' }}>거래등록</h1>
        <Stack direction="row" justifyContent="space-between">
          <p>날짜</p>
          <p>{date}</p>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <p>총금액</p>
          <p>{totalValue}</p>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <p>거래 개수</p>
          <p>{length}</p>
        </Stack>
        <Button variant="contained" color="secondary">
          영수증 확인하기
        </Button>
      </Stack>
    </>
  );
}

export default memo(Header);
