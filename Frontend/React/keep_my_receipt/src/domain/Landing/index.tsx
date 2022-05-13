// import { useNavigate } from 'react-router-dom';

// export default function Landing() {
//   const navigate = useNavigate();
//   const onClick = () => {
//     navigate('/login');
//   };
//   return (
//     <>
//       <Navigation />
//       <h1>안녕하세요</h1>
//       <p>
//         랜딩페이지랜딩페이지랜딩페이지랜딩페이지랜딩페이지랜딩페이지랜딩페이지
//         랜딩페이지랜딩페이지 랜딩페이지 랜딩페이지 랜딩페이지 랜딩페이지
//         랜딩페이지 랜딩페이지랜딩페이지 랜딩페이지 랜딩페이지
//         랜딩페이지랜딩페이지 랜딩페이지랜딩페이지 랜딩페이지 랜딩페이지
//         랜딩페이지 랜딩페이지 랜딩페이지 랜딩페이지랜딩페이지
//         랜딩페이지랜딩페이지
//       </p>
//       <button onClick={onClick}>로그인하러 가기</button>
//     </>
//   );
// }

import React, { useEffect, useState } from 'react';
import Header from './Header';
import Navigation from '../../header';
import Banner from './Landing/Banner';
import LandingFirst from './Landing/Landing-1';

import LandingSecond from './Landing/Landing-2';

import LandingThird from './Landing/Landing-3';

import LandingFourth from './Landing/Landing-4';

function Landing() {
  const [isScroll, setIsScroll] = useState(false);

  const onScrollEvent = () => {
    if (window.pageYOffset > 0) {
      setIsScroll(true);
    }
    if (window.pageYOffset === 0) {
      setIsScroll(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('mousewheel', onScrollEvent);
    return () => {
      // TODO: 메모리 누수 방지
      window.removeEventListener('mousewheel', onScrollEvent);
    };
  }, []);
  return (
    <div>
      <Navigation />
      {/* <Header
        isScrollBackground={isScroll}
        isScrollShadow={isScroll}
        isScrollTransition={isScroll}
      /> */}
      <Banner />
      <LandingFirst />
      <LandingSecond />
      <LandingThird />
      <LandingFourth />
    </div>
  );
}

export default Landing;
