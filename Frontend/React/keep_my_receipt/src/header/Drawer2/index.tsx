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
    navigate(`/club/${id}/receipt/camera`);
    setMobileOpen(!mobileOpen);
    console.log('영수증 등록 클릭');
  };

  const bookCreate = () => {
    navigate(`/club/${id}/book/create`);
  };
  const receiptList = () => {
    navigate(`/club/${id}/receipt/requestList`);
  };

  const bookList = () => {
    navigate(`/club/${id}/book`);
  };

  const chart = () => {
    navigate(`/club/${id}/book`);
  };

  const manage = () => {
    navigate(`/club/${id}/manage`);
  };

  const myClub = () => {
    navigate(`/club`);
  };

  const myMain = () => {
    navigate(`/`);
  };

  const onClickLogin = () => {
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
                  <Button sx={{ pt: '20px' }}>
                    <img src="/images/randing/jw3.png" width="50px"></img>
                  </Button>
                </Grid>
                <Grid item xs={1.6}>
                  <Box
                    sx={{
                      my: 2,
                      color: 'black',
                    }}
                  >
                    <AlarmItem />
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Box
                    sx={{
                      my: 2,
                      color: 'black',
                    }}
                  >
                    <SettingItem />
                  </Box>
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
    </Box>
  );
}
