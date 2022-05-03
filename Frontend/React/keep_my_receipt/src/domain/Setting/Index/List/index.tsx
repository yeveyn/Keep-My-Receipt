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
import { useState, useCallback } from 'react';
import Modal from '../Modal';

export default function SettingList() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [Logout, setLogout] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    console.log('얍');
  }, [isOpenModal]);

  const [onAlarm, SetOnAlarm] = useState<boolean>(true);

  return (
    <Container maxWidth="md">
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          이곳에 children이 들어갑니다.
        </Modal>
      )}
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
            <button className="alarm">
              {onAlarm ? (
                <ToggleOnIcon fontSize="large" color="success" />
              ) : (
                <ToggleOffIcon fontSize="large" />
              )}
            </button>
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
            <button className="toggle">
              <ArrowForwardIosIcon
                color="disabled"
                onClick={onClickToggleModal}
              />
            </button>
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
