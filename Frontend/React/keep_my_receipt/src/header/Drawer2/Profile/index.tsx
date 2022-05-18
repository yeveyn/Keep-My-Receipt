import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { id } = useParams();

  const [userName, setUserName] = useState('');
  const [clubImage, setClubImage] = useState('');
  const [clubName, setClubName] = useState('');

  const onGetName = () => {
    axios
      .get(`/api/spring/crew/info`)
      .then(function (response) {
        console.log(response);
        setUserName(response.data.data.name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onGetClub = () => {
    if (id) {
      axios
        .get(`/api/spring/club/${id}`)
        .then(function (response) {
          console.log(response);
          setClubImage(response.data.data.image);
          setClubName(response.data.data.name);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    onGetName();
    onGetClub();
  });

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
            // sx = {{
            //     overflow :'hidden',
            //     text-overflow : 'ellipsis',
            // white-space: 'nowrap';
            // }}
            primary={clubName}
            secondary={`안녕하세요! ${userName}님`}
          />
        </ListItem>
      </List>
    </>
  );
}
