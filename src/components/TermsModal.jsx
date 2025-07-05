import React from 'react';
import { Modal, Paper, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { sereneBlueTheme, customScrollbarStyles } from '../theme';

const TermsModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose} aria-labelledby="terms-and-conditions-title">
    <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '90%', sm: '80%', md: 600 }, maxHeight: '90vh', display: 'flex', flexDirection: 'column', bgcolor: sereneBlueTheme.palette.surface, borderRadius: sereneBlueTheme.borderRadius, boxShadow: 24, p: 0 }}>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #DEE2E6' }}>
        <Typography id="terms-and-conditions-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>Terms & Conditions</Typography>
        <IconButton aria-label="close terms modal" onClick={onClose}><CloseIcon /></IconButton>
      </Box>
      <Box sx={{ p: 3, overflowY: 'auto', ...customScrollbarStyles }}>
        {/* ... content of terms ... */}
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid #DEE2E6', textAlign: 'right' }}>
        <Button onClick={onClose} variant="contained">I Understand</Button>
      </Box>
    </Paper>
  </Modal>
);

export default TermsModal;