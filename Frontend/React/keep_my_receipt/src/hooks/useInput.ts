import { useState, useCallback } from 'react';

function useInput(value: string | number) {
  // 사용자 input에 따라 변하는 값
  const [changedValue, setChangedValue] = useState(value);

  // onChange 속성에 넣어줄 함수
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const newValue = e.target.value;
      // 문자열이면 그대로 저장하고, 숫자면 정수로 바꿔서 저장
      setChangedValue(
        typeof newValue === 'string' ? newValue : parseInt(newValue),
      );
    },
    [],
  );

  // 변하는 값과 함수를 반환
  return { changedValue, handleChange };
}

export default useInput;
