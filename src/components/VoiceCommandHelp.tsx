import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  LinearProgress,
  Tooltip,
  IconButton,
  Fade,
  alpha,
  Badge,
  Alert,
  AlertTitle,
  Chip,
  Zoom,
  Paper,
  Divider,
  useTheme,
  Slide,
  Grow
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { TransitionProps } from '@mui/material/transitions';
import type { VoiceCommand } from '../types';
import { useVoiceCommands } from '../hooks/useVoiceCommands';
import { useGamificationStore } from '../stores/gamificationStore';

interface VoiceCommandHelpProps {
  commands: VoiceCommand[];
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VoiceCommandHelp: React.FC<VoiceCommandHelpProps> = ({ commands }) => {
  const [open, setOpen] = useState(false);
  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  const [showPulse, setShowPulse] = useState(false);
  const theme = useTheme();
  
  const { 
    uniqueCommandsUsed, 
    listening, 
    toggleListening, 
    microphonePermission,
    error,
    transcript,
    browserSupportsSpeechRecognition
  } = useVoiceCommands();
  
  const badges = useGamificationStore(state => state.badges);
  const voiceBadge = badges.find(b => b.id === 'voice-master');

  // Simulate speech recognition by highlighting the command that matches the transcript
  useEffect(() => {
    if (transcript && listening) {
      const lowerTranscript = transcript.toLowerCase();
      const matchedCommand = commands.find(cmd => 
        lowerTranscript.includes(cmd.command.toLowerCase())
      );
      
      if (matchedCommand) {
        setActiveCommand(matchedCommand.command);
        
        // Clear the active command after a delay
        setTimeout(() => {
          setActiveCommand(null);
        }, 2000);
      }
    }
  }, [transcript, commands, listening]);

  // Pulse animation for the microphone icon when listening
  useEffect(() => {
    if (listening) {
      const interval = setInterval(() => {
        setShowPulse(prev => !prev);
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setShowPulse(false);
    }
  }, [listening]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const progress = (uniqueCommandsUsed.size / 5) * 100;

  const getMicrophoneStatus = () => {
    if (error) {
      return {
        color: 'error',
        icon: <MicOffIcon />,
        tooltip: error
      };
    }

    if (!browserSupportsSpeechRecognition) {
      return {
        color: 'error',
        icon: <MicOffIcon />,
        tooltip: 'Browser does not support speech recognition'
      };
    }

    if (microphonePermission === 'denied') {
      return {
        color: 'error',
        icon: <MicOffIcon />,
        tooltip: 'Microphone access denied'
      };
    }

    return {
      color: listening ? 'success' : 'primary',
      icon: <MicIcon />,
      tooltip: listening ? 'Voice recognition active' : 'Click to enable voice commands'
    };
  };

  const status = getMicrophoneStatus();

  return (
    <>
      <Tooltip title={status.tooltip}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          badgeContent={
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: `${status.color}.main`,
                boxShadow: '0 0 0 2px #fff',
                animation: listening ? 'pulse 1.5s infinite' : 'none',
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: `0 0 0 0 ${alpha(theme.palette[status.color as 'success' | 'primary' | 'error'].main, 0.7)}`
                  },
                  '70%': {
                    boxShadow: `0 0 0 10px ${alpha(theme.palette[status.color as 'success' | 'primary' | 'error'].main, 0)}`
                  },
                  '100%': {
                    boxShadow: `0 0 0 0 ${alpha(theme.palette[status.color as 'success' | 'primary' | 'error'].main, 0)}`
                  }
                }
              }}
            />
          }
        >
          <Box sx={{ position: 'relative' }}>
            <IconButton
              aria-label="Open voice command help"
              aria-controls={open ? 'voice-command-dialog' : undefined}
              aria-expanded={open}
              aria-haspopup="true"
              onClick={handleOpen}
              sx={{
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                },
                transition: 'all 0.2s ease',
              }}
            >
              {status.icon}
            </IconButton>
            
