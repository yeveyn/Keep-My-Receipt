import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PaidIcon from '@mui/icons-material/Paid';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Profile from './Profile';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

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

export default function () {
  useEffect(() => {
    if (myAccessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

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

  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [state, setState] = React.useState({
    left: false,
  });
  type Anchor = 'top' | 'left' | 'bottom' | 'right';
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

  const [isLogin, setIsLogin] = useState(false);
  const myAccessToken = sessionStorage.getItem('accessToken');

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
    if (myAccessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

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
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Profile />
      <Divider />
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
        <>
          <ListItemButton
            onClick={() => {
              onClickButton(`/club/${id}/receipt/camera`);
            }}
            sx={{ pl: 4 }}
          >
            <ListItemText primary="영수증 등록" />
          </ListItemButton>

          {userAuthNum <= 2 ? (
            <>
              {' '}
              <ListItemButton
                onClick={() => {
                  onClickButton(`/club/${id}/book/create`);
                }}
                sx={{ pl: 4 }}
              >
                <ListItemText primary="거래 등록" />
              </ListItemButton>
            </>
          ) : (
            ''
          )}

          <Divider />
          <ListItemButton
            onClick={() => {
              onClickButton(`/club/${id}/receipt/requestList`);
            }}
            sx={{ pl: 4 }}
          >
            <ListItemText primary="영수증 내역" />
          </ListItemButton>

          {userAuthNum <= 2 ? (
            <>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  onClickButton(`/club/${id}/book`);
                }}
              >
                <ListItemText primary="거래 내역" />
              </ListItemButton>
            </>
          ) : (
            ''
          )}

          <Divider />
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              onClickButton(`/club/${id}/analytics/mainChart`);
            }}
          >
            <ListItemText primary="차트" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              onClickButton(`/club/${id}/report/asset`);
            }}
            sx={{ pl: 4 }}
          >
            <ListItemText primary="보고서" />
          </ListItemButton>

          <Divider />
          {userAuthNum <= 2 ? (
            <>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => {
                  onClickButton(`/club/${id}/manage`);
                }}
              >
                <ListItemText primary="모임관리" />
              </ListItemButton>
            </>
          ) : (
            ''
          )}
        </>
        <Divider />
        <ListItemButton
          sx={{ pl: 4 }}
          onClick={() => {
            onClickButton(`/setting`);
          }}
        >
          <ListItemText primary="설정" />
        </ListItemButton>

        <ListItemButton
          sx={{ pl: 4 }}
          onClick={() => {
            onClickButton(`/`);
          }}
        >
          <ListItemText primary="홈" />
        </ListItemButton>
      </List>
    </>
  );
}
