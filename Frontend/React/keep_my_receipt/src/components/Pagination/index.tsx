import React from 'react';
import { Stack, IconButton, Box, Typography } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

interface pageInfoType {
  pageNumber: number;
  size: number;
  totalPages: number;
  numberOfElements: number;
  totalElements: number;
}
export default function Pagination({ pageInfo }: { pageInfo: pageInfoType }) {
  const { pageNumber, size, totalPages, numberOfElements, totalElements } =
    pageInfo;
  return (
    <Stack>
      Pagination
      <p>pageNumber: {pageNumber}</p>
      <p>size: {size}</p>
      <p>totalPages: {totalPages}</p>
      <p>numberOfElements: {numberOfElements}</p>
      <p>totalElements: {totalElements}</p>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <IconButton color="inherit">
          <ArrowBackIosNew sx={{ fontSize: '1.5rem' }} />
        </IconButton>

        <IconButton
          color="primary"
          sx={{
            fontStyle: 'bold',
            backgroundColor: '#42a5f5',
            width: '2.2rem',
            height: '2.2rem',
          }}
        >
          <Box sx={{ width: '1.8rem' }}>
            <Typography fontSize="1.3rem" color="white">
              10
            </Typography>
          </Box>
        </IconButton>
        <IconButton
          color="primary"
          sx={{ fontStyle: 'bold', width: '2.2rem', height: '2.2rem' }}
        >
          <Box sx={{ width: '1.8rem' }}>
            <Typography fontSize="1.3rem">10</Typography>
          </Box>
        </IconButton>
        <IconButton
          color="primary"
          sx={{
            fontStyle: 'bold',
            backgroundColor: '#42a5f5',
            width: '2.2rem',
            height: '2.2rem',
          }}
        >
          <Box
            sx={{
              width: '1.8rem',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <Typography fontSize="1.3rem" justifyContent="center">
              1
            </Typography>
          </Box>
        </IconButton>
        <IconButton
          color="inherit"
          sx={{ fontStyle: 'bold', width: '2.2rem', height: '2.2rem' }}
        >
          <Box sx={{ width: '1.8rem' }}>
            <Typography fontSize="1.3rem">2</Typography>
          </Box>
        </IconButton>
        <IconButton
          color="inherit"
          sx={{ fontStyle: 'bold', width: '2.2rem', height: '2.2rem' }}
        >
          <Box sx={{ width: '1.8rem' }}>
            <Typography fontSize="1.3rem">5</Typography>
          </Box>
        </IconButton>
        <IconButton color="inherit">
          <ArrowForwardIos sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </Stack>
    </Stack>
  );
}
