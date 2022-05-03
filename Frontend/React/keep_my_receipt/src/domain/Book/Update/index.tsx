import React from 'react';
import useEditableList from '../../../hooks/useEditableList';

const sample = [
  { name: '축구공', editable: false },
  { name: '축구화', editable: false },
];

export default function BookUpdate() {
  const { selectedValue, EditableList } = useEditableList(sample);

  return (
    <>
      {selectedValue}
      <EditableList />
    </>
  );
}
