import React from 'react';
import axios from 'axios';
import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
import { ManageAccounts } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface crewInfoType {
  clubCrewId: number;
  name: string;
  email: string;
  auth: string;
}

interface CrewMenuProps {
  crewInfo: crewInfoType;
  getCrewList: any;
}

export default function CrewMenu({ crewInfo, getCrewList }: CrewMenuProps) {
  const navigate = useNavigate();
  const { clubCrewId, name, email, auth } = crewInfo;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeAuth = async (newAuth: any) => {
    await axios
      .put(
        `https://k6d104.p.ssafy.io/api/spring/club/crew/${clubCrewId}/auth/${newAuth}`,
      )
      .then((res) => {
        console.log(res);
        if (newAuth === 'LEADER') {
          // 내 모임으로 이동
          navigate('../../../');
        } else {
          // 관리자 <-> 회원 변경은 새로 조회
          getCrewList();
        }
      });
    setAnchorEl(null);
  };

  return (
    <>
      {auth !== '리더' ? (
        <>
          <IconButton
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <ManageAccounts />
          </IconButton>
          <Menu
            id="long-menu"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                width: '8rem',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                const target = auth === '관리자' ? 'NORMAL' : 'MANAGER';
                changeAuth(target);
              }}
            >
              {auth === '관리자' ? '회원으로' : '관리자로'} 변경
            </MenuItem>
            <MenuItem onClick={() => changeAuth('LEADER')}>리더 위임</MenuItem>
            <MenuItem onClick={handleClose}>추방</MenuItem>
          </Menu>
        </>
      ) : null}
    </>
  );
}