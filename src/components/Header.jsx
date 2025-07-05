import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { sereneBlueTheme } from '../theme';

const Header = () => (
  <AppBar position="static" elevation={0} sx={{ bgcolor: sereneBlueTheme.palette.surface, borderBottom: `1px solid #DEE2E6` }}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: sereneBlueTheme.palette.primary }}>
        Asthica Chat
      </Typography>
      <Button sx={{ color: sereneBlueTheme.palette.textSecondary, textTransform: 'none', '&:hover': { bgcolor: 'rgba(0, 123, 255, 0.04)' } }}>Home</Button>
      <Button sx={{ color: sereneBlueTheme.palette.textSecondary, textTransform: 'none', '&:hover': { bgcolor: 'rgba(0, 123, 255, 0.04)' } }}>About</Button>
    </Toolbar>
  </AppBar>
);

export default Header;