import React, { useState, useEffect } from 'react';
import { Container, Grid, Button, TextField, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// https://cotak.tistory.com/112
export default function RequestListIndex() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch("http://k6d104.p.ssafy.io/api/spring/")
  //     .then((res) => res.json())
  //     .then((data) => setPosts(data));
  // }, []);

  function testToken() {
    const token = window['Android']['requestToken']();
    alert(token);
    // if (window['Android']) {
    //   if (typeof (window["Android"]["requestToken"]) == "function") {
    //       if (params) {
    //         window[_CONFIG.android.handler][fn_name].apply(window[_CONFIG.android.handler], params);
    //       }
    //       else {
    //           window[_CONFIG.android.handler][fn_name]();
    //       }
    //     }
    //     else {
    //         // ERR CASE 2 : 함수가 존재하지 않는 경우
    //         throw new Error("안드로이드 객체에 함수[" + fn_name + "]가 존재하지 않습니다");
    //     }
    // }
    // else {
    //     // ERR CASE 1 : 객체가 존재하지 않는 경우
    //     throw new Error("안드로이드 객체가 존재하지 않습니다");
    // }
  }

  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ width: '100%' }}
      >
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        sdafsdafsa
        <Button onClick={testToken}>Click</Button>
      </Grid>
    </Container>
  );
}
