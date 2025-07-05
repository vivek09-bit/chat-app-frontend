import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { sereneBlueTheme } from '../theme';

const PartnerLeftView = ({ partnerUsername, onFindNew, onReturnToLobby }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', p: 4 }}>
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 80, color: sereneBlueTheme.palette.error, mb: 2 }}/>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Chat Ended</Typography>
        <Typography variant="body1" sx={{ mb: 4, color: sereneBlueTheme.palette.textSecondary }}>Your chat with <strong>{partnerUsername || 'your partner'}</strong> has ended because they left.</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" size="large" onClick={onReturnToLobby} sx={{ borderRadius: '8px', textTransform: 'none' }}>Return to Lobby</Button>
            <Button variant="contained" size="large" onClick={onFindNew} sx={{ borderRadius: '8px', py: 1.5, px: 4, fontWeight: 'bold', textTransform: 'none' }}>Find New Partner</Button>
        </Box>
    </Box>
);

export default PartnerLeftView;