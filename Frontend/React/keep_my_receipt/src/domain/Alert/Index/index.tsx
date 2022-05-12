import { Container } from '@mui/material';
import List from './List';
import Navigation from '../../../header';
export default function AlertIndex() {
  return (
    <Container maxWidth="md">
      <Navigation />
      <List></List>
    </Container>
  );
}