            {showPulse && listening && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '50%',
                  animation: 'ripple 1.5s infinite ease-in-out',
                  border: `2px solid ${theme.palette.success.main}`,
                  '@keyframes ripple': {
                    '0%': {
                      transform: 'scale(0.8)',
                      opacity: 1,
                    },
                    '100%': {
                      transform: 'scale(2.4)',
                      opacity: 0,
                    }
                  }
                }}
              />
            )}
          </Box>
        </Badge>
      </Tooltip>
      
      <Dialog 
        open={open} 
        onClose={handleClose}
        aria-labelledby="voice-command-dialog-title"
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.98)} 100%)`,
            backdropFilter: 'blur(10px)',
            overflow: 'hidden',
          }
        }}
      >
        <Box sx={{ 
          position: 'relative', 
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          }
        }}>
          <DialogTitle 
            id="voice-command-dialog-title"
            sx={{
              pb: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '& .MuiTypography-root': {
                fontWeight: 600,
              }
            }}
          >
            <RecordVoiceOverIcon color="primary" />
            Voice Commands
            {voiceBadge?.earned && (
              <Chip 
                size="small" 
                color="success" 
                label="Badge Earned" 
                icon={<CheckCircleOutlineIcon />} 
                sx={{ ml: 'auto' }}
              />
            )}
          </DialogTitle>
          
          <DialogContent>
            {error ? (
              <Alert 
                severity="error" 
                sx={{ mb: 3 }}
                action={
                  microphonePermission === 'denied' && (
                    <Button 
                      color="inherit" 
                      size="small"
                      onClick={() => {
                        toggleListening();
                        handleClose();
                      }}
                    >
                      Enable Microphone
                    </Button>
                  )
                }
              >
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            ) : (
              <Box sx={{ mb: 3 }}>
                <Typography 
                  paragraph
                  color="text.secondary"
                >
                  Speak these commands clearly to control the experiment:
                </Typography>
                <Button
                  variant={listening ? "contained" : "outlined"}
                  color={listening ? "success" : "primary"}
                  startIcon={listening ? <MicIcon /> : <MicOffIcon />}
                  onClick={() => toggleListening()}
                  sx={{ 
                    mb: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': listening ? {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `radial-gradient(circle, ${alpha(theme.palette.success.main, 0.2)} 0%, transparent 70%)`,
                      animation: 'pulse-bg 2s infinite',
                    } : {},
                    '@keyframes pulse-bg': {
                      '0%': { opacity: 0.6 },
                      '50%': { opacity: 1 },
                      '100%': { opacity: 0.6 }
                    }
                  }}
                >
                  {listening ? 'Voice Recognition Active' : 'Enable Voice Recognition'}
                </Button>
                
                {listening && (
                  <Fade in={listening}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 1.5, 
                        mb: 2, 
                        bgcolor: alpha(theme.palette.info.main, 0.1),
                        border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <VolumeUpIcon color="info" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {transcript ? `"${transcript}"` : 'Listening for commands...'}
                      </Typography>
                    </Paper>
                  </Fade>
                )}
              </Box>
            )}

            <List sx={{ mb: 3 }}>
              {commands.map((cmd, index) => {
                const isActive = activeCommand === cmd.command;
                const isUsed = uniqueCommandsUsed.has(cmd.command);
                
                return (
                  <Grow 
                    key={cmd.command} 
                    in={true} 
                    style={{ transformOrigin: '0 0 0' }}
                    timeout={300 + index * 100}
                  >
                    <ListItem 
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        bgcolor: isActive 
                          ? alpha(theme.palette.success.main, 0.2)
                          : isUsed 
                            ? alpha(theme.palette.success.main, 0.1)
                            : alpha(theme.palette.background.paper, 0.6),
                        border: `1px solid ${
                          isActive 
                            ? alpha(theme.palette.success.main, 0.5)
                            : isUsed 
                              ? alpha(theme.palette.success.main, 0.2)
                              : alpha(theme.palette.divider, 1)
                        }`,
                        transition: 'all 0.3s ease',
                        transform: isActive ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: isActive ? `0 4px 12px ${alpha(theme.palette.success.main, 0.2)}` : 'none',
                      }}
                    >
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                              sx={{
                                fontWeight: 500,
                                color: isActive 
                                  ? 'success.main' 
                                  : isUsed 
                                    ? 'success.dark' 
                                    : 'text.primary'
                              }}
                            >
                              "{cmd.command}"
                            </Typography>
                            {isUsed && (
                              <Chip 
                                size="small" 
                                label="Used" 
                                color="success" 
                                sx={{ ml: 1, height: 20 }}
                              />
                            )}
                          </Box>
                        } 
                        secondary={cmd.description}
                        sx={{
                          '& .MuiListItemText-secondary': {
                            color: isActive ? 'text.primary' : 'text.secondary'
                          }
                        }}
                      />
                    </ListItem>
                  </Grow>
                );
              })}
            </List>
            
            <Divider sx={{ mb: 3 }} />
            
            <Box 
              sx={{ 
                p: 2,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ fontWeight: 600 }}
                >
                  Voice Commander Badge Progress
                </Typography>
                <Tooltip title="Use 5 different voice commands to earn this badge">
                  <IconButton size="small" sx={{ ml: 0.5 }}>
                    <HelpOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ flexGrow: 1, mr: 1 }}>
                  <Tooltip title={`${uniqueCommandsUsed.size} of 5 unique commands used`}>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress}
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        }
                      }}
                    />
                  </Tooltip>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {uniqueCommandsUsed.size}/5
                </Typography>
              </Box>
              
              {voiceBadge?.earned ? (
                <Alert 
                  severity="success" 
                  icon={<CheckCircleOutlineIcon />}
                  sx={{ 
                    mt: 2,
                    '& .MuiAlert-message': { 
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }}
                >
                  <Typography variant="body2">
                    Congratulations! You've earned the Voice Commander badge.
                  </Typography>
                  <Chip 
                    size="small" 
                    label="Badge Earned!" 
                    color="primary"
                    sx={{ ml: 1 }}
                  />
                </Alert>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {uniqueCommandsUsed.size >= 5 
                    ? "You've used 5 commands! Badge will be awarded soon."
                    : `Use ${5 - uniqueCommandsUsed.size} more unique commands to earn the Voice Commander badge.`}
                </Typography>
              )}
            </Box>
          </DialogContent>
          
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default VoiceCommandHelp; 