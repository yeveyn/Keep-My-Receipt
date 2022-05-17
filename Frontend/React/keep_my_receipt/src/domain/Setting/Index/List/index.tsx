import { Container } from '@mui/material';
import './index.css';
import AlarmToggle from '../ListItem/AlarmToggle';
import EditUserInfo from '../ListItem/EditUserInfo';
import LeaveApp from '../ListItem/LeaveApp';
import Logout from '../ListItem/Logout';
import Notice from '../ListItem/Notice';
import { useParams } from 'react-router-dom';

export default function SettingList() {
  return (
    <Container maxWidth="md" sx={{ marginTop: '70px' }}>
      <Notice />
      <AlarmToggle />
      <EditUserInfo />
      <LeaveApp />
      <Logout />
    </Container>
  );
}
