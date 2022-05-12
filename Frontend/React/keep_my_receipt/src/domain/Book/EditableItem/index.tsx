import { useState } from 'react';
import ItemInfoOnEdit from './ItemInfoOnEdit';
import ItemInfoOnShow from './ItemInfoOnShow';

export default function useEditableItem(
  titleName: string,
  itemValue: string | number,
  setItemValue: (value: string | number) => void,
) {
  function EditableItem() {
    const [editable, setEditable] = useState(false);
    return (
      <>
        {editable ? (
          <ItemInfoOnEdit
            titleName={titleName}
            itemValue={itemValue}
            setItemValue={setItemValue}
            setEditable={setEditable}
          />
        ) : (
          <ItemInfoOnShow
            titleName={titleName}
            itemValue={itemValue}
            setEditable={setEditable}
          />
        )}
      </>
    );
  }

  return EditableItem;
}
