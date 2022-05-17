import { Container, Grid } from '@mui/material';
import List from './List';
export default function AlertIndex() {
  return (
    <Container maxWidth="md">
      <Grid style={{ width: '100%' }}>
        <List />
      </Grid>
    </Container>
  );
}
