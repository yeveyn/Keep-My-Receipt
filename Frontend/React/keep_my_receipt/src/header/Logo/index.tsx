import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

export default function Logo() {
  const navigate = useNavigate();
  const onClickButton = (url: string) => {
    navigate(url);
  };
  const matches = useMediaQuery('(min-width:500px)');

  return (
    <Button
      style={matches ? { marginLeft: '1rem' } : { marginTop: 4 }}
      onClick={() => {
        onClickButton('/');
      }}
    >
      <img
        style={matches ? { width: '12rem' } : { width: '10rem' }}
        src="/images/randing/last.png"
      ></img>
    </Button>
  );
}
