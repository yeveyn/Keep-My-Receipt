import React, { useEffect, useState } from 'react';

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
      <Banner />
      <LandingFirst />
      <LandingSecond />
      <LandingThird />
      <LandingFourth />
    </div>
  );
}

export default Landing;
