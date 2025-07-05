import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Layout and Theming
import { Container, Box, Paper } from '@mui/material';
// CORRECTED: Import sereneBlueTheme alongside mainBoxStyles
import { mainBoxStyles, sereneBlueTheme } from './theme'; 

// CORRECTED: Consistent component paths, all pointing to the /components directory
import Header from './components/Header';
import Footer from './components/Footer';
import Lobby from './components/Lobby';
import SearchingView from './components/SearchingView';
import ChatWindow from './components/ChatWindow';
import PartnerLeftView from './components/PartnerLeftView';

const socket = io('https://chat-app-back-qqv1.onrender.com'); // Connect to your backend Socket.IO server

function App() {
  const [status, setStatus] = useState('idle'); // 'idle', 'searching', 'connected', 'partner_left'
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('Stranger');
  const [partnerUsername, setPartnerUsername] = useState(null);

  useEffect(() => {
    const onPartnerFound = ({ partnerUsername: foundPartner }) => {
      setPartnerUsername(foundPartner);
      setMessages([{ type: 'system', text: `You are now connected with ${foundPartner}.` }]);
      setStatus('connected');
    };
    const onMessageReceived = ({ senderUsername, text }) => setMessages(prev => [...prev, { type: 'partner', sender: senderUsername, text }]);
    const onPartnerLeft = () => setStatus('partner_left');
    const onDisconnect = () => {
        setStatus('idle');
        setPartnerUsername(null);
        setMessages([{ type: 'system', text: 'You have been disconnected. Please refresh.' }]);
    };
    socket.on('partnerFound', onPartnerFound);
    socket.on('message', onMessageReceived);
    socket.on('partnerLeft', onPartnerLeft);
    socket.on('disconnect', onDisconnect);
    return () => {
      socket.off('partnerFound', onPartnerFound);
      socket.off('message', onMessageReceived);
      socket.off('partnerLeft', onPartnerLeft);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const findPartner = () => {
    if (!username.trim()) return;
    setStatus('searching');
    setPartnerUsername(null);
    setMessages([]);
    socket.emit('findPartner', username);
  };
  const sendMessage = (text) => {
    socket.emit('sendMessage', text);
    setMessages(prev => [...prev, { type: 'self', sender: username, text }]);
  };
  const leaveChat = () => {
    socket.emit('leaveChat');
    setStatus('idle');
    setPartnerUsername(null);
    setMessages([]);
  };
  const findNewPartner = () => {
    socket.emit('leaveChat');
    findPartner();
  };
  const returnToLobby = () => {
    setStatus('idle');
    setPartnerUsername(null);
    setMessages([]);
  };
  
  const renderContent = () => {
    switch (status) {
      case 'connected': return <ChatWindow key="chat" messages={messages} username={username} partnerUsername={partnerUsername} onSendMessage={sendMessage} onLeave={leaveChat} onFindNew={findNewPartner} />;
      case 'searching': return <SearchingView key="searching" />;
      case 'partner_left': return <PartnerLeftView key="partner-left" partnerUsername={partnerUsername} onFindNew={findNewPartner} onReturnToLobby={returnToLobby} />;
      case 'idle': default: return <Lobby key="lobby" username={username} setUsername={setUsername} onFindPartner={findPartner} />;
    }
  };

  return (
    // This line will now work because sereneBlueTheme is imported correctly
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: sereneBlueTheme.palette.background }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
        <Paper elevation={0} sx={mainBoxStyles}>
          {renderContent()}
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}

export default App;