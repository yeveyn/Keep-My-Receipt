import React from 'react';
import { CardActions, CardContent, Button, Card, Stack } from '@mui/material';

interface ClubInfoType {
  id: number;
  name: string;
  description: string;
  imgUrl: string;
}

export default function ClubListItem({ ClubInfo }: { ClubInfo: ClubInfoType }) {
  const { id, name, description, imgUrl } = ClubInfo;
  return (
    <Card
      variant="outlined"
      sx={{
        width: '18rem',
        boxShadow: 1,
        ':hover': {
          boxShadow: 6,
          // backgroundColor: '#FFF5E1',
        },
      }}
    >
      <CardContent>
        <Stack direction="row">
          imgUrl ? (<img src={imgUrl} width="3rem" />) : 기본 이미지
          <Stack direction="column">
            <p>{id}</p>
            <p>{name}</p>
            <p>{description}</p>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
