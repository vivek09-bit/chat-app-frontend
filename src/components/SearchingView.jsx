import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { sereneBlueTheme } from '../theme';

const SearchingView = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', flexGrow: 1, textAlign: 'center' }}>
        <CircularProgress size={60} sx={{ color: sereneBlueTheme.palette.primary, mb: 3 }} />
        <Typography variant="h6" sx={{ color: sereneBlueTheme.palette.textPrimary, animation: 'pulse 1.5s infinite ease-in-out' }}>Searching for a partner...</Typography>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }`}</style>
    </Box>
);

export default SearchingView;