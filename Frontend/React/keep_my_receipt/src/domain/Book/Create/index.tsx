import React, { useReducer, useState } from 'react';
import { Box, Container, Pagination } from '@mui/material';

import Header from './Header';
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
      <Header
        date={state.date}
        totalValue={state.totalValue}
        length={state.items.length}
      />

      {/* 중간 페이지네이션 버튼들 */}
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
