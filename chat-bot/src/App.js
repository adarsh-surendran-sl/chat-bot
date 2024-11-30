import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, Avatar, CircularProgress } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

function App() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const handleSendMessage = async () => {
    if (message.trim() && !loading) {
      setChatLog([...chatLog, { sender: 'user', text: message }]);
      setLoading(true);
      let payload = {
        message: message
      }
      try {
        const res = await fetch('https://b6b5sxqcpsr4jmnwi4xvttzdhu0ozduq.lambda-url.eu-north-1.on.aws/', {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json',
          // },
          body: JSON.stringify(payload),
        });
        setLoading(false);

        // if (!res.ok) {
        //   throw new Error(`HTTP error! status: ${res.status}`);
        // }

        const data = await res.json();
        console.log({ data })
        setChatLog((prev) => [
          ...prev,
          { sender: 'bot', text: data.message },
        ]);
        setLoading(false);
      } catch (err) {
        console.log({ err })
        // setError(err.message); // Save the error message
      }
      setMessage('');


      // setTimeout(() => {
      //   setChatLog((prev) => [
      //     ...prev,
      //     { sender: 'bot', text: `Response to: ${message}` },
      //   ]);
      //   setLoading(false);
      // }, 1500);

    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatLog]);

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Display Area */}
      <Box
        ref={chatBoxRef}
        sx={{
          flex: 1,
          p: 2,
          overflowY: 'auto',
          bgcolor: '#f5f5f5',
          borderRadius: '16px', // Rounded edges for chat container
          mb: 2,
        }}
      >
        {chatLog.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start',
              mb: 1,
            }}
          >
            {msg.sender === 'bot' && (
              <Avatar
                sx={{ bgcolor: '#e0e0e0', color: '#000', mr: 1 }}
              >
                <SmartToyIcon />
              </Avatar>
            )}
            <Box
              sx={{
                p: 1,
                borderRadius: '16px', // Rounded edges for message bubbles
                maxWidth: '75%',
                bgcolor: msg.sender === 'user' ? '#1976d2' : '#e0e0e0',
                color: msg.sender === 'user' ? '#fff' : '#000',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                textAlign: msg.sender === 'user' ? 'right' : 'left',
              }}
            >
              {msg.text}
            </Box>
            {msg.sender === 'user' && (
              <Avatar
                sx={{ bgcolor: '#1976d2', color: '#fff', ml: 1 }}
              >
                <PersonIcon />
              </Avatar>
            )}
          </Box>
        ))}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Avatar
              sx={{ bgcolor: '#e0e0e0', color: '#000', mr: 1 }}
            >
              <SmartToyIcon />
            </Avatar>
            <Typography
              variant="body1"
              sx={{
                p: 1,
                borderRadius: '16px', // Rounded edges for typing indicator
                maxWidth: '75%',
                bgcolor: '#e0e0e0',
                color: '#000',
              }}
            >
              Loading...
            </Typography>
          </Box>
        )}
      </Box>

      {/* Sticky Message Input Area */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          position: 'sticky',
          bottom: 0,
          bgcolor: '#fff',
          pb: 2,
          borderRadius: '16px', // Rounded edges for input area
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          maxRows={4}
          // disabled={loading}
          sx={{
            flex: 1,
            borderRadius: '16px', // Rounded input field
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px', // Ensure the outline is also rounded
            },
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            ml: 1,
            height: '100%',
            px: 2,
            borderRadius: '16px', // Rounded button
          }}
          onClick={handleSendMessage}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Send'}
        </Button>
      </Box>
    </Container>
  );
}

export default App;
