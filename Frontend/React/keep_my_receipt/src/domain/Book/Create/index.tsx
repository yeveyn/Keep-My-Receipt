import { Box, Button, Container, Pagination, Stack } from '@mui/material';
import Item from './Item';

export default function BookCreate() {
  return (
    <Container maxWidth="md">
      {/* 화면 위쪽 거래 정보 */}
      <Stack>
        <h1 style={{ textAlign: 'center' }}>거래등록</h1>
        <Stack direction="row" justifyContent="space-between">
          <p>날짜</p>
          <p>2022.04.20</p>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <p>총금액</p>
          <p>140000원</p>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <p>거래 개수</p>
          <p>5개</p>
        </Stack>
        <Button variant="contained" color="secondary">
          영수증 확인하기
        </Button>
        <Box>
          <Pagination count={10} variant="outlined" color="secondary" />
        </Box>
      </Stack>

      {/* 화면 아래쪽 각각의 항목 정보들 */}
      {/* 페이지네이션에 따라 한 개씩만 보여줘야 함 */}
      <Item />
    </Container>
  );
}
