import { Container, Modal } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import List from './List';
import BackBar from '../../BackHeader';

export default function SettingIndex() {
  return (
    <Container maxWidth="md">
      <BackBar content={'설정'} />
      <List></List>
    </Container>
  );
}
