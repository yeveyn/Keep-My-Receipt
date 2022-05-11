import { Card, Grid, CardContent, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface ItemType {
  requestId: number;
  name: string;
  price: number;
  state: string;
  manageable: boolean;
}

export default function ItemIndex({
  requestId,
  name,
  price,
  state,
  manageable,
}: ItemType) {
  const navigate = useNavigate();
  const clubId = useParams();
  function connect() {
    if (manageable === false) {
      return;
    } else if (state === '신청') {
      axios
        .get(`https://k6d104.p.ssafy.io/api/spring/club/request/${requestId}`)
        .then((response) => {
          const data = response.data.data;
          navigate(`/club/${clubId}/receipt/approve`, {
            state: {
              requestId: data.requestId,
              date: data.payDate,
              value: data.price,
              receiptUrl: data.receiptUrl,
            },
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
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
          xs={3}
          sm={3}
          md={3}
          container
          justifyContent="center"
          alignItems="center"
        >
          <CardContent>
            <Typography>{name}</Typography>
          </CardContent>
        </Grid>
        <Grid
          xs={6}
          sm={6}
          md={6}
          container
          justifyContent="center"
          alignItems="center"
        >
          <CardContent>
            <Typography>
              {price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                .concat('원')}
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          xs={3}
          sm={3}
          md={3}
          container
          justifyContent="center"
          alignItems="center"
        >
          <CardContent>
            <Typography>{state}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}
