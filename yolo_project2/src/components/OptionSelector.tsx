import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setSelectedId, setOption } from '../redux/slices/optionSlice';
import { sampleData } from '../data/sampleData';
import { FormControl, InputLabel, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  margin: '16px 0',
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  backgroundColor: 'white',
  padding: '0 8px',
  transform: 'translate(14px, -6px) scale(0.75)',
  transformOrigin: 'top left',
  borderRadius: '8px',
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const OptionSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedId, options, remainCount, data } = useSelector((state: RootState) => state.options);

  const selectId = (event: SelectChangeEvent<string>) => {
    // 선택한 id를 redux 상태에 반영
    dispatch(setSelectedId(event.target.value));
  };

  const selectOption = (index: number) => (event: SelectChangeEvent<string>) => {
     // 선택한 옵션 값들을 redux 상태에 반영
    dispatch(setOption({ index, value: event.target.value }));
  };

  const isOptionDisabled = (option: string, index: number): boolean => {
    if (index === 0) {
      // 첫 번째 옵션일 때, 해당 옵션의 모든 조합이 재고가 없는지 확인
      return data.countList.filter(item => item.combination[index] === option).every(item => item.remainCount === 0);
    }

    // 그 외의 경우, 이전 옵션이 선택된 상태에서 현재 옵션의 재고를 확인
    const previousOptions = options.slice(0, index);
    return data.countList.filter(item =>
      item.combination.slice(0, index).every((opt, i) => opt === previousOptions[i]) && item.combination[index] === option
    ).every(item => item.remainCount === 0);
  };

  const getRemainingCount = (option: string, index: number): number => {
    if (index === 0) {
      // 첫 번째 옵션일 때, 해당 옵션의 모든 조합의 남은 재고 수량을 합산
      return data.countList.filter(item => item.combination[index] === option).reduce((acc, item) => acc + item.remainCount, 0);
    }

    // 그 외의 경우, 이전 옵션이 선택된 상태에서 현재 옵션의 남은 재고 수량을 합산
    const previousOptions = options.slice(0, index);
    return data.countList.filter(item =>
      item.combination.slice(0, index).every((opt, i) => opt === previousOptions[i]) && item.combination[index] === option
    ).reduce((acc, item) => acc + item.remainCount, 0);
  };

  return (
    <div>
       {/* id 선택 드롭다운 */}
      <CustomFormControl fullWidth margin="normal">
        <CustomInputLabel>ID 선택</CustomInputLabel>
        <Select value={selectedId} onChange={selectId}>
          {Object.keys(sampleData).map((id) => (
            <MenuItem key={id} value={id}>
              {id}
            </MenuItem>
          ))}
        </Select>
      </CustomFormControl>

      {/* 옵션 선택 드롭다운 */}
      {/* 각 옵션 그룹(사이즈, 색상 등) */}
      {data.titleList.map((title, index) => (
        <CustomFormControl fullWidth margin="normal" key={title} disabled={index > 0 && !options[index - 1]}>
          <CustomInputLabel>{title}</CustomInputLabel>
          <Select value={options[index]} onChange={selectOption(index)} renderValue={(selected) => selected}>
            {/* 각 옵션을 드롭다운 */}
            {data.groupList[index].options.map((option) => {
              const disabled = isOptionDisabled(option, index);
              const remainingCount = getRemainingCount(option, index);
              return (
                <CustomMenuItem key={option} value={option} disabled={disabled}>
                  {option}
                  {!disabled && `(${remainingCount}개 구매 가능)`}
                  {disabled && '(품절)'}
                </CustomMenuItem>
              );
            })}
          </Select>
        </CustomFormControl>
      ))}

      {/* 남은 개수 표시 */}
      {remainCount !== null && (
        <Typography variant="h6" color={remainCount === 0 ? 'red' : 'green'}>
          {remainCount === 0 ? '품절' : `구매 가능 개수: ${remainCount}`}
        </Typography>
      )}
    </div>
  );
};

export default OptionSelector;
