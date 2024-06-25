import React, { useState } from 'react';
import { Typography, Snackbar, Alert, Button, Box } from '@mui/material';
import Navbar from './components/Navbar';
import { BackgroundBox } from './components/StyledComponent';

// 바람개비 만드는 알고리즘
const createWindmill = (count: number): string[][] => {
  // count가 0일 때 빈 배열 리턴
  if (count === 0) {
    return [];
  }

  const size = count * 2;
  // 사이즈만큼의 2차 배열 생성하고 빈 문자열 초기화
  const pattern = Array.from({ length: size }, () => Array(size).fill(''));

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      // 왼쪽 위
      pattern[i][j] = j < i ? '❤️' : '⭐';
      // 오른쪽 위
      pattern[i][size - j - 1] = i < j ? '❤️' : '⭐';
      // 왼쪽 아래
      pattern[size - i - 1][j] = i < j ? '❤️' : '⭐';
      // 오른쪽 아래
      pattern[size - i - 1][size - j - 1] = j < i ? '❤️' : '⭐';
    }
  }

  return pattern;
};

const App: React.FC = () => {
  // 카운트 세줄 state 변수
  const [count, setCount] = useState(0);
  // 카운트가 올라갈수록 보여질 2차배열 바람개비
  const [pattern, setPattern] = useState<string[][]>(createWindmill(0));
  // 알림창 state 변수
  const [open, setOpen] = useState(false);

  // 알림창 띄우기
  const caution = () => {
    if (count >= 20) {
      setOpen(true);
      return;
    }

    const newCount = count + 1;
    setCount(newCount);
    const newPattern = createWindmill(newCount);
    setPattern(newPattern);
  };

  // 알림창 닫기
  const cautionClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    // 다른 곳 눌렀을 때 아무 반응 없게
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          안녕하세요 👋
        </Typography>
      </Box>
      <BackgroundBox>
        <Box sx={{ mt: 2, mb:2 }}>
          <Button variant="contained" color="primary" onClick={() => alert('테스트 버튼입니다.')}>
            test
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" color="secondary" onClick={caution}>
            {count}+
          </Button>
        </Box>
        {/* 만든 바람개비를 보여주기 */}
        {pattern.length > 0 && pattern.map((row, rowIndex) => (
          <Box key={rowIndex} sx={{ display: 'flex', justifyContent: 'center' }}>
            {row.map((item, itemIndex) => (
              <Typography key={itemIndex} variant="body1" sx={{ margin: '2px' }}>
                {item}
              </Typography>
            ))}
          </Box>
        ))}
      </BackgroundBox>
      <Snackbar open={open} autoHideDuration={3000} onClose={cautionClose}>
        <Alert onClose={cautionClose} severity="warning" sx={{ width: '100%' }}>
          20개가 최대입니다.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
