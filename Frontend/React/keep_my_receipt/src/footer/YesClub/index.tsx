import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PaidIcon from '@mui/icons-material/Paid';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MenuIcon from '@mui/icons-material/Menu';
import * as React from 'react';

import Drawer from '@mui/material/Drawer';

import YesFooter from './YesFooter';

import YesDraw from './YesDraw';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function () {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: '250px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <YesDraw />
    </Box>
  );

  const [isLogin, setIsLogin] = useState(false);
  const myAccessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (myAccessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  let userAuth = '';

  const [userAuthNum, setUserAuthNum] = useState(3);
  const [addMenu, setAddMenu] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (addMenu == null) {
      setAddMenu(event.currentTarget);
    } else {
      setAddMenu(null);
    }
  };

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    axios
      .get(`api/spring/club/${id}/crew/auth`)
      .then((res) => {
        if (res.data) {
          const check = res.data;
          userAuth = check.data;
          if (userAuth === '리더') {
            setUserAuthNum(1);
          } else if (userAuth === '관리자') {
            setUserAuthNum(2);
          } else if (userAuth === '회원') {
            setUserAuthNum(3);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  }, [id]);

  const onClickButton = (url: string) => {
    navigate(url);
    setOpen(false);
  };

  return (
    <>
      <div>
        <BottomNavigation
          sx={{
            width: '100%',
            float: 'right',
          }}
          showLabels
        >
          {/* 햄버거 */}
          <BottomNavigationAction
            sx={{
              ...(open && { display: 'none' }),
              padding: 0,
              '@media (max-width: 768px)': {
                minWidth: 'auto',
                padding: '6px 0',
              },
            }}
            onClick={toggleDrawer('left', true)}
            label={'전체'}
            icon={<MenuIcon />}
          ></BottomNavigationAction>

          {userAuthNum <= 2 ? (
            <BottomNavigationAction
              sx={{
                padding: 0,
                '@media (max-width: 768px)': {
                  minWidth: 'auto',
                  padding: '6px 0',
                },
              }}
              onClick={() => {
                onClickButton(`/club/${id}/book`);
              }}
              label={'거래 내역'}
              icon={<PlaylistAddIcon />}
            ></BottomNavigationAction>
          ) : (
            <></>
          )}

          {/* 거래 등록 */}
          {userAuthNum <= 2 ? (
            <BottomNavigationAction
              sx={{
                padding: 0,
                '@media (max-width: 768px)': {
                  minWidth: 'auto',
                  padding: '6px 0',
                },
              }}
              onClick={() => {
                onClickButton(`/club/${id}/book/create`);
              }}
              label={'거래등록'}
              icon={<PeopleAltIcon />}
            ></BottomNavigationAction>
          ) : (
            <BottomNavigationAction
              sx={{
                padding: 0,
                '@media (max-width: 768px)': {
                  minWidth: 'auto',
                  padding: '6px 0',
                },
              }}
              onClick={() => {
                onClickButton(`/club/${id}/book`);
              }}
              label={'거래내역'}
              icon={<PeopleAltIcon />}
            ></BottomNavigationAction>
          )}

          {/* 영수증 내역 */}
          <BottomNavigationAction
            sx={{
              padding: 0,
              '@media (max-width: 768px)': {
                minWidth: 'auto',
                padding: '6px 0',
              },
            }}
            onClick={() => {
              onClickButton(`/club/${id}/receipt/requestList`);
            }}
            label={'영수증내역'}
            icon={<PaidIcon />}
          ></BottomNavigationAction>
          {/* 분석차트 */}
          <BottomNavigationAction
            sx={{
              padding: 0,
              '@media (max-width: 768px)': {
                minWidth: 'auto',
                padding: '6px 0',
              },
            }}
            onClick={() => {
              onClickButton(`/club/${id}/analytics/mainChart`);
            }}
            label={'분석차트'}
            icon={<InsertChartIcon />}
          ></BottomNavigationAction>
        </BottomNavigation>

        <Drawer
          anchor={'left'}
          open={state['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </div>

      <YesFooter />
    </>
  );
}
