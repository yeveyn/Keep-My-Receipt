import React, { useEffect, useState } from 'react';
import { Divider, List, Stack } from '@mui/material';

// 컴포넌트
import ItemCategoryEditable from '../ItemCategoryEditable';
import ItemCategoryFixed from '../ItemCategoryFixed';
// 훅
import useToggle from '../../../../hooks/useToggle';
import useEditableItem from '../../../../hooks/useEditableItem';
// 리듀서
import { BookAction, BookItemType, updateItem } from '../../bookReducer';
// 샘플 파일들
import {
  mainCategories,
  largeCategories,
  mediumCategories,
} from '../../tagListSample';

interface ItemType {
  item: BookItemType;
  itemIndex: number;
  dispatch: React.Dispatch<BookAction>;
}

export default function Item({ item, itemIndex, dispatch }: ItemType) {
  // 토글 값과, 토글 버튼 생성
  const { toggleValue, ToggleButtons } = useToggle(mainCategories);
  // 대분류와 중분류 값 관리
  const [selectedLargeCategory, setSelectedLargeCategory] = useState('');
  const [totalMediums, setTotalMediums] = useState(mediumCategories);
  const [currentMediumCategories, setCurrentMediumCategories] = useState(['']);

  const [selectedMediumCategory, setSelectedMediumCategory] = useState('');

  // 거래 내역 각각의 항목 이름 컴포넌트
  const EditableItemForName = useEditableItem(
    '내용',
    item.itemName,
    (value: string | number) => {
      dispatch(updateItem(itemIndex, 'itemName', value));
    },
  );

  // 거래 내역 각각의 항목별 금액 컴포넌트
  const EditableItemForMoney = useEditableItem(
    '금액',
    item.itemValue,
    (value: string | number) => {
      dispatch(updateItem(itemIndex, 'itemValue', value));
    },
  );

  // 토글 값이 바뀔 때 대분류와 중분류 초기화
  useEffect(() => {
    setSelectedLargeCategory('');
    setSelectedMediumCategory('');
  }, [toggleValue]);

  // 대분류가 바뀔 때, 중분류 초기화
  useEffect(() => {
    setSelectedMediumCategory('');
    setCurrentMediumCategories(totalMediums[selectedLargeCategory]);
  }, [selectedLargeCategory]);

  // 중분류 수정/삭제 시, 기존 중분류 갱신
  useEffect(() => {
    setTotalMediums((obj) => ({
      ...obj,
      [selectedLargeCategory]: currentMediumCategories,
    }));
  }, [currentMediumCategories]);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginY={1}
      >
        <span style={{ marginLeft: '3.5rem' }}>유형</span>
        <ToggleButtons />
      </Stack>
      <Divider />

      <ItemCategoryFixed
        name="대분류"
        list={largeCategories[toggleValue]}
        category={selectedLargeCategory}
        setCategory={setSelectedLargeCategory}
      />
      <Divider />

      <ItemCategoryEditable
        name="중분류"
        list={currentMediumCategories}
        setList={setCurrentMediumCategories}
        category={selectedMediumCategory}
        setCategory={setSelectedMediumCategory}
      />
      <Divider />

      <List disablePadding>
        <EditableItemForName />
        <Divider />
        <EditableItemForMoney />
      </List>
    </>
  );
}
