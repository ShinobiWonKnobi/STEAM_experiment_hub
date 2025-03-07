import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Fab,
  Zoom,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  useTheme,
  alpha,
  CircularProgress,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { format } from 'date-fns';
import { ChatMessage } from '../types';

// Sample responses for different types of questions
const getBotResponse = (message: string): Promise<string> => {
  // Convert message to lowercase for easier matching
  const lowerMessage = message.toLowerCase();
  
  // Simulate network delay
  return new Promise((resolve, reject) => {
    // Simulate random network errors (1% chance)
    if (Math.random() < 0.01) {
      setTimeout(() => reject(new Error('Network error')), 1000);
      return;
    }
    
    setTimeout(() => {
      try {
        // Experiment-related questions
        if (lowerMessage.includes('titration') || lowerMessage.includes('acid') || lowerMessage.includes('base')) {
          resolve("Acid-base titration is a method to determine the concentration of an acid or base by neutralizing it with a base or acid of known concentration. In our virtual lab, you can practice this by adding a base to an acid solution until the indicator changes color.");
        }
        // Pendulum-related questions
        else if (lowerMessage.includes('pendulum') || lowerMessage.includes('period') || lowerMessage.includes('swing')) {
          resolve("The pendulum experiment demonstrates simple harmonic motion. The period of a pendulum depends on its length and the acceleration due to gravity. You can adjust these parameters in our virtual lab to see how they affect the pendulum's motion.");
        }
        // Badge-related questions
        else if (lowerMessage.includes('badge') || lowerMessage.includes('achievement')) {
          resolve("Badges are awarded for completing experiments and reaching milestones. You can view your earned badges in your profile page. Some badges are earned by completing specific experiments, while others require consistent usage of the platform.");
        }
        // Voice command questions
        else if (lowerMessage.includes('voice') || lowerMessage.includes('command') || lowerMessage.includes('speak')) {
          resolve("Our platform supports voice commands for hands-free operation. You can activate voice commands by clicking the microphone icon. Try saying commands like 'start experiment', 'reset', or 'help' during an experiment.");
        }
        // Accessibility questions
        else if (lowerMessage.includes('accessibility') || lowerMessage.includes('disability') || lowerMessage.includes('dyslexia')) {
          resolve("We offer various accessibility features including high contrast mode, dyslexia-friendly fonts, screen reader optimization, and keyboard navigation enhancements. You can access these settings from the accessibility menu in the header.");
        }
        // General help
        else {
          resolve("I'm your STEAM Experiment Hub assistant. I can help with questions about experiments, badges, voice commands, and accessibility features. If you're stuck, try asking about a specific experiment or feature!");
        }
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};

// Memoized message component for better performance
const ChatMessageItem = memo(({ message }: { message: ChatMessage }) => {
  const theme = useTheme();
  
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
        mb: 2,
      }}
    >
      <ListItemAvatar sx={{ minWidth: 40 }}>
        <Avatar
          sx={{
            bgcolor: message.sender === 'user' ? 'secondary.main' : 'primary.main',
            width: 32,
            height: 32,
          }}
        >
          {message.sender === 'user' ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Paper
            elevation={0}
            sx={{
              p: 1.5,
              borderRadius: 2,
              maxWidth: '80%',
              display: 'inline-block',
              bgcolor: message.sender === 'user' 
                ? alpha(theme.palette.secondary.main, 0.1)
                : alpha(theme.palette.primary.main, 0.1),
              border: `1px solid ${
                message.sender === 'user'
                  ? alpha(theme.palette.secondary.main, 0.2)
                  : alpha(theme.palette.primary.main, 0.2)
              }`,
            }}
          >
            <Typography variant="body2">{message.text}</Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mt: 0.5, textAlign: 'right' }}
            >
              {format(message.timestamp, 'h:mm a')}
            </Typography>
          </Paper>
        }
        sx={{
          m: 0,
          textAlign: message.sender === 'user' ? 'right' : 'left',
        }}
      />
    </ListItem>
  );
});

ChatMessageItem.displayName = 'ChatMessageItem';

const ChatbotInterface: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi there! I'm your STEAM Experiment Hub assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [open]);

  const toggleChat = useCallback(() => {
    setOpen(prev => !prev);
    // Clear error when opening chat
    if (!open) {
      setError(null);
    }
  }, [open]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setError(null);

    // Get bot response
    try {
      const response = await getBotResponse(userMessage.text);
      
      // Add bot message
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Handle error
      console.error('Chatbot error:', error);
      
      setError(
        error instanceof Error 
          ? error.message 
          : 'Sorry, I encountered an unexpected error. Please try again.'
      );
    } finally {
      setIsTyping(false);
    }
  }, [inputValue]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <>
      {/* Floating chat button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Fab
          color="primary"
          aria-label="chat"
          onClick={toggleChat}
          sx={{
            boxShadow: theme.shadows[8],
          }}
        >
          <ChatIcon />
        </Fab>
      </Box>

      {/* Chat interface */}
      <Zoom in={open}>
        <Paper
          elevation={6}
          sx={{
            position: 'fixed',
            bottom: 80,
            right: 20,
            width: { xs: 'calc(100% - 40px)', sm: 400 },
            height: 500,
            maxHeight: 'calc(100vh - 120px)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          {/* Chat header */}
          <Box
            sx={{
              p: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SmartToyIcon sx={{ mr: 1 }} />
              <Typography variant="h6">STEAM Assistant</Typography>
            </Box>
            <IconButton
              size="small"
              edge="end"
              color="inherit"
              onClick={toggleChat}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Error message */}
          {error && (
            <Alert 
              severity="error" 
              onClose={() => setError(null)}
              sx={{ m: 1 }}
            >
              {error}
            </Alert>
          )}

          {/* Chat messages */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              bgcolor: alpha(theme.palette.background.default, 0.7),
            }}
            ref={listRef}
          >
            <List component="div">
              {messages.map((message) => (
                <ChatMessageItem key={message.id} message={message} />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <ListItem alignItems="flex-start">
                  <ListItemAvatar sx={{ minWidth: 40 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 32,
                        height: 32,
                      }}
                    >
                      <SmartToyIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Paper
                        elevation={0}
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          display: 'inline-block',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CircularProgress size={16} thickness={6} sx={{ mr: 1 }} />
                          <Typography variant="body2">Typing...</Typography>
                        </Box>
                      </Paper>
                    }
                  />
                </ListItem>
              )}
            </List>
            <Box ref={messagesEndRef} />
          </Box>

          <Divider />

          {/* Chat input */}
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              bgcolor: theme.palette.background.paper,
            }}
          >
            <TextField
              fullWidth
              placeholder="Ask a question..."
              variant="outlined"
              size="small"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              inputRef={inputRef}
              disabled={isTyping}
              sx={{
                mr: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={inputValue.trim() === '' || isTyping}
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Zoom>
    </>
  );
};

export default memo(ChatbotInterface); 