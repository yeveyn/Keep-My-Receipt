import styled, { keyframes } from 'styled-components';

const focus = keyframes`
    0% {
      filter:blur(12px);opacity:0
    }
    100% {
      filter:blur(0);opacity:1
    }
`;

export const Point = styled.div`
  font-family: NanumGothicRegular;
  font-weight: bold;
  font-size: 1.5vw;
  letter-spacing: -5px;
  color: #ffa500;
  margin: 8px;

  @media only screen and (max-width: 768px) {
    font-size: 8vw;
  }
`;

export const Title = styled.div`
  font-family: NanumGothicBold;
  font-weight: bold;
  font-size: 3vw;
  letter-spacing: -5px;
  color: #515151;
  margin: 8px;

  @media only screen and (max-width: 768px) {
    font-size: 8vw;
  }
`;

export const Description = styled.div`
  margin-left: 10px;
  margin-right: 15px;
  font-weight: bold;
  font-family: NanumGothicRegular;
  font-size: 1.5vw;
  letter-spacing: -2px;
  color: #878787;
  @media only screen and (max-width: 768px) {
    // margin-right: 40px;
    font-size: 4vw;
  }
`;
