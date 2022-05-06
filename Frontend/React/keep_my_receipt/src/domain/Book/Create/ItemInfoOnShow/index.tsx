import React from 'react';
import { IconButton, ListItem } from '@mui/material';
import { Edit } from '@mui/icons-material';

import ListItemTextWithSubtext from '../ListItemTextWithSubtext';
import { ItemInfoType } from '../Item';

interface ItemInfoOnShowType {
  itemInfo: ItemInfoType;
  setItemInfo: React.Dispatch<React.SetStateAction<ItemInfoType>>;
}

export default function ItemInfoOnShow({
  itemInfo,
  setItemInfo,
}: ItemInfoOnShowType) {
  const editItem = () => {
    setItemInfo((info) => ({ ...info, onEdit: true }));
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton onClick={() => editItem()}>
            <Edit />
          </IconButton>
        }
      >
        <ListItemTextWithSubtext text="내용" subtext={itemInfo.name} inset />
      </ListItem>
    </>
  );
}
