import sample from './sample.json';

type MainCategoryValueType = {
  total: number;
  categories: {
    name: string;
    sum: number;
  }[];
};

// 배열로부터 리터럴 타입 동적으로 생성하기
// : as const로 readonly로 만든 다음,
// typeof로 타입을 추출해낸다.
// 참고: https://stackoverflow.com/questions/51521808/how-do-i-create-a-type-from-a-string-array-in-typescript
const mainCategories = [
  '현금 및 현금성 자산',
  '유형자산',
  '선급금',
  '기타자산',
] as const;
type MainCategoryKey = typeof mainCategories[number];

type AssetReportType = {
  // 인덱스 시그니처의 키는 매핑된 개체 형식 이용하기
  [key in MainCategoryKey]: MainCategoryValueType;
} & {
  // 다른 타입이랑 합침
  total: number;
};

export default function AssetReport() {
  const sampleList: AssetReportType = sample;

  return (
    <>
      <br />
    </>
  );
}
