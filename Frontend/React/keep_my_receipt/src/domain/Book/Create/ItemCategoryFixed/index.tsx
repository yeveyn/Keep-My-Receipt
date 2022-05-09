import { memo, useState } from 'react';
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore, Info } from '@mui/icons-material';

import ListItemTextWithSubtext from '../ListItemTextWithSubtext';

interface ItemCategoryType {
  name: string;
  list: string[];
  category: string;
  setCategory: (value: string) => void;
}

function ItemCategory({ name, list, category, setCategory }: ItemCategoryType) {
  // 세부 목록 열림 / 닫힘 상태
  const [open, setOpen] = useState(false);

  // 세부 목록 열림 / 닫힘 조작
  const handleExpand = () => {
    setOpen(!open);
  };

  // 세부 목록 클릭 시 값 바꿈
  const handleSelect = (newValue: string) => {
    setCategory(newValue);
  };

  return (
    <>
      <List disablePadding>
        <ListItemButton onClick={handleExpand}>
          {/* 아이콘 */}
          <IconButton
            // 아이콘 클릭 시 물결 효과 제거
            disableRipple
            // 아이콘 클릭 시 메뉴 열리는 이벤트 차단
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Info />
          </IconButton>

          {/* 분류명 & 선택된 항목 */}
          <ListItemTextWithSubtext text={name} subtext={category} />

          {/* 열기 / 닫기 화살표 */}
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* 화살표 눌렀을 때 나오는 리스트들 */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {list.map((item) => (
              <ListItemButton
                // 클릭 시 값 바꿈 & 목록 접음
                onClick={() => {
                  handleExpand();
                  handleSelect(item);
                }}
                sx={{ pl: 4 }}
                key={item}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
}

export default memo(ItemCategory);
