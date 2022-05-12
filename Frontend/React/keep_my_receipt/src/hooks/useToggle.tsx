import { useState } from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';

/**
 * 문자열을 입력해주면 해당 문자열 버튼으로 이루어진 토글 버튼들 반환
 * @param list 문자열 리스트. 토글 버튼의 내용이 됨.
 * @param setter (옵션) 외부에서 토글 안의 값이 필요할 때,
 * setter 함수를 만들어 넣어줄 수 있음.
 * */
export default function useToggle(
  list: string[],
  setter?: (value: string) => void,
) {
  // 현재 토글 상태
  const [toggleValue, setToggleValue] = useState<string>(list[0]);

  // 클릭 시 토글 상태 바꾸는 함수
  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    newToggleValue: string | null,
  ) => {
    if (newToggleValue !== null) {
      setToggleValue(newToggleValue);
      if (setter) {
        setter(newToggleValue);
      }
    }
  };

  function ToggleButtons() {
    // 가로 길이 430px을 기준으로 너비 조절
    const theme = useTheme();
    const overBreakpoint = useMediaQuery(theme.breakpoints.up(430));

    return (
      <ToggleButtonGroup value={toggleValue} exclusive onChange={handleToggle}>
        {list.map((item, index) => (
          <ToggleButton
            value={item}
            sx={{ paddingX: overBreakpoint ? 3 : 1, paddingY: 1 }}
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
