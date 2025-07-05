import React, { useState } from 'react';
import { Box, Typography, TextField, FormControlLabel, Checkbox, Link, Button } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TermsModal from './TermsModal';
import { sereneBlueTheme } from '../theme';

const Lobby = ({ username, setUsername, onFindPartner }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <TermsModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', p: 4 }}>
        <PeopleAltOutlinedIcon sx={{ fontSize: 80, color: sereneBlueTheme.palette.primary, mb: 2 }}/>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Welcome to Asthica Chat</Typography>
        <Typography variant="body1" sx={{ mb: 4, color: sereneBlueTheme.palette.textSecondary }}>Enter a display name to connect with a random partner.</Typography>
        <TextField fullWidth variant="outlined" label="Enter your name" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 2, maxWidth: '300px' }}/>
        <FormControlLabel control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />} label={<Typography variant="body2" color="textSecondary">I agree to the <Link component="button" variant="body2" onClick={() => setModalOpen(true)}>Terms and Conditions</Link>.</Typography>} sx={{ mb: 2 }}/>
        <Button variant="contained" size="large" onClick={onFindPartner} disabled={!username.trim() || !termsAccepted} sx={{ borderRadius: '8px', py: 1.5, px: 5, fontWeight: 'bold', textTransform: 'none' }}>Find a Partner</Button>
      </Box>
    </>
  );
};

export default Lobby;