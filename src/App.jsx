import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Button, TextField, Container, Box, Typography, Paper } from '@mui/material';

const socket = io('http://localhost:3001'); // Connect to your backend Socket.IO server

// Header Component
const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 shadow-lg">
      <Container maxWidth="lg" className="flex justify-between items-center">
        <Typography variant="h5" component="h1" className="font-extrabold tracking-wider">
          Random Chat
        </Typography>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-purple-200 transition duration-300">Home</a></li>
            <li><a href="#" className="hover:text-purple-200 transition duration-300">About</a></li>
            <li><a href="#" className="hover:text-purple-200 transition duration-300">Contact</a></li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 p-6 mt-auto shadow-inner">
      <Container maxWidth="lg" className="text-center">
        <Typography variant="body2" className="mb-2">
          © {new Date().getFullYear()} Random Chat. All rights reserved.
        </Typography>
        <Typography variant="body2">
          Designed with <span className="text-red-500">❤️</span> using React & Tailwind CSS.
        </Typography>
      </Container>
    </footer>
  );
};

function App() {
  const [status, setStatus] = useState('idle'); // idle, searching, connected
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [partnerId, setPartnerId] = useState(null);
  const [username, setUsername] = useState(''); // New state for username
  const [partnerUsername, setPartnerUsername] = useState(null); // New state for partner's username

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('partnerFound', ({ id, partnerUsername }) => {
      setStatus('connected');
      setPartnerId(id);
      setPartnerUsername(partnerUsername); // Set partner's username
      setMessages([]); // Clear messages on new connection
      console.log('Partner found:', id, partnerUsername);
    });

    socket.on('message', ({ senderUsername, text }) => {
      setMessages((prevMessages) => [...prevMessages, { type: 'partner', sender: senderUsername, text: text }]);
    });

    socket.on('partnerLeft', () => {
      setStatus('idle');
      setPartnerId(null);
      setPartnerUsername(null); // Clear partner's username
      setMessages((prevMessages) => [...prevMessages, { type: 'system', text: 'Your partner has disconnected. Click "Find Partner" to connect with someone new.' }]);
      console.log('Partner left');
    });

    socket.on('disconnect', () => {
      setStatus('idle');
      setPartnerId(null);
      setPartnerUsername(null); // Clear partner's username
      setMessages((prevMessages) => [...prevMessages, { type: 'system', text: 'Disconnected from server.' }]);
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('partnerFound');
      socket.off('message');
      socket.off('partnerLeft');
      socket.off('disconnect');
    };
  }, []);

  const findPartner = () => {
    if (!username.trim()) {
      alert('Please enter a username.');
      return;
    }
    setStatus('searching');
    setMessages([]);
    socket.emit('findPartner', username); // Emit username with findPartner event
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() && status === 'connected') {
      socket.emit('sendMessage', messageInput, username);
      setMessages((prevMessages) => [...prevMessages, { type: 'self', sender: username, text: messageInput }]);
      setMessageInput('');
    }
  };

  const leaveChat = () => {
    socket.emit('leaveChat');
    setStatus('idle');
    setPartnerId(null);
    setPartnerUsername(null); // Clear partner's username
    setMessages((prevMessages) => [...prevMessages, { type: 'system', text: 'You have left the chat.' }]);
  };

  const findNewPartner = () => {
    leaveChat(); // First leave the current chat
    findPartner(); // Then find a new one
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center py-8 px-4">
        <Container
          maxWidth="sm"
          className="w-full flex flex-col items-center justify-center"
        >
          <Typography variant="h4" component="h1" gutterBottom className="mb-6 text-white font-bold">
            Random Chat
          </Typography>

          <Box className="w-full text-center mb-4">
            {status === 'idle' && (
              <>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username..."
                  className="mb-4 bg-gray-700 rounded-lg"
                  InputProps={{
                    className: 'text-white',
                    style: { color: 'white' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#4B5563', // gray-600
                      },
                      '&:hover fieldset': {
                        borderColor: '#6B7280', // gray-500
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3B82F6', // blue-500
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9CA3AF', // gray-400
                      opacity: 1, // For Firefox
                    },
                  }}
                />
                <Typography variant="body1" className="text-gray-400">
                  Click "Find Partner" to start chatting.
                </Typography>
              </>
            )}
            {status === 'searching' && (
              <Typography variant="body1" className="text-yellow-500 animate-pulse">
                Searching for a partner...
              </Typography>
            )}
            {status === 'connected' && (
              <Typography variant="body1" className="text-green-500">
                
              </Typography>
            )}
          </Box>

          {status === 'connected' && (
            <Paper
              elevation={6}
              className="w-full p-4 mb-4 bg-gray-800 rounded-lg shadow-xl flex flex-col"
              style={{ minHeight: '450px', maxHeight: '600px' }}
            >
              <Box className="flex-grow overflow-y-auto mb-4 p-2 border border-gray-700 rounded-md bg-gray-900 custom-scrollbar">
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    className={`mb-2 p-3 rounded-lg max-w-[75%] ${
                      msg.type === 'self'
                        ? 'bg-blue-600 ml-auto text-white rounded-br-none'
                        : msg.type === 'partner'
                        ? 'bg-gray-700 mr-auto text-white rounded-bl-none'
                        : 'bg-yellow-600 text-center text-white italic'
                    }`}
                  >
                    <Typography variant="body2">
                      {msg.type === 'self' ? username : msg.sender}: {msg.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <form onSubmit={sendMessage} className="flex gap-2">
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-gray-700 rounded-lg"
                  InputProps={{
                    className: 'text-white',
                    style: { color: 'white' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#4B5563', // gray-600
                      },
                      '&:hover fieldset': {
                        borderColor: '#6B7280', // gray-500
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3B82F6', // blue-500
                      },
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#9CA3AF', // gray-400
                      opacity: 1, // For Firefox
                    },
                  }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                  disabled={!messageInput.trim()}
                >
                  Send
                </Button>
              </form>
              <Button
                variant="outlined"
                color="secondary"
                onClick={leaveChat}
                className="mt-4 w-full border-red-500 text-red-500 hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                Leave Chat
              </Button>
            </Paper>
          )}

          {status === 'idle' && (
            <Button
              variant="contained"
              color="primary"
              onClick={findPartner}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transform hover:scale-105 transition duration-200"
              disabled={!username.trim()}
            >
              Find Partner
            </Button>
          )}

          {status === 'connected' && (
            <Button
              variant="contained"
              color="primary"
              onClick={findNewPartner}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md mt-4 transform hover:scale-105 transition duration-200"
            >
              Find New Partner
            </Button>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;