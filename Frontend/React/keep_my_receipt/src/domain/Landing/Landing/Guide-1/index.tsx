import { Title, Description, Point, Point2 } from './styles';
import { Box, Button, Container, Grid, useMediaQuery } from '@mui/material';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import 'animate.css/animate.min.css';
export default function GuideFirst() {
  const matches = useMediaQuery('(min-width:500px)');
  return (
    <Container
      style={
        matches
          ? { width: '100%', marginTop: '100px' }
          : { width: '100%', marginTop: '0px' }
      }
      fixed
      maxWidth="lg"
    >
      <Grid
        container
        sx={{
          width: '100%',
        }}
        spacing={2}
      >
        {/* 설명 */}

        <Grid item xs={12} sm={6}>
          {/* <AnimationOnScroll animateIn="animate__fadeIn animate__slower"> */}
          <Box
            style={
              matches
                ? { marginBottom: '40px', paddingTop: '200px' }
                : { marginBottom: '40px', paddingTop: '40px' }
            }
          >
            <Point2>#내역 #회비</Point2>
            <Title>모임 지출 내역과</Title>
            <Title>잔액을 한눈에</Title>
            <Description>
              회비를 어떻게 쓰는지 일자별로 확인해 보세요
            </Description>
          </Box>
          {/* </AnimationOnScroll> */}
        </Grid>

        <Grid item xs={12} sm={6}>
          <AnimationOnScroll animateIn="animate__fadeIn animate__slower">
            <Box textAlign="center" width={'100%'}>
              <img
                src="/images/randing/iphone.png"
                width="70%"
                height="10%"
              ></img>
            </Box>
          </AnimationOnScroll>
        </Grid>
      </Grid>
    </Container>
  );
}
