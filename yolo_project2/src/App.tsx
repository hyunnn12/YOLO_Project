import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import GlobalStyles from './styles/GlobalStyles';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Box } from '@mui/material';
import OptionSelector from './components/OptionSelector';
import ResultDisplay from './components/ResultDisplay';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <GlobalStyles />
      {/* 네브바 */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">크로켓으로 갈래요!</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4}>
          <Typography variant="h4" gutterBottom>
            옵션 선택
          </Typography>
          <OptionSelector />
          <Box mt={4}>
            <ResultDisplay />
          </Box>
        </Box>
      </Container>
    </Provider>
  );
};

export default App;
