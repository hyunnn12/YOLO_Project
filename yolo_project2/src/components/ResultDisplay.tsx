import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Typography } from '@mui/material';

const ResultDisplay: React.FC = () => {
  // options : 사용자가 선택한 옵션 값들 배열
  // data : 현재 선택된 id에 해당하는 데이터 세트들
  const { options, data } = useSelector((state: RootState) => state.options);
  // options 배열에서 필요한 개수만큼 잘라낸다.
  // 빈 문자열이 아닌 유효한 옵션 값들만 필터링함.
  // 따라서 사용자가 선택한 유효한 옵션 값들만 남음.
  const selectedOptions = options.slice(0, data.titleList.length).filter(option => option !== '');

  return (
    <div>
      {/* 결과 ui */}
      {selectedOptions.length === data.titleList.length && (
        <Typography variant="h5">
          ➡️ {selectedOptions.join(' / ')}
        </Typography>
      )}
    </div>
  );
};

export default ResultDisplay;
