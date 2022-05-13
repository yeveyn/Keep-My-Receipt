import { Container, Grid } from '@mui/material';
import List from './List';
import Navigation from '../../../header';
export default function AlertIndex() {
  return (
    <Container maxWidth="md">
      <Grid style={{ width: '100%' }}>
        <Navigation />
        <List />
      </Grid>
    </Container>
  );
}
