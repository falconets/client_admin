import React from 'react';
import { AppBar, IconButton, Toolbar, useTheme } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { toggleSidebar } from '../../../utils';

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        top: 0,
        width: '100vw',
        height: '52px',
        zIndex: theme.zIndex.drawer + 1,
        padding: theme.spacing(2),
        gap: theme.spacing(1),
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
        [theme.breakpoints.up('md')]: {
          height: '0px',
        },
        backgroundColor: 'white'
      }}
    >
      <Toolbar sx={{backgroundColor: 'white'}}>
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: theme.palette.text.primary,
          }}
          size="small"
        >
          <MenuRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
