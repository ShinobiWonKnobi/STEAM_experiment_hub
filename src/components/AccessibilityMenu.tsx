import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Switch,
  Divider,
  Button,
  Box,
  Tooltip,
} from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ContrastIcon from '@mui/icons-material/Contrast';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import AnimationIcon from '@mui/icons-material/Animation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import HearingIcon from '@mui/icons-material/Hearing';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VideocamIcon from '@mui/icons-material/Videocam';
import TranslateIcon from '@mui/icons-material/Translate';
import WarningIcon from '@mui/icons-material/Warning';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useAccessibilityStore } from '../stores/accessibilityStore';

const AccessibilityMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const {
    highContrast,
    largeText,
    reducedMotion,
    colorBlindMode,
    dyslexiaFriendlyFont,
    screenReaderOptimized,
    keyboardNavigationEnhanced,
    autoplayVideos,
    simplifiedLanguage,
    contentWarnings,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleColorBlindMode,
    toggleDyslexiaFriendlyFont,
    toggleScreenReaderOptimized,
    toggleKeyboardNavigationEnhanced,
    toggleAutoplayVideos,
    toggleSimplifiedLanguage,
    toggleContentWarnings,
    resetToDefaults,
  } = useAccessibilityStore();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Accessibility Options">
        <IconButton
          onClick={handleClick}
          size="large"
          aria-controls={open ? 'accessibility-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          aria-label="accessibility options"
          color="inherit"
        >
          <AccessibilityNewIcon />
        </IconButton>
      </Tooltip>
      
      <Menu
        id="accessibility-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'accessibility-button',
          dense: true,
        }}
        PaperProps={{
          style: {
            maxHeight: '80vh',
            width: '320px',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h6" component="div">
            Accessibility Options
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Customize your experience to make it more accessible
          </Typography>
        </Box>
        
        <Divider />
        
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Visual Preferences
          </Typography>
        </Box>
        
        <MenuItem>
          <ListItemIcon>
            <ContrastIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText id="high-contrast-switch-label" primary="High Contrast" />
          <Switch
            edge="end"
            checked={highContrast}
            onChange={toggleHighContrast}
            inputProps={{
              'aria-labelledby': 'high-contrast-switch-label',
            }}
          />
        </MenuItem>
        
        <MenuItem>
          <ListItemIcon>
            <TextIncreaseIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText id="large-text-switch-label" primary="Large Text" />
          <Switch
            edge="end"
            checked={largeText}
            onChange={toggleLargeText}
            inputProps={{
              'aria-labelledby': 'large-text-switch-label',
            }}
          />
        </MenuItem>
        
        <MenuItem>
          <ListItemIcon>
            <AnimationIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText id="reduced-motion-switch-label" primary="Reduced Motion" />
          <Switch
            edge="end"
            checked={reducedMotion}
            onChange={toggleReducedMotion}
            inputProps={{
              'aria-labelledby': 'reduced-motion-switch-label',
            }}
          />
        </MenuItem>
        
        <MenuItem>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText id="color-blind-switch-label" primary="Color Blind Mode" />
          <Switch
            edge="end"
            checked={colorBlindMode}
            onChange={toggleColorBlindMode}
            inputProps={{
              'aria-labelledby': 'color-blind-switch-label',
            }}
          />
        </MenuItem>
        
        <MenuItem>
          <ListItemIcon>
            <FontDownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText id="dyslexia-font-switch-label" primary="Dyslexia-Friendly Font" />
          <Switch
            edge="end"
            checked={dyslexiaFriendlyFont}
            onChange={toggleDyslexiaFriendlyFont}
            inputProps={{
              'aria-labelledby': 'dyslexia-font-switch-label',
            }}
          />
        </MenuItem>
        
        <Divider />
        
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Audio & Interaction
          </Typography>
        </Box>
        
        <MenuItem>
          <ListItemIcon>
            <HearingIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText id="screen-reader-switch-label" primary="Screen Reader Optimized" />
          <Switch
            edge="end"
            checked={screenReaderOptimized}
            onChange={toggleScreenReaderOptimized}
            inputProps={{
              'aria-labelledby': 'screen-reader-switch-label',
            }}
          />
        </MenuItem>
        
        <MenuItem>
          <ListItemIcon>
            <KeyboardIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText id="keyboard-nav-switch-label" primary="Enhanced Keyboard Navigation" />
          <Switch
            edge="end"
            checked={keyboardNavigationEnhanced}
            onChange={toggleKeyboardNavigationEnhanced}
            inputProps={{
              'aria-labelledby': 'keyboard-nav-switch-label',
            }}
          />
        </MenuItem>
        
        <MenuItem>
          <ListItemIcon>
            <VideocamIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText id="autoplay-videos-switch-label" primary="Autoplay Videos" />
          <Switch
            edge="end"
            checked={autoplayVideos}
            onChange={toggleAutoplayVideos}
            inputProps={{
              'aria-labelledby': 'autoplay-videos-switch-label',
            }}
          />
        </MenuItem>
        
        <Divider />
        
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Content Preferences
          </Typography>
        </Box>
        
        <MenuItem>
          <ListItemIcon>
            <TranslateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText id="simplified-language-switch-label" primary="Simplified Language" />
          <Switch
            edge="end"
            checked={simplifiedLanguage}
            onChange={toggleSimplifiedLanguage}
            inputProps={{
              'aria-labelledby': 'simplified-language-switch-label',
            }}
          />
        </MenuItem>
        
        <MenuItem>
          <ListItemIcon>
            <WarningIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText id="content-warnings-switch-label" primary="Content Warnings" />
          <Switch
            edge="end"
            checked={contentWarnings}
            onChange={toggleContentWarnings}
            inputProps={{
              'aria-labelledby': 'content-warnings-switch-label',
            }}
          />
        </MenuItem>
        
        <Divider />
        
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
          <Button 
            startIcon={<RestartAltIcon />} 
            onClick={() => {
              resetToDefaults();
              handleClose();
            }}
            color="primary"
            variant="outlined"
            size="small"
          >
            Reset to Defaults
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default AccessibilityMenu; 