import axios from 'axios';
import React, { useEffect, useState } from 'react';

import Navigation from '../../header';
import Banner from './Landing/Banner';
import GuideFirst from './Landing/Guide-1';
import GuideSecond from './Landing/Guide-2';
import GuideThird from './Landing/Guide-3';
// import GuideFourthFirst from './Landing/Guide-4-1';

function Landing() {
  //로그인한 상태라면 navbar 보여주기
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (window['Android']) {
      const id = window['Android']['getId']();
      const password = window['Android']['getPassword']();
      const mobileToken = window['Android']['requestToken']();
      console.log(`id ${id}`);
      console.log(`pw : ${password}`);
      console.log(`mobileToken : ${mobileToken}`);
      axios
        .post('/api/spring/crew/login', {
          email: id,
          password: password,
          fcmToken: mobileToken,
        })
        .then(function (response) {
          // alert(response.data.toString());
          console.log(
            `랜딩페이지 response.toString() : ${response.data.data.toString()}`,
          );
          console.log(`랜딩페이지 response : ${response.data.data}`);
          const { accessToken } = response.data;
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`; // header accessToken 설정
          sessionStorage.setItem('accessToken', `Bearer ${accessToken}`);
          console.log(`accessToken : ${accessToken}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    console.log(accessToken);
    window.scrollTo(0, 0);
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [accessToken]);

  return (
    <div>
      <Banner />
      <GuideFirst />
      <GuideSecond />
      <GuideThird />
    </div>
  );
}

export default Landing;
