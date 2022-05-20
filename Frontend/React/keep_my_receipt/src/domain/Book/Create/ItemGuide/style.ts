import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const OrangeText = styled(Typography)<TypographyProps>(() => ({
  display: 'inline',
  color: 'orange',
}));

export const RedText = styled(Typography)<TypographyProps>(() => ({
  display: 'inline',
  color: 'red',
}));

export const BlueText = styled(Typography)<TypographyProps>(() => ({
  display: 'inline',
  color: 'blue',
}));

export const GreenText = styled(Typography)<TypographyProps>(() => ({
  display: 'inline',
  color: 'green',
}));
