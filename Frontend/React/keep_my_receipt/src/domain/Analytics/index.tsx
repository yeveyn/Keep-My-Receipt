import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, useMediaQuery } from '@mui/material';

export default function MainChartIndex() {
  const { params } = useParams();
  const matches = useMediaQuery('(min-width:500px)');

  // useEffect(() => {
  //   fetch("http://k6d104.p.ssafy.io/api/spring/")
  //     .then((res) => res.json())
  //     .then((data) => setRequests(data));
  // }, []);

  return <Container maxWidth="md"></Container>;
}
