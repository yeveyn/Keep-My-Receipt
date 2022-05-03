// 투두 리스트처럼 만들기!

import { memo, useState } from 'react';
import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material';
import {
  AddCircleOutline,
  CheckCircleOutline,
  Edit,
  Delete,
} from '@mui/icons-material';

interface EditableItemType {
  name: string;
  editable: boolean;
}

export default function useEditableList(list: EditableItemType[]) {
  /**
   * useState로 관리하는 list 같은 건 컴포넌트 밖에 빼야 함.
   * 왜냐하면 선택된 아이템이 바뀌면 상태가 바뀌는데,
   * 상태가 바뀌었으므로 전부 리렌더링 되고,
   * 이에 따라 EditableList도 리렌더링되므로,
   * list를 EditableList 안에 넣으면 초기화됨.
   * 반면 바깥에 넣으면 useState로 상태 보존.
   */
  const [selectedItem, setSelectedItem] = useState('');
  const [itemList, setItemList] = useState(list);

  const EditableList = memo(() => {
    const selectItem = (item: string): void => {
      setSelectedItem(item);
    };

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

    const confirmEditItem = (target: EditableItemType): void => {
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
        <List disablePadding>
          {itemList.map((item) =>
            item.editable ? (
              <ListItem
                secondaryAction={
                  <IconButton onClick={() => confirmEditItem(item)}>
                    <CheckCircleOutline />
                  </IconButton>
                }
              >
                <InputBase defaultValue={item.name} />
              </ListItem>
            ) : (
              <ListItem
                secondaryAction={
                  <>
                    <IconButton onClick={() => editItem(item)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteItem(item.name)}
                      edge="end"
                    >
                      <Delete />
                    </IconButton>
                  </>
                }
                key={item.name}
              >
                <ListItemButton
                  // 클릭 시 값 바꿈
                  onClick={() => {
                    selectItem(item.name);
                  }}
                  sx={{ paddingLeft: 4 }}
                >
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ),
          )}
          <ListItem>
            <ListItemButton sx={{ paddingLeft: 4 }}>
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
        </List>
      </>
    );
  });

  return { selectedValue: selectedItem, EditableList };
}
