import { useState } from 'react';
import { Container, Stack } from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ErrorIcon from '@mui/icons-material/Error';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import './index.css';

export default function SettingList() {
  const [onAlarm, SetOnAlarm] = useState(true);

  return (
    <Container maxWidth="md">
      <Stack alignItems="center">
        <Stack className="board">
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <CampaignIcon className="icon" />
              <div className="text">공지사항</div>
            </Stack>
            <div className="toggle">
              {onAlarm ? (
                <ArrowForwardIosIcon color="disabled" />
              ) : (
                <ToggleOffIcon fontSize="large" />
              )}
            </div>
          </Stack>
        </Stack>
      </Stack>

      <Stack alignItems="center">
        <Stack className="board">
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <NotificationsActiveIcon className="icon" />
              <div className="text">알림 설정</div>
            </Stack>
            <div className="alarm">
              {onAlarm ? (
                <ToggleOnIcon fontSize="large" color="success" />
              ) : (
                <ToggleOffIcon fontSize="large" />
              )}
            </div>
          </Stack>
        </Stack>
      </Stack>

      <Stack alignItems="center">
        <Stack className="board">
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <NoMeetingRoomIcon className="icon" />
              <div className="text">로그아웃</div>
            </Stack>
            <div className="toggle">
              {onAlarm ? (
                <ArrowForwardIosIcon color="disabled" />
              ) : (
                <ToggleOffIcon fontSize="large" />
              )}
            </div>
          </Stack>
        </Stack>
      </Stack>

      <Stack alignItems="center">
        <Stack className="board">
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <ErrorIcon className="icon" />
              <div className="text">모임 탈퇴</div>
            </Stack>
            <div className="toggle">
              {onAlarm ? (
                <ArrowForwardIosIcon color="disabled" />
              ) : (
                <ToggleOffIcon fontSize="large" />
              )}
            </div>
          </Stack>
        </Stack>
      </Stack>

      <Stack alignItems="center">
        <Stack className="board">
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              <ErrorOutlineIcon className="icon" />
              <div className="text">회원 탈퇴</div>
            </Stack>
            <div className="toggle">
              {onAlarm ? (
                <ArrowForwardIosIcon color="disabled" />
              ) : (
                <ToggleOffIcon fontSize="large" />
              )}
            </div>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
