import React from 'react';
import { ListItem, ListItemButton, ListItemText, Stack } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

import { EditableItemType } from '..';

interface ItemAdderType {
  itemList: EditableItemType[];
  setItemList: React.Dispatch<React.SetStateAction<EditableItemType[]>>;
}

export default function ItemAdder({ itemList, setItemList }: ItemAdderType) {
  const addItem = () => {
    // 마지막에 추가한 아이템이 아직 수정 중인 경우 종료
    if (itemList[itemList.length - 1].editable === true) {
      return;
    }
    setItemList((list) => list.concat({ name: '', editable: true }));
  };

  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => addItem()} sx={{ paddingLeft: 4 }}>
          <ListItemText
            primary={
              <Stack direction="row" alignItems="center" spacing={1}>
                <span>태그 추가</span>
                <AddCircleOutline />
              </Stack>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
}
