import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Logo from '../Logo';
import PaidIcon from '@mui/icons-material/Paid';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListSubheader from '@mui/material/ListSubheader';
import { useEffect, useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Grid } from '@mui/material';
import AlarmItem from '../AlarmItem';
import { Content2 } from '../styles';
import SettingItem from '../SettingItem';
import Profile from './Profile';

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

  const [addOpen, setAddOpen] = React.useState(false);
  const [listOpen, setListOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const addHandleClick = () => {
    setAddOpen(!addOpen);
  };

  const listHandleClick = () => {
    setListOpen(!listOpen);
  };

  const receipt = () => {
    setOpen(false);
    navigate(`/club/${id}/receipt/camera`);
    setMobileOpen(!mobileOpen);
    console.log('영수증 등록 클릭');
  };

  const bookCreate = () => {
    setOpen(false);
    navigate(`/club/${id}/book/create`);
  };
  const receiptList = () => {
    setOpen(false);
    navigate(`/club/${id}/receipt/requestList`);
  };

  const bookList = () => {
    setOpen(false);
    navigate(`/club/${id}/book`);
  };

  const chart = () => {
    setOpen(false);
    navigate(`/club/${id}/book`);
  };

  const manage = () => {
    setOpen(false);
    navigate(`/club/${id}/manage`);
  };

  const myClub = () => {
    setOpen(false);
    navigate(`/club`);
  };

  const myMain = () => {
    setOpen(false);
    navigate(`/`);
  };

  const onClickLogin = () => {
    setOpen(false);
    navigate('/login');
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (id) {
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
              <Grid container>
                <Grid item xs={8}>
                  <Button
                    sx={{ ...(open && { display: 'none' }), pt: '20px' }}
                    onClick={handleDrawerOpen}
                  >
                    {' '}
                    <img src="/images/randing/jw3.png" width="50px"></img>
                  </Button>
                </Grid>
                <Grid item xs={1.6}>
                  <Button
                    sx={{
                      my: 2,
                      color: 'black',
                    }}
                  >
                    <AlarmItem />
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    sx={{
                      my: 2,
                      color: 'black',
                    }}
                  >
                    <SettingItem />
                  </Button>
                </Grid>
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

      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Profile />
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
            ></ListSubheader>
          }
        >
          {id ? (
            <>
              <ListItemButton onClick={addHandleClick}>
                <ListItemText primary="등록" />
                {addOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={addOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton onClick={receipt} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PlaylistAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="영수증 등록" />
                  </ListItemButton>

                  {userAuthNum <= 2 ? (
                    <>
                      {' '}
                      <ListItemButton onClick={bookCreate} sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <PaidIcon />
                        </ListItemIcon>
                        <ListItemText primary="거래 등록" />
                      </ListItemButton>
                    </>
                  ) : (
                    ''
                  )}
                </List>
              </Collapse>
              {/* <Divider /> */}
              <ListItemButton onClick={listHandleClick}>
                <ListItemText primary="내역" />
                {listOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={listOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton onClick={receiptList} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="영수증 내역" />
                  </ListItemButton>

                  {userAuthNum <= 2 ? (
                    <>
                      {' '}
                      <ListItemButton onClick={bookList} sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="거래 내역" />
                      </ListItemButton>
                    </>
                  ) : (
                    ''
                  )}
                </List>
              </Collapse>
              <ListItemButton onClick={chart}>
                <ListItemText primary="분석" />
              </ListItemButton>
              {userAuthNum <= 2 ? (
                <>
                  <ListItemButton onClick={manage}>
                    <ListItemText primary="모임관리" />
                  </ListItemButton>
                </>
              ) : (
                ''
              )}
            </>
          ) : (
            ''
          )}

          <ListItemButton onClick={myClub}>
            <ListItemText primary="내 모임" />
          </ListItemButton>

          <ListItemButton onClick={myMain}>
            <ListItemText primary="메인화면" />
          </ListItemButton>
          {/* <Divider /> */}
        </List>
        {/* <Divider /> */}
      </Drawer>
    </Box>
  );
}
