import { styled } from '@mui/material/styles';
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
