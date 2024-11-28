// src/App.js
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';

function App() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message to the chat log
      setChatLog([...chatLog, { sender: 'user', text: message }]);

      // Simulate receiving a response
      setTimeout(() => {
        setChatLog((prev) => [
          ...prev,
          { sender: 'bot', text: `Response to: ${message}` }
        ]);
      }, 500);

      // Clear the input field
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Chat Display Area */}
        <Box sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: '#f5f5f5', borderRadius: 1, mb: 2 }}>
          {chatLog.map((msg, index) => (
            <Typography
              key={index}
              variant="body1"
              align={msg.sender === 'user' ? 'right' : 'left'}
              sx={{
                my: 1,
                p: 1,
                borderRadius: 1,
                bgcolor: msg.sender === 'user' ? '#1976d2' : '#e0e0e0',
                color: msg.sender === 'user' ? '#fff' : '#000'
              }}
            >
              {msg.text}
            </Typography>
          ))}
        </Box>

        {/* Message Input Area */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 1 }}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default App;

