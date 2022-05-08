import React, { useReducer, useState } from 'react';
import { Box, Button, Container, Pagination, Stack } from '@mui/material';

import Item from './Item';
import bookReducer from '../bookReducer';
import bookSample from './sample.json';

export default function BookCreate() {
  const [state, dispatch] = useReducer(bookReducer, bookSample);
  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="md">
      {/* 화면 위쪽 거래 정보 */}
      <Stack>
        <h1 style={{ textAlign: 'center' }}>거래등록</h1>
        <Stack direction="row" justifyContent="space-between">
          <p>날짜</p>
          <p>{state.date}</p>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <p>총금액</p>
          <p>{state.totalValue}</p>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <p>거래 개수</p>
          <p>{state.items.length}</p>
        </Stack>
        <Button variant="contained" color="secondary">
          영수증 확인하기
        </Button>
      </Stack>

      <Box>
        <Pagination
          count={state.items.length}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
        />
      </Box>

      {/* 화면 아래쪽 각각의 항목 정보들 */}
      {/* 페이지네이션에 따라 한 개씩만 보여줘야 함 */}
      <Item
        item={state.items[page - 1]}
        itemIndex={page - 1}
        dispatch={dispatch}
      />
    </Container>
  );
}
