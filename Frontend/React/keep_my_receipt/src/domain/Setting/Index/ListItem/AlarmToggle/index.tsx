import { useState } from 'react';
import { Stack } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { Content } from '../../../../Landing/Landing/Banner/styles';
import axios from 'axios';

export default function AlarmToggle() {
  const [onAlarm, SetOnAlarm] = useState(true);
  const onClick = () => {
    SetOnAlarm(!onAlarm);
    // fcm token 가져오기
    const token = sessionStorage.getItem('fcmToken');
    //
    if (onAlarm == false) {
      axios
        .put('/api/spring/crew/token/push/allow', { fcmToken: token })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put('/api/spring/crew/token/push/disallow', {
          fcmToken: token,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Stack alignItems="center">
      <Stack className="board">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            <NotificationsNoneOutlinedIcon className="icon" />
            <Content>알림 설정</Content>
          </Stack>
          <div className="alarm">
            {onAlarm ? (
              <ToggleOnIcon
                onClick={onClick}
                fontSize="large"
                color="success"
              />
            ) : (
              <ToggleOffIcon onClick={onClick} fontSize="large" />
            )}
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
}
