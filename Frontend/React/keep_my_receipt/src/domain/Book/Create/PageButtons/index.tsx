import { memo } from 'react';
import { Button, Pagination, Stack } from '@mui/material';

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
      <Stack direction="row" alignItems="center">
        {/* 페이지네이션 */}
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
        />

        {/* 페이지 추가 버튼 */}
        <Button
          onClick={() => {
            // 현재 페이지 뒤에 추가
            dispatch(createItem(page));
            setPage((page) => page + 1);
          }}
        >
          추가
        </Button>

        {/* 페이지 삭제 버튼 */}
        <Button
          onClick={() => {
            // 현재 페이지 삭제
            dispatch(deleteItem(page - 1));
            // 페이지 2개 이상일 때만 1 줄임
            if (page >= 2) {
              setPage((page) => page - 1);
            }
          }}
        >
          삭제
        </Button>
      </Stack>
    </>
  );
}

export default memo(PageButtons);
