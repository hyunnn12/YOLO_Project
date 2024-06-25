import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sampleData, SampleData } from '../../data/sampleData';

// 상태 구조 정의
interface OptionState {
  selectedId: string;
  options: string[];
  remainCount: number | null;
  data: SampleData[keyof SampleData];
}

// 초기 상태 정의
const initialState: OptionState = {
  selectedId: '621f2588d8d85b8d78eb3e64',
  options: ['', '', ''],
  remainCount: null,
  data: sampleData['621f2588d8d85b8d78eb3e64'],
};

// 리듀서 정의
const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    // 데이터의 id에 맞는 데이터로 상태 정의
    setSelectedId: (state, action: PayloadAction<string>) => {
      // 액션의 페이로드 값으로 설정
      state.selectedId = action.payload;
      // sampleData 객체에서 해당 id에 해당하는 데이터로 설정
      state.data = sampleData[action.payload];
      state.options = ['', '', ''];
      state.remainCount = null;
    },
    // 선택한 옵션에 맞는 데이터로 상태 정의
    setOption: (state, action: PayloadAction<{ index: number; value: string }>) => {
      // 액션의 페이로드 값으로 설정
      state.options[action.payload.index] = action.payload.value;
      // 초기 상태는 모두 빈 문자열로 된 배열이지만
      // 유저가 옵션을 선택하면 배열에 저장이 된다.
      // 따라서 빈 문자열이 아닌 고른 실제 값들이 validOptions에 포함됨.
      const validOptions = state.options.filter(option => option !== '');
      // 만약 그 고른 값이 titleList의 길이와 같다면
      // id마다 titleList가 다르기 때문에 2개, 3개일 때를 대비
      // 두 값이 같다면 모든 옵션이 선택된 상태라는 것
      if (validOptions.length === state.data.titleList.length) {
        // slice 메서드를 통해 현재 선택한 옵션 조합을 복사해 새로운 배열을 만듦.
        const combination = state.options.slice(0, state.data.titleList.length);
        // find 메서드를 통해 현재 선택된 옵션 조합이 countList의 조합과 일치하는지 확인
        const countInfo = state.data.countList.find(item =>
          item.combination.every((value, index) => value === combination[index])
        );
        // 만약 존재한다면 remainCount를 설정
        // 존재하지 않는다면 null로 설정
        state.remainCount = countInfo ? countInfo.remainCount : null;
      }
      // 모든 옵션이 선택되지 않았을 때
      else {
        state.remainCount = null;
      }
    },
  },
});

export const { setSelectedId, setOption } = optionSlice.actions;
export default optionSlice.reducer;