import axios from 'axios';
import { useEffect, useState } from 'react';
import Banner from './Landing/Banner';
import GuideFirst from './Landing/Guide-1';
import GuideSecond from './Landing/Guide-2';
import GuideThird from './Landing/Guide-3';

export default function Landing() {
  //로그인한 상태라면 navbar 보여주기
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    //모바일 기기일 경우, 자동로그인 axios 요청
    if (window['Android']) {
      if (window['Android']['getAutoLogin']()) {
        const id = window['Android']['getId']();
        const password = window['Android']['getPassword']();
        const mobileToken = window['Android']['requestToken']();

        axios
          .post('/api/spring/crew/login', {
            email: id,
            password: password,
            fcmToken: mobileToken,
          })
          .then(function (response) {
            const { accessToken } = response.data.data;
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${accessToken}`;
            sessionStorage.setItem('accessToken', `Bearer ${accessToken}`);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }, []);

  // useEffect(() => {
  //   console.log(accessToken);
  //   window.scrollTo(0, 0);
  //   if (accessToken) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [accessToken]);

  return (
    <div>
      <Banner />
      <GuideFirst />
      <GuideSecond />
      <GuideThird />
    </div>
  );
}
