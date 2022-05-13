import React from 'react';
import {
  IconButton,
  TextField,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import useInput from '../../../../hooks/useInput';

interface ItemInfoOnEditType {
  titleName: string;
  itemValue: string | number;
  setItemValue: (value: string | number) => void;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ItemInfoOnEdit({
  titleName,
  itemValue,
  setItemValue,
  setEditable,
}: ItemInfoOnEditType) {
  const { changedValue, handleChange } = useInput(itemValue);

  const confirmEditItem = () => {
    setItemValue(changedValue);
    setEditable(false);
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
                {titleName}
              </Typography>

              <TextField
                value={changedValue}
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
