import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { yellow } from '@mui/material/colors';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const pages = [
  ['/login', '로그인'],
  [`/club/${1}/book`, '장부내역'],
  ['/club', '분석차트'],
  ['/book', '거래등록'],
  [`/club/${1}/manage`, '모임관리'],
  ['/', '보고서'],
];
const alarms = ['알림', '알림2', '알림3'];
const settings = ['프로필', '계정[탈퇴]', '로그아웃'];

const ResponsiveAppBar = () => {
  // 토큰이 있다면, session storage에서 꺼내 쓰기

  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    axios.defaults.headers.common['Authorization'] = accessToken;
    console.log(axios.defaults.headers.common['Authorization']);
  }
  const navigate = useNavigate();

  const onClickButton = (page: any) => {
    navigate(page[0]);
  };
  // 설정 버튼
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // 알림 버튼
  const [anchorElUser2, setAnchorElUser2] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenUserMenu2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser2(event.currentTarget);
  };

  const handleCloseUserMenu2 = () => {
    setAnchorElUser2(null);
  };

  return (
    <header>
      <AppBar
        sx={{
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          position: 'fixed',
        }}
        style={{ background: '#ffa500' }}
      >
        <Toolbar
          sx={{
            direction: 'row',
            float: 'right',
          }}
        >
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              p: 'auto',
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 300,
              float: 'right',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Keep Your Receipt
          </Typography>

          {/* 웹용 메뉴 리스트 */}
          <Box
            sx={{
              bordr: 1,
              float: 'right',
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map((page) => (
              <Button
                onClick={() => {
                  onClickButton(page);
                }}
                // href={page[0]}
                key={page[1]}
                sx={{
                  my: 2,
                  mr: 1,
                  color: 'white',
                  display: 'block',
                  float: 'right',
                }}
              >
                {page[1]}
              </Button>
            ))}
          </Box>

          <Stack
            direction="row"
            sx={{
              direction: 'row',
              marginLeft: 'auto',
              marginRight: 0,
            }}
          >
            {/* 웹, 모바일 - 알림 */}
            <Box>
              <IconButton
                onClick={handleOpenUserMenu2}
                sx={{ p: 0, marginLeft: 10 }}
              >
                <NotificationsIcon
                  sx={{
                    color: yellow[50],
                  }}
                />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                // keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser2)}
                onClose={handleCloseUserMenu2}
              >
                {alarms.map((alarm) => (
                  <MenuItem key={alarm} onClick={handleCloseUserMenu2}>
                    <Typography textAlign="center">{alarm}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* 웹,모바일 - 설정 */}
            <Box>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, marginLeft: 2 }}
              >
                <SettingsIcon
                  sx={{
                    color: yellow[50],
                  }}
                />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                // keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Toolbar>
        {/* </Container> */}
      </AppBar>
    </header>
  );
};
export default ResponsiveAppBar;
