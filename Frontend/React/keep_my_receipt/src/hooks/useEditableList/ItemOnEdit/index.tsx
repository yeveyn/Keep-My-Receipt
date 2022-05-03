import React, { useState } from 'react';
import { IconButton, InputBase, ListItem } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

import { EditableItemType } from '..';

interface ItemOnEditType {
  item: EditableItemType;
  setItemList: React.Dispatch<React.SetStateAction<EditableItemType[]>>;
}

export default function ItemOnEdit({ item, setItemList }: ItemOnEditType) {
  const [changedName, setChangedName] = useState(item.name);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setChangedName(event.target.value);
  };

  const confirmEditItem = (target: EditableItemType): void => {
    setItemList((list) =>
      list.map((item) => {
        if (item.name === target.name) {
          item.name = changedName;
          item.editable = false;
        }
        return item;
      }),
    );
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton onClick={() => confirmEditItem(item)}>
            <CheckCircleOutline />
          </IconButton>
        }
      >
        <InputBase
          value={changedName}
          onChange={handleChange}
          onKeyDown={(e) => {
            // Enter 누르면 저장
            if (e.key === 'Enter') {
              confirmEditItem(item);
            }
          }}
          autoFocus // 첫 렌더링 시 자동 포커싱
          sx={{ paddingLeft: 4 }}
        />
      </ListItem>
    </>
  );
}
