import React from 'react';
import Container from '@mui/material/Container';
import ButtonUnstyled, { ButtonUnstyledProps } from '@mui/base/ButtonUnstyled';
import {
  Background,
  ChiChu,
  ChiChuAnimation,
  ChichuColor,
  Content,
  ContentDiv,
  CustomBannerButtonRoot,
  Title,
  TitleSmall,
} from './styles';
import { useNavigate } from 'react-router-dom';

function CustomButton(props: ButtonUnstyledProps) {
  return <ButtonUnstyled {...props} component={CustomBannerButtonRoot} />;
}

function Banner() {
  const navigate = useNavigate();
  return (
    <div>
      <Background src="/images/randing/background.png" />
      <Container>
        <ChiChuAnimation>
          <ChiChu src="/images/randing/chichu.png" alt="" />
        </ChiChuAnimation>
        <ContentDiv>
          <Title>영수증을 부탁해!</Title>
          <Content>모임 관리</Content>
          <CustomButton onClick={() => navigate('/login')}>
            모임관리 시작하기
          </CustomButton>
        </ContentDiv>
      </Container>
    </div>
  );
}

export default Banner;
