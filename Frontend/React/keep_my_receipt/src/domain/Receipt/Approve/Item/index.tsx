import React from 'react';
import { Stack, Card, Button, TextField } from '@mui/material';

interface ItemType {
  content: string;
  money: number;
}

export default function ListItem({ items }: { items: ItemType[] }) {
  return (
    <Stack
      direction="column"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      style={{ width: '100%' }}
    >
      {items.map((item) => (
        <Card variant="outlined" style={{ padding: 15, width: '100%' }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              label="내용"
              style={{ margin: 10 }}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={item.content}
            />
            <TextField
              label="금액"
              style={{ margin: 10 }}
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={item.money}
            />
            <Button>(-)</Button>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
