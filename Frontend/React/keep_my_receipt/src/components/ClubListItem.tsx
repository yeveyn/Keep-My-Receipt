import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CardActionArea,
  CardContent,
  Card,
  Stack,
  Avatar,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import { Done, AccessTime, Delete } from '@mui/icons-material';

interface ClubInfoType {
  id: number;
  name: string;
  description: string;
  image: string;
}

export default function ClubListItem({
  clubInfo,
  onClick,
  checkJoin,
  leave,
  onClickToLeave,
}: {
  clubInfo: ClubInfoType;
  onClick?: any;
  checkJoin?: boolean;
  leave?: boolean;
  onClickToLeave?: any;
}) {
  const { id, name, description, image } = clubInfo;
  // 가입 여부 확인하여 표시
  const [joined, setJoined] = useState<boolean>(false);
  const [wait, setWait] = useState<boolean>(false);
  const checkJoined = async () => {
    await axios
      .get(`https://k6d104.p.ssafy.io/api/spring/club/${id}/crew/auth`)
      .then((res) => {
        if (
          res.data.data === '리더' ||
          res.data.data === '관리자' ||
          res.data.data === '회원'
        ) {
          setJoined(true);
          setWait(false);
        } else if (res.data.data === '대기') {
          setWait(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // checkJoin ? checkJoined() : null;
  useEffect(() => {
    if (checkJoin) {
      checkJoined();
    }
  });
  return (
    <Grid
      item
      xs={12}
      container
      justifyContent="center"
      sx={{ margin: '0.5rem', position: 'relative' }}
    >
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          boxShadow: 1,
          ':hover': {
            boxShadow: 6,
            // backgroundColor: '#FFF5E1',
          },
        }}
      >
        <CardActionArea onClick={onClick}>
          <CardContent sx={{ padding: '0.8rem' }}>
            <Stack
              direction="row"
              spacing={3}
              alignItems="center"
              justifyContent="flex-start"
            >
              <Avatar
                // variant="rounded"
                sx={{
                  width: '4rem',
                  height: '4rem',
                }}
                src={image ? image : ''}
              >
                {!image ? name[0] : null}
              </Avatar>

              <Stack direction="column" spacing={1}>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2">{description}</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
      {leave ? (
        <IconButton
          onClick={onClickToLeave}
          sx={{
            position: 'absolute',
            right: '0.1rem',
            bottom: '0.1rem',
            fontSize: '1.5rem',
            color: '#c5c7d4',
            opacity: 0.5,
            padding: 0.5,
            '&:hover': {
              color: 'black',
            },
          }}
        >
          <Delete sx={{ fontSize: '2rem' }} />
        </IconButton>
      ) : null}
      {joined ? (
        <Done
          sx={{
            position: 'absolute',
            right: '0.2rem',
            top: '0.2rem',
            fontSize: '2rem',
            color: '#898da3',
          }}
        />
      ) : null}
      {wait ? (
        <AccessTime
          sx={{
            position: 'absolute',
            right: '0.2rem',
            top: '0.2rem',
            fontSize: '2rem',
            color: '#898da3',
          }}
        />
      ) : null}
    </Grid>
  );
}
