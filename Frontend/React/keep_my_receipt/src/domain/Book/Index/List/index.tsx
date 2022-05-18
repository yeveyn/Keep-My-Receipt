import { Box, Divider, Stack, Typography, Container } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toCurrency from '../../../../services/toCurrency';
import ListItem from '../ListItem';

export default function BookList({ list }: { list: any }) {
  const navigate = useNavigate();
  const onClick = (item: any) => {
    navigate(`./detail`, {
      state: {
        transactionId: item.transactionId,
        transactionDetailId: item.transactionDetailId,
      },
    });
    console.log('transactionId: ' + item.transactionId);
    console.log('transactionDetailId: ' + item.transactionDetailId);
  };
  return (
    <>
      {list.map((item: any) => (
        <Box
          key={item.transactionDetailId}
          marginY={1}
          paddingX="1rem"
          onClick={() => onClick(item)}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={1}
            paddingX={0.5}
            sx={{
              '&:hover': { backgroundColor: '#f5f5f5', cursor: 'pointer' },
            }}
          >
            <Stack spacing={0.5} paddingTop={0.5}>
              <Typography variant="body2">{item.date}</Typography>
              <Typography>{item.name}</Typography>
            </Stack>
            <Typography>{toCurrency(item.price)}</Typography>
          </Stack>
          <Divider />
        </Box>
      ))}
    </>
  );
}
