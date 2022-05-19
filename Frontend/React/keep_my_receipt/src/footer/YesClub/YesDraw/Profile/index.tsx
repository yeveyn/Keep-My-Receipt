import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export default function Profile(props: any) {
  const { id } = useParams();
  const [userName, setUserName] = useState('');
  const [clubImage, setClubImage] = useState('');
  const [clubName, setClubName] = useState('');
  const [userAuth, setUserAuth] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    if (isLogin) {
      axios
        .get(`/api/spring/crew/info`)
        .then(function (response) {
          setUserName(response.data.data.name);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (id) {
      axios
        .get(`/api/spring/club/${id}`)
        .then(function (response) {
          setClubImage(response.data.data.image);
          setClubName(response.data.data.name);
        })
        .catch(function (error) {
          console.log(error);
        });

      axios
        .get(`api/spring/club/${id}/crew/auth`)
        .then((res) => {
          if (res.data) {
            setUserAuth(res.data.data);
          }
        })
        .catch((e) => {
          console.log(e);
          return;
        });
    }
  }, [accessToken, id, isLogin]);

  return (
    <>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'orange',
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar src={clubImage} />
          </ListItemAvatar>
          <ListItemText
            primary={clubName}
            secondary={
              <Typography
                sx={{ fontSize: '13px', wordBreak: 'keep-all' }}
              >{`안녕하세요!
              ${userAuth} ${userName}님`}</Typography>
            }
          />
        </ListItem>
      </List>
    </>
  );
}
