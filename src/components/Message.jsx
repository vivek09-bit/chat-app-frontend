import React from 'react';
import { Box, Avatar, Paper, Typography } from '@mui/material';
import { sereneBlueTheme } from '../theme';

const Message = ({ msg, username }) => {
  const isSelf = msg.type === 'self';
  const isSystem = msg.type === 'system';
  if (isSystem) return <Typography variant="caption" sx={{ textAlign: 'center', my: 1, color: sereneBlueTheme.palette.textSecondary }}>{msg.text}</Typography>;

  return (
    <Box sx={{ display: 'flex', justifyContent: isSelf ? 'flex-end' : 'flex-start', mb: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, flexDirection: isSelf ? 'row-reverse' : 'row' }}>
        <Avatar sx={{ bgcolor: isSelf ? sereneBlueTheme.palette.primary : sereneBlueTheme.palette.textSecondary, width: 32, height: 32, fontSize: '1rem', color: '#fff' }}>
          {isSelf ? username.charAt(0).toUpperCase() : msg.sender.charAt(0).toUpperCase()}
        </Avatar>
        <Paper elevation={0} sx={{ p: '10px 14px', borderRadius: sereneBlueTheme.borderRadius, border: isSelf ? 'none' : `1px solid #DEE2E6`, borderTopLeftRadius: !isSelf ? '4px' : sereneBlueTheme.borderRadius, borderTopRightRadius: isSelf ? '4px' : sereneBlueTheme.borderRadius, bgcolor: isSelf ? sereneBlueTheme.palette.bubbleUser : sereneBlueTheme.palette.bubblePartner, color: isSelf ? '#FFFFFF' : sereneBlueTheme.palette.textPrimary, maxWidth: '75%' }}>
          <Typography variant="body2">{msg.text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Message;