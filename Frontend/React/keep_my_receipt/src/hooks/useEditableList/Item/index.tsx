import React from 'react';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

import { EditableItemType } from '..';

interface ItemType {
  item: EditableItemType;
  setItemList: React.Dispatch<React.SetStateAction<EditableItemType[]>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

export default function Item({ item, setItemList, setSelectedItem }: ItemType) {
  const editItem = (target: EditableItemType): void => {
    setItemList((list) =>
      list.map((item) => {
        if (item.name === target.name) {
          item.editable = true;
        }
        return item;
      }),
    );
  };

  const deleteItem = (target: string): void => {
    setItemList((list) => list.filter((item) => item.name !== target));
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <IconButton onClick={() => editItem(item)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => deleteItem(item.name)} edge="end">
              <Delete />
            </IconButton>
          </>
        }
        key={item.name}
      >
        <ListItemButton
          onClick={() => {
            // 클릭 시 값 바꿈
            setSelectedItem(item.name);
          }}
          sx={{ paddingLeft: 4 }}
        >
          <ListItemText primary={item.name} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
