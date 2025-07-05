import React, { useState, useEffect, useRef } from 'react';
import { Box, Avatar, Typography, TextField, Button, Divider, Tooltip, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Message from './Message';
import { sereneBlueTheme, customScrollbarStyles } from '../theme';

const ChatWindow = ({ messages, username, partnerUsername, onSendMessage, onLeave, onFindNew }) => {
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  const handleSend = (e) => { e.preventDefault(); if (messageInput.trim()) { onSendMessage(messageInput); setMessageInput(''); } };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #DEE2E6', display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: sereneBlueTheme.palette.primary, mr: 2 }}>{partnerUsername?.charAt(0).toUpperCase()}</Avatar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>{partnerUsername || 'Stranger'}</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: {xs: 2, sm: 3}, bgcolor: sereneBlueTheme.palette.background, ...customScrollbarStyles }}>
        {messages.map((msg, index) => <Message key={index} msg={msg} username={username} />)}
        <div ref={messagesEndRef} />
      </Box>
      <Box component="form" onSubmit={handleSend} sx={{ p: 2, borderTop: '1px solid #DEE2E6', display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: sereneBlueTheme.palette.surface }}>
        <TextField fullWidth variant="outlined" size="small" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Type a message..." autoComplete="off" />
        <Button variant="contained" type="submit" disabled={!messageInput.trim()} sx={{ borderRadius: '8px', px: 3 }} aria-label="send message"><SendIcon /></Button>
        <Divider orientation="vertical" flexItem />
        <Tooltip title="Find New Partner"><IconButton aria-label="Find New Partner" onClick={onFindNew}><AutorenewIcon /></IconButton></Tooltip>
        <Tooltip title="Leave Chat"><IconButton aria-label="Leave Chat" onClick={onLeave} sx={{ color: sereneBlueTheme.palette.textSecondary, '&:hover': { color: sereneBlueTheme.palette.error } }}><ExitToAppIcon /></IconButton></Tooltip>
      </Box>
    </Box>
  );
};

export default ChatWindow;