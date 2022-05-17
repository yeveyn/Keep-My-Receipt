import { Box, Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Video,
  Info,
  BannerButton,
  Content1,
  Content2,
  Content3,
  MyBanner,
} from './styles';
export default function Banner() {
  const navigate = useNavigate();
  const onClick = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      navigate('/club');
    } else {
      navigate('/login');
    }
  };

  return (
    <MyBanner>
      <Video autoPlay muted loop>
        <source src="/videos/bill.mp4"></source>
      </Video>
      <Info>
        <Content1>누구나 쉽게</Content1>
        <Content2>모임 관리부터 회계까지</Content2>
        <Content3>
          <BannerButton onClick={onClick}>바로가기</BannerButton>
        </Content3>
      </Info>
    </MyBanner>
  );
}
