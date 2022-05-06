import './index.css';
import { useState, useRef, useCallback, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Button,
  ButtonProps,
  Stack,
  TextField,
  Container,
  Input,
  Alert,
  InputAdornment,
  Dialog,
} from '@mui/material';
import { yellow } from '@mui/material/colors';
import React from 'react';
import { useInput } from '@mui/base';
import { Password } from '@mui/icons-material';

//FCM SDK 추가 및 초기화
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
// 메시지 전송
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { onBackgroundMessage } from 'firebase/messaging/sw';

export default function AuthForm() {
  //fcm
  //FCM SDK 추가 및 초기화
  const config = {
    apiKey: 'AIzaSyDGykCVGG6PGRdGT8-Y5H7aQAIcr_27Tqs',
    authDomain: 'keep-my-receipt.firebaseapp.com',
    projectId: 'keep-my-receipt',
    storageBucket: 'keep-my-receipt.appspot.com',
    messagingSenderId: '891638757148',
    appId: '1:891638757148:web:1c9d4f1ca58fb5b48eecd9',
    measurementId: 'G-HMSK59MMM0',
  };

  // 허가요청
  firebase.initializeApp(config);
  // 등록 토큰 액세스
  const messaging = getMessaging();
  let token = '';

  // 웹 앱이 포그라운드 상태일 때 메시지 처리
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
  });

  // 스타일
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[50]),
    '&.MuiButton-contained': {
      color: 'white',
    },
    backgroundColor: yellow[800],
    '&:hover': {
      backgroundColor: yellow[800],
    },
  }));
  // const authCtx = useContext(AuthContext);
  //회원가입 - 로그인 형식바꾸는 부분
  const [isLogin, setIsLogin] = useState(true);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // input value 가져오기
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  // 대기중 버튼
  const [isLoading, setIsLoading] = useState(false);

  //
  const onChangeName = (e: any) => {
    setNickName(e.target.value);
  };

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const onChangeCheckPassword = (e: any) => {
    setCheckPassword(e.target.value);
  };
  getToken(messaging, {
    // FCM에서 웹 사용자 인증 정보 구성
    vapidKey:
      'BAOlbrGYtLAHLlKXzaoFFTaZIujMmBrXtngCRvt13MHAv-CqMwy9y-D2-yVPMN0udgkZ_uvjJtchfr-oBpqqrnM',
  })
    .then((currentToken) => {
      if (currentToken) {
        token = currentToken;
      } else {
        console.log(
          'No registration token available. Request permission to generate one.',
        );
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });

  // 회원가입 API -  useref 훅 이용해 입력 데이터 추출
  const submitHandler = (event: any) => {
    // 형식과 관계없이 확인버튼 눌러서 제출했을 때
    event.preventDefault();
    // 유효성 검사 - useState 사용하기
    // 1. 이메일 @
    // 2. 이메일 중복 확인
    // 3. 비밀번호와 비밀번호 확인 일치
    // 4. 비밀번호 8자이상 + (영문 + 숫자 + 특수문자 1개 이상)
    setIsLoading(true);

    // const fcmToken = token;
    const option = {
      method: 'POST',
      url: 'https://fcm.googleapis.com/fcm/send', //FCM서버의 주소입니다. 그대로 쓰시면 됩니다.
      json: {
        to: 'cdi8o5FabrH_8Mi28Ca3It:APA91bFM1cgNBDlul69y6hz-EbMh266fBVG-s0R5q-u_TMg_Pa0BgktjEHWkyx-ZD3i7Hmk69DoCCdVwTTaPB6sGDnE1akM_2Q6F2XfTMv7jEiianA62RNLVhwnI3ivI5jr_h__zWLgV', //2-2에서 복사해놓은 토큰을 사용합니다.
        notification: {
          //꼭 notification일 필요는 없습니다. data든 뭐든 바꿔도 됩니다.
          title: 'hello', //알림의 제목에 해당하는 부분입니다.
          body: 'world!', //알림의 본문에 해당하는 부분입니다.
        },
        //title이나 body이외에도 다른 옵션들이 많으니 찾아보시기 바랍니다.
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'AAAAz5nPtxw:APA91bGYoZ_21rR9OlzE2tn6-cBrx0cYHNzvkU8sNrrNhyollqYVvqMuoz7Qmyo286CztOP-lXShqFnfUaiGq4hNZwsyc1x_gUdSQ9FBoRP13gd0D2JhA2yPvb72hK_KXQ2O9_Cv_o7N', //위에서 찾았던 서버키 앞에 'key='을 붙여서 사용합니다.
      },
    };
    //모바일에서 로그인 > native app에게 달라고 요청하기
    // const mobileToken = window['Android']['requestToken']();

    // 로그인
    if (isLogin) {
      axios
        .post('https://k6d104.p.ssafy.io/api/spring/crew/login', {
          email: email,
          password: password,
          fcmToken: token,
        })
        .then(function (response) {
          setIsLoading(false);
          const errorMessage = response.data.msg;

          if (response.data.output == 0) {
            console.log('로그인 실패');
            alert(errorMessage);
          } else {
            console.log(token);
            console.log(response.data.data.refreshToken);
            alert('로그인 성공');
          }
        })
        .catch(function (error) {
          console.log('오류');
          console.log(error);
        });
    } else {
      // 회원가입 api
      axios
        .post('https://k6d104.p.ssafy.io/api/spring/crew/signup', {
          email: email,
          password: password,
          name: nickName,
        })
        .then(function (response) {
          setIsLoading(false);
          const errorMessage = response.data.msg;
          if (response.data.output == 0) {
            alert(errorMessage);
          } else {
            console.log('회원가입 성공');
            console.log(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <Container maxWidth="sm">
      <h1 className="h1">{isLogin ? '로그인' : '회원가입'}</h1>
      <form onSubmit={submitHandler}>
        <Stack spacing={1.5}>
          {!isLogin ? (
            <TextField
              onChange={onChangeName}
              type="text"
              id="nickname"
              name="nickname"
              required
              fullWidth
              label="이름"
              autoComplete="current-password"
              variant="outlined"
              size="small"
            />
          ) : (
            ''
          )}

          <TextField
            onChange={onChangeEmail}
            placeholder="이메일을 입력해주세요"
            id="email"
            name="email"
            required
            fullWidth
            label="이메일"
            type="email"
            autoComplete="current-password"
            variant="outlined"
            size="small"
          />

          <TextField
            onChange={onChangePassword}
            id="password"
            name="password"
            required
            fullWidth
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            helperText="특수문자, 영문, 숫자 모두 포함해야 합니다."
            size="small"
          />

          {!isLogin ? (
            <TextField
              onChange={onChangeCheckPassword}
              type="password"
              id="password-check"
              name="password-check"
              fullWidth
              label="비밀번호 확인"
              autoComplete="current-password"
              variant="outlined"
              size="small"
              required
            />
          ) : (
            ''
          )}

          <Stack>
            {!isLoading && (
              <ColorButton variant="contained" type="submit">
                확인
              </ColorButton>
            )}
            {isLoading && <Button variant="contained">로딩중...</Button>}
            <Button type="button" onClick={switchAuthModeHandler}>
              {isLogin ? (
                <h5>계정이 없으신가요? 회원가입 하러가기</h5>
              ) : (
                <h5>계정이 있으신가요? 로그인 하러가기</h5>
              )}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
