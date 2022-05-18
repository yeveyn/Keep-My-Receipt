import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PaidIcon from '@mui/icons-material/Paid';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import YesClub from './YesClub';
import NoClub from './NoClub';

export default function SimpleBottomNavigation() {
  const [isLogin, setIsLogin] = useState(false);
  const myAccessToken = sessionStorage.getItem('accessToken');
  const { id } = useParams();
  useEffect(() => {
    if (myAccessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [myAccessToken]);

  const Box = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.up(420)]: {
      display: 'none',
      height: '56px',
      padding: '10px',
    },
  }));

  return (
    <>
      {isLogin ? (
        <>
          <Box
            sx={{
              borderTop: '1px solid gray',
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 0,
              height: '56px',
              marginTop: '30px',
            }}
          >
            {id ? (
              <>
                <YesClub />
              </>
            ) : (
              <>
                <NoClub />
              </>
            )}
          </Box>
        </>
      ) : (
        ''
      )}
    </>
  );
}
