import { memo } from 'react';
import { IconButton, Pagination, Stack } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material/';

import { BookAction, createItem, deleteItem } from '../../bookReducer';

interface PageButtonType {
  count: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  dispatch: React.Dispatch<BookAction>;
}

function PageButtons({ count, page, setPage, dispatch }: PageButtonType) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginY={2}
      >
        {/* 페이지네이션 */}
        <Pagination
          count={count}
          siblingCount={0}
          boundaryCount={0}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
        />

        {/* 페이지 추가 버튼 */}
        <Stack direction="row">
          <IconButton
            onClick={() => {
              // 현재 페이지 뒤에 추가
              dispatch(createItem(page));
              setPage((page) => page + 1);
            }}
          >
            <AddCircle />
          </IconButton>

          {/* 페이지 삭제 버튼 */}
          <IconButton
            onClick={() => {
              // 현재 페이지 삭제
              dispatch(deleteItem(page - 1));
              // 페이지 2개 이상일 때만 1 줄임
              if (page >= 2) {
                setPage((page) => page - 1);
              }
            }}
          >
            <RemoveCircle />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
}

export default memo(PageButtons);
