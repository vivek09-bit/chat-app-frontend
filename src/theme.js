export const sereneBlueTheme = {
  palette: {
    background: '#F8F9FA', surface: '#FFFFFF', primary: '#007BFF', textPrimary: '#212529',
    textSecondary: '#6C757D', bubbleUser: '#007BFF', bubblePartner: '#E9ECEF',
    error: '#DC3545', warning: { light: '#FFF3CD', main: '#FFC107', dark: '#664d03' }
  },
  borderRadius: '12px',
};

export const mainBoxStyles = {
  p: 0, borderRadius: sereneBlueTheme.borderRadius, bgcolor: sereneBlueTheme.palette.surface,
  border: `1px solid #DEE2E6`, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  color: sereneBlueTheme.palette.textPrimary, width: '100%', maxWidth: '600px',
  minHeight: '75vh', display: 'flex', flexDirection: 'column',
  overflow: 'hidden', transition: 'all 0.3s ease-in-out',
};

export const customScrollbarStyles = {
  '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-track': { background: '#F1F1F1' },
  '&::-webkit-scrollbar-thumb': { backgroundColor: '#C1C1C1', borderRadius: '4px' },
  '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#A8A8A8' },
};