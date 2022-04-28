import { Container } from '@mui/material';

import useToggle from '../../../hooks/useToggle';
import Header from './Header';

export default function BookIndex() {
  const { toggleValue, ToggleButtons } = useToggle(['목록', '달력']);

  return (
    <Container>
      {/* 월, 지출, 수입 */}
      <Header />
      {/* 토글 버튼들 */}
      <ToggleButtons />
      {/* 토글 버튼에 따라 하단 모드 변경 */}
      {toggleValue === '목록' ? '이번 달 내용' : ''}
    </Container>
  );
}
