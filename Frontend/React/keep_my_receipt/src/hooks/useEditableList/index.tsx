import { memo, useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

import ItemOnEdit from './ItemOnEdit';
import Item from './Item';

export interface EditableItemType {
  name: string;
  editable: boolean;
}

/** Todo List 처럼 태그를 CRUD 할 수 있는 리스트 */
export default function useEditableList(list: EditableItemType[]) {
  /**
   * useState를 밖에 둔 이유:
   * useState로 관리하는 list 같은 건 컴포넌트 밖에 빼야 함.
   * 왜냐하면 선택된 아이템이 바뀌면 상태가 바뀌는데,
   * 1. 상태가 바뀌었으므로 전부 리렌더링 되고,
   * 2. 이에 따라 EditableList도 리렌더링되므로,
   * 3. list를 EditableList 안에 넣으면 초기화됨.
   * 반면 바깥에 넣으면 useState로 상태 보존.
   */
  const [selectedItem, setSelectedItem] = useState('');
  const [itemList, setItemList] = useState(list);

  const EditableList = memo(() => {
    return (
      <>
        <List disablePadding>
          {/* 리스트 아이템들 출력 */}
          {itemList.map((item) =>
            // 수정 버튼을 누른 아이템인 경우
            item.editable ? (
              // 수정 가능한 아이템 표시
              <ItemOnEdit item={item} setItemList={setItemList} />
            ) : (
              // 아닌 경우 그냥 아이템 표시
              <Item
                item={item}
                setItemList={setItemList}
                setSelectedItem={setSelectedItem}
              />
            ),
          )}

          {/* 리스트 마지막에 태그 추가 가능한 버튼 추가 */}
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

  return { selectedItem, EditableList };
}
