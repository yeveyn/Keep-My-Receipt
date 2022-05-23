import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';

import Typography from '@mui/material/Typography';

import Logo from '../Logo';

import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Button, Grid, ListItemAvatar, Stack } from '@mui/material';
import AlarmItem from '../AlarmItem';
import { Content2, ClubName, Content3 } from '../styles';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
  const [isLogin, setIsLogin] = useState(false);
  const myAccessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (myAccessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [myAccessToken]);

  const { id } = useParams();
  const navigate = useNavigate();
  // let userAuth = '';

  const [userAuthNum, setUserAuthNum] = useState(3);
  const [addMenu, setAddMenu] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (addMenu == null) {
      setAddMenu(event.currentTarget);
    } else {
      setAddMenu(null);
    }
  };

  const fcmToken = sessionStorage.getItem('fcmToken');
  // 로그아웃
  const onLogout = () => {
    if (myAccessToken) {
      axios
        .post('/api/spring/crew/logout', { fcmToken: fcmToken })
        .then(function (response) {
          if (window['Android']) {
            window['Android']['setAutoLogin'](false);
          }
          sessionStorage.removeItem('accessToken');
          axios.defaults.headers.common['Authorization'] = '';
          navigate('/');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const onClick = () => {
    navigate('/club');
  };

  const onHome = () => {
    navigate('/');
  };

  const onClickLogin = () => {
    navigate('/login');
  };

  const [open, setOpen] = React.useState(false);
  const [crown, setCrown] = useState('');
  const [clubImage, setClubImage] = useState('');
  const [clubName, setClubName] = useState('');

  useEffect(() => {
    if (id) {
      // 동아리 이름, 이미지 받기
      axios
        .get(`/api/spring/club/${id}`)
        .then(function (response) {
          setClubImage(response.data.data.image);
          setClubName(response.data.data.name);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <Box sx={{ display: 'flex', height: '78px' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        open={open}
        sx={{ backgroundColor: 'white' }}
      >
        <Toolbar>
          {isLogin ? (
            <>
              <Grid
                container
                // alignContent="center"
                paddingLeft={1}
                paddingRight={2}
                paddingTop={1}
              >
                {/* 사진, 동아리명, 왕관*/}
                {id ? (
                  <>
                    <Grid item xs={10} textAlign="left">
                      <Stack direction="row">
                        <ListItemAvatar
                          onClick={onClick}
                          sx={{ pl: '20px', pt: '30px' }}
                        >
                          <img
                            width="30rem"
                            src="/images/randing/home3.png"
                          ></img>
                        </ListItemAvatar>
                        <Stack>
                          {id ? <ClubName>{clubName}</ClubName> : ''}
                        </Stack>
                      </Stack>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={9} textAlign="left">
                      <Stack direction="row">
                        <img
                          onClick={onHome}
                          width="160rem"
                          src="/images/randing/last.png"
                        ></img>
                        <Stack>
                          {id ? <ClubName>{clubName}</ClubName> : ''}
                        </Stack>
                      </Stack>
                    </Grid>
                  </>
                )}

                {/* 알림 버튼 */}

                {id && isLogin ? (
                  <Grid item xs={2}>
                    <Box
                      sx={{
                        my: 2,
                        color: 'black',
                        pt: '15px',
                      }}
                    >
                      <AlarmItem />
                    </Box>
                  </Grid>
                ) : (
                  <Grid item xs={3}>
                    <Box
                      sx={{
                        pt: '15px',
                      }}
                    >
                      <Button
                        onClick={onLogout}
                        sx={{
                          float: 'right',
                        }}
                      >
                        <Content3>로그아웃</Content3>
                      </Button>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                noWrap
                sx={{ flexGrow: 1 }}
                component="div"
              >
                <Logo />
              </Typography>

              <Button
                onClick={onClickLogin}
                sx={{
                  my: 2,
                  color: 'black',
                  float: 'right',
                }}
              >
                <Content2>로그인</Content2>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
