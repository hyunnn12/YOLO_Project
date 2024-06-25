// 샘플데이터
// 타입 지정
interface CountItem {
  combination: string[];
  remainCount: number;
}

interface GroupItem {
  title: string;
  options: string[];
}

interface DataItem {
  countList: CountItem[];
  titleList: string[];
  groupList: GroupItem[];
}

export interface SampleData {
  [key: string]: DataItem;
}

export const sampleData: SampleData = {
  "621f2588d8d85b8d78eb3e64": {
    countList: [
      { combination: ["스몰", "검정"], remainCount: 0 },
      { combination: ["스몰", "하양"], remainCount: 0 },
      { combination: ["스몰", "빨강"], remainCount: 0 },
      { combination: ["라지", "검정"], remainCount: 1 },
      { combination: ["라지", "하양"], remainCount: 1 },
      { combination: ["라지", "빨강"], remainCount: 0 },
    ],
    titleList: ["사이즈", "색상"],
    groupList: [
      { title: "사이즈", options: ["스몰", "라지"] },
      { title: "색상", options: ["검정", "하양", "빨강"] },
    ],
  },
  "62419aa64139ba24abb709e8": {
    countList: [
      { combination: ["오랑우탄", "아보카도", "선물 포장"], remainCount: 10 },
      { combination: ["오랑우탄", "아보카도", "포장 안함"], remainCount: 100 },
      { combination: ["오랑우탄", "사과", "선물 포장"], remainCount: 0 },
      { combination: ["오랑우탄", "사과", "포장 안함"], remainCount: 0 },
      { combination: ["얼룩말", "아보카도", "선물 포장"], remainCount: 0 },
      { combination: ["얼룩말", "아보카도", "포장 안함"], remainCount: 0 },
      { combination: ["얼룩말", "사과", "선물 포장"], remainCount: 0 },
      { combination: ["얼룩말", "사과", "포장 안함"], remainCount: 5 },
    ],
    titleList: ["동물 선택", "과일 선택", "포장 선택"],
    groupList: [
      { title: "동물 선택", options: ["오랑우탄", "얼룩말"] },
      { title: "과일 선택", options: ["아보카도", "사과"] },
      { title: "포장 선택", options: ["선물 포장", "포장 안함"] },
    ],
  },

  //여기에 샘플 데이터를 넣어주세요.
  
};
