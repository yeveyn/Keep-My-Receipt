import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

/** 문자열을 입력해주면 해당 문자열 버튼으로 이루어진 토글 버튼들 반환 */
export default function useToggle(list: string[]) {
  // 현재 토글 상태
  const [toggleValue, setToggleValue] = useState<string>(list[0]);

  // 클릭 시 토글 상태 바꾸는 함수
  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newToggleValue: string | null,
  ) => {
    if (newToggleValue !== null) {
      setToggleValue(newToggleValue);
    }
  };

  function ToggleButtons() {
    return (
      <ToggleButtonGroup value={toggleValue} exclusive onChange={handleToggle}>
        {list.map((item, index) => (
          <ToggleButton
            value={item}
            sx={{ paddingX: 3, paddingY: 1 }}
            key={index}
          >
            {item}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  }

  return { toggleValue, ToggleButtons };
}
