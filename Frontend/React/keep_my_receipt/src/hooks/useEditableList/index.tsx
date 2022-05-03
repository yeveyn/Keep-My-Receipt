import { memo, useState } from 'react';
import { List } from '@mui/material';

import Item from './Item';
import ItemOnEdit from './ItemOnEdit';
import ItemAdder from './ItemAdder';

export interface EditableItemType {
  name: string;
  editable: boolean;
}

/** Todo List 처럼 태그를 CRUD 할 수 있는 리스트 */
export default function useEditableList(
  list: EditableItemType[],
  collapsible: boolean,
) {
  /**
   * useState를 밖에 둔 이유:
   * useState로 관리하는 list 같은 건 컴포넌트 밖에 빼야 함.
   * 왜냐하면 선택된 아이템이 바뀌면 상태가 바뀌는데,
   * 1. 상태가 바뀌었으므로 전부 리렌더링 되고,
   * 2. 이에 따라 EditableList도 리렌더링되므로,
   * 3. list를 EditableList 안에 넣으면 초기화됨.
   * 반면 바깥에 넣으면 useState로 상태 보존.
   */
  const [itemList, setItemList] = useState(list);
  const [selectedItem, setSelectedItem] = useState('');
  const [open, setOpen] = useState(false);

  const EditableList = memo(() => {
    return (
      <>
        <List disablePadding>
          {/* 리스트 아이템들 출력 */}
          {itemList.map((item) =>
            // 수정 버튼을 누른 아이템인 경우
            item.editable ? (
              // 수정 가능한 텍스트 필드 표시
              <ItemOnEdit item={item} setItemList={setItemList} />
            ) : (
              // 아닌 경우 그냥 아이템 표시
              <Item
                item={item}
                setItemList={setItemList}
                setSelectedItem={setSelectedItem}
                collapsible={collapsible}
                setOpen={setOpen}
              />
            ),
          )}

          {/* 태그 추가 가능한 버튼 맨 아래에 추가 */}
          <ItemAdder itemList={itemList} setItemList={setItemList} />
        </List>
      </>
    );
  });

  return { itemList, selectedItem, EditableList, isOpen: open, setOpen };
}
