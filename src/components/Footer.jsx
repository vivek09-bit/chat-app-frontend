import React from 'react';
import { Box, Typography } from '@mui/material';
import { sereneBlueTheme } from '../theme';
import { Link } from 'react-router-dom';

const Footer = () => (
  <Box component="footer" sx={{ p: 3, mt: 'auto', color: sereneBlueTheme.palette.textSecondary, textAlign: 'center' }}>
    <Typography variant="body2">© {new Date().getFullYear()} Asthica Chat. All rights reserved.</Typography>
    <Typography variant="body2">Powered by <Link href="https://teamignite.in" target="_blank" rel="noopener" color="inherit">Team Ignite</Link>.</Typography>
  </Box>
);

export default Footer;