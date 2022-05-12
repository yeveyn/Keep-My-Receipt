import { Container, Modal } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import List from './List';
import Navigation from '../../../header';

export default function SettingIndex() {
  return (
    <Container maxWidth="md">
      <Navigation />
      <List></List>
    </Container>
  );
}
