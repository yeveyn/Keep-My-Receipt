import React from 'react';
import { Button, Collapse } from '@mui/material';
import useEditableList from '../../../hooks/useEditableList';

const sample = [
  { name: '축구공', editable: false },
  { name: '축구화', editable: false },
];

export default function BookUpdate() {
  const { selectedItem, EditableList, isOpen, setOpen } = useEditableList(
    sample,
    true,
  );

  return (
    <>
      {selectedItem}
      <EditableList />
    </>
  );
}
