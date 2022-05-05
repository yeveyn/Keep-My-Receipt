import React, { useState } from 'react';
import {
  IconButton,
  TextField,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

import { ItemInfoType } from '../Item';

interface ItemInfoOnEditType {
  itemInfo: ItemInfoType;
  setItemInfo: React.Dispatch<React.SetStateAction<ItemInfoType>>;
}

export default function ItemInfoOnEdit({
  itemInfo,
  setItemInfo,
}: ItemInfoOnEditType) {
  const [displayingName, setDisplayingName] = useState(itemInfo.name);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setDisplayingName(event.target.value);
  };

  const confirmEditItem = () => {
    setItemInfo((info) => ({ ...info, name: displayingName, onEdit: false }));
  };

  return (
    <>
      <ListItem>
        <ListItemText
          sx={{ marginLeft: 5 }}
          primary={
            <Stack direction="row" alignItems="center">
              {/* 분류명 */}
              <Typography display="inline" width="5rem">
                내용
              </Typography>

              <TextField
                value={displayingName}
                onChange={handleChange}
                onKeyDown={(e) => {
                  // Enter 누르면 저장
                  if (e.key === 'Enter') {
                    confirmEditItem();
                  }
                }}
                autoFocus // 첫 렌더링 시 자동 포커싱
              />
              <IconButton onClick={() => confirmEditItem()}>
                <CheckCircleOutline />
              </IconButton>
            </Stack>
          }
        />
      </ListItem>
    </>
  );
}
