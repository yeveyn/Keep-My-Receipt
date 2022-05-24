import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';

export default function YesFooter() {
  const [isLogin, setIsLogin] = useState(false);
  const myAccessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (myAccessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const navigate = useNavigate();
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

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const onClickButton = (url: string) => {
    navigate(url);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return <> </>;
}
