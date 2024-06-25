// 네브바 컴포넌트
import React from 'react';
import { AppBar, Toolbar, Typography} from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          크로켓으로 갈래요!
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
