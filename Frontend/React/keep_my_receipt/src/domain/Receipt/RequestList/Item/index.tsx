import { Card, Grid, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ItemType {
  id: number;
  name: string;
  date: string;
  money: string;
}

export default function ItemIndex({ id, name, date, money }: ItemType) {
  const navigate = useNavigate();
  function connect() {
    const url = '';
    navigate(url);
  }
  return (
    <Card
      variant="outlined"
      style={{ padding: 15, width: '100%' }}
      onClick={connect}
      sx={{
        boxShadow: 1,
        ':hover': {
          boxShadow: 6,
          backgroundColor: '#FFF5E1',
        },
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ width: '100%' }}
      >
        <Grid
          xs={4}
          sm={4}
          md={4}
          container
          justifyContent="center"
          alignItems="center"
        >
          <CardContent>
            <Typography>{date}</Typography>
          </CardContent>
        </Grid>
        <Grid
          xs={3}
          sm={4}
          md={4}
          container
          justifyContent="center"
          alignItems="center"
        >
          <CardContent>
            <Typography>{name}</Typography>
          </CardContent>
        </Grid>
        <Grid
          xs={5}
          sm={4}
          md={4}
          container
          justifyContent="center"
          alignItems="center"
        >
          <CardContent>
            <Typography>
              {money
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                .concat('원')}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
