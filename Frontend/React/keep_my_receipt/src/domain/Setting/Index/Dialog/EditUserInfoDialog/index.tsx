import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface DialogType {
  open: boolean;
  setOpen: any;
}

export default function EditUserInfoDialog({ open, setOpen }: DialogType) {
  //취소 버튼
  const handleClose = () => {
    setOpen(false);
  };

  const [userName, setUserName] = useState('');

  const onGetName = () => {
    axios
      .get(`/api/spring/crew/info`)
      .then(function (response) {
        setUserName(response.data.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    onGetName();
    console.log(userName);
  });

  //확인 버튼
  const changeName = (e: any) => {
    setUserName(e.target.value);
  };

  const onChangeName = () => {
    axios
      .put(`api/spring/crew/info/?name=${userName}`, {
        name: userName,
      })
      .then(function (response) {
        console.log(response);
        console.log('유저 이름 수정 클릭');
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(userName);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="join-dialog-title"
      aria-describedby="join-dialog-description"
    >
      <DialogContent>
        {/* <DialogContentText>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 'bold',
              letterSpacing: '-2px',
              margin: 2,
              fontFamily: 'NanumGothicBold',
            }}
          >
            수정하기
          </Typography>
        </DialogContentText> */}
        <DialogContentText
          id="join-dialog-description"
          sx={{ paddingTop: '40px' }}
        >
          <TextField
            onChange={changeName}
            type="text"
            id="nickname"
            name="nickname"
            fullWidth
            label="이름"
            value={userName}
            autoComplete="current-password"
            variant="outlined"
            size="small"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button
          sx={{
            '&.MuiButton-text': { color: '#ff0000' },
          }}
          onClick={onChangeName}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
