import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();
  const onClickButton = (url: string) => {
    navigate(url);
  };

  return (
    <>
      <Button
        sx={{ marginLeft: '20vm' }}
        onClick={() => {
          onClickButton('/');
        }}
      >
        <img width="200vm" src="/images/randing/logo8.png"></img>
      </Button>
    </>
  );
}
