import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Container, Stack } from '@mui/material';
import axios from 'axios';
import IndexList from './List';
import IndexHeader from './header';
import Pagination from '../../../components/Pagination';

interface listItemTypes {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface resopnseType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  list: listItemTypes[];
}
export default function ClubIndex() {
  // 모임 목록 조회
  const [res, setRes] = useState<resopnseType>({
    pageNumber: 0,
    size: 0,
    totalPages: 0,
    numberOfElements: 0,
    totalElements: 0,
    list: [],
  });
  const { list } = res || null;
  const getClubList = async (page?: number) => {
    await axios
      .get('https://k6d104.p.ssafy.io/api/spring/clubs/joined', {
        params: {
          page: page ? page : 0,
          size: 5,
          sort: 'id,DESC',
        },
      })
      .then((response) => {
        // console.log(response);
        // console.log(response.data.data);
        setRes(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getClubList(0);
  }, []);
  useEffect(() => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJQayI6IjMiLCJpYXQiOjE2NTE5MDUzODcsImV4cCI6MTY1MTk5MTc4N30.1qGAqXHhWIKZE3zfdrQNf82VEWZEVwdO1ffBWC0SJn8';

    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }, []);
  return (
    <Container maxWidth="md">
      <Grid container direction="column" sx={{ marginBottom: 3 }}>
        {/* Header */}
        <IndexHeader />

        {/* 리스트 */}
        <Stack
          direction="column"
          spacing={2}
          alignItems="center"
          sx={{ marginTop: '1rem' }}
        >
          {list.length ? <IndexList clubList={list} /> : <p>모임 없음</p>}
        </Stack>
        {/* 페이지네이션 */}
        <Stack>
          <Pagination pageInfo={res} />
        </Stack>
      </Grid>
    </Container>
  );
}
