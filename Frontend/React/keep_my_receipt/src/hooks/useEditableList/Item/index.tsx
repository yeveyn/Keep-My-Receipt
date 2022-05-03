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
  collapsible: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Item({
  item,
  setItemList,
  setSelectedItem,
  collapsible,
  setOpen,
}: ItemType) {
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
            if (collapsible) {
              setOpen((open) => !open);
            }
          }}
          sx={{ paddingLeft: 4 }}
        >
          <ListItemText primary={item.name} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
