import { useState } from 'react';

export type EditableItemType = ReturnType<typeof useEditableItem>;

export default function useEditableItem(
  itemValue: string | number,
  setItemValue: (value: string | number) => void,
  editOnMount?: boolean,
) {
  const [isEditing, setIsEditing] = useState(editOnMount ? true : false);
  const [changedValue, setChangedValue] = useState(itemValue);

  const onItemChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    // 숫자 형식이면 숫자로 저장하고, 아니면 문자열로 저장
    setChangedValue(Number(newValue) ? Number(newValue) : newValue);
  };

  const onItemEdit = (state: boolean) => {
    setIsEditing(state);
  };

  const onItemEditConfirm = () => {
    if (!changedValue) {
      return;
    }
    setItemValue(changedValue);
    setIsEditing(false);
  };

  return {
    changedValue,
    isEditing,
    onItemChange,
    onItemEdit,
    onItemEditConfirm,
  };
}
