import React, { useEffect, useState } from 'react';
import { Container, IconButton, Grid, Stack } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';
import SearchList from './List';
import axios from 'axios';
import { AnyRecord } from 'dns';

type LocationState = { propWord: string; used: boolean };
interface resopnseType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
  list: any;
}

export default function GroupSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyWord = searchParams.get('query');
  const { propWord, used } = (location.state as LocationState) || {};
  const [word, setWord] = useState('');
  const [res, setRes] = useState<resopnseType>({
    pageNumber: 0,
    size: 0,
    totalPages: 0,
    numberOfElements: 0,
    totalElements: 0,
    list: {},
  });
  const {
    pageNumber,
    size,
    totalPages,
    numberOfElements,
    totalElements,
    list,
  } = res || null;

  useEffect(() => {
    if (!used && propWord) {
      console.log(
        'propWord로 모임 검색 API 요청' + '(검색어: ' + propWord + ')',
      );
      setWord(propWord);
      console.log(location);
    }
  }, []);
  useEffect(() => {
    if (keyWord) {
      setWord(keyWord);
      getClubList(keyWord);
    }
  }, [keyWord]);

  const getClubList = async (w?: string) => {
    const searchWord = w ? w : word;
    await axios
      .get('https://k6d104.p.ssafy.io/api/spring/clubs', {
        params: {
          name: searchWord,
          page: 0,
          size: 10,
          sort: 'id%2CASC',
        },
      })
      .then((response) => {
        setRes(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log(res);
    console.log(list);
  }, [res]);

  useEffect(() => {
    const accessToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJQayI6IjMiLCJpYXQiOjE2NTE2NTA4MzIsImV4cCI6MTY1MTczNzIzMn0.HPtPiIRfJKu096E-udxfmqcFYZScG8dyTpNdtX7RXew';

    // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }, []);
  return (
    <Container maxWidth="md">
      <Grid container direction="column">
        {/* 상단 */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          sx={{ position: 'relative' }}
        >
          <IconButton
            onClick={() => {
              // navigate('../');
              navigate(-1);
            }}
            color="inherit"
            sx={{ position: 'absolute', left: 0 }}
          >
            <ArrowBack sx={{ fontSize: '1.8rem' }} />
            {/* <span style={{ fontSize: '1rem' }}>내 모임</span> */}
          </IconButton>
          {/* 검색 창 */}
          <SearchBar
            value={word}
            setValue={setWord}
            onSearch={getClubList}
            navi={'.'}
          />
        </Stack>

        {/* 검색 결과 */}
        <Stack direction="column" spacing={2} alignItems="center">
          {/* 상단 */}
          <p>검색 결과 리스트</p>
          {/* 리스트 */}
          <SearchList clubList={list} />
          {/* 페이지네이션 */}
          <Stack>
            <p>pageNumber: {pageNumber}</p>
            <p>size: {size}</p>
            <p>totalPages: {totalPages}</p>
            <p>numberOfElements: {numberOfElements}</p>
            <p>totalElements: {totalElements}</p>
          </Stack>
        </Stack>
      </Grid>
    </Container>
  );
}
