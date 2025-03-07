import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import ScienceIcon from '@mui/icons-material/Science';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';
import NotificationMenu from './NotificationMenu';
import SettingsDialog from './SettingsDialog';
import AccessibilityMenu from './AccessibilityMenu';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();
  
  const { displayName, avatar } = useSettingsStore();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
    handleProfileMenuClose();
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 700,
            }}
          >
            <ScienceIcon sx={{ mr: 1 }} />
            STEAM Experiment Hub
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <Button
              component={RouterLink}
              to="/"
              color={isActive('/') ? 'primary' : 'inherit'}
              sx={{ mx: 1 }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/dashboard"
              color={isActive('/dashboard') ? 'primary' : 'inherit'}
              sx={{ mx: 1 }}
            >
              Experiments
            </Button>
            <Button
              component={RouterLink}
              to="/accessibility"
              color={isActive('/accessibility') ? 'primary' : 'inherit'}
              sx={{ mx: 1 }}
            >
              Accessibility
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessibilityMenu />
            <NotificationMenu />

            <IconButton
              onClick={handleSettingsOpen}
              color="inherit"
              aria-label="settings"
            >
              <SettingsIcon />
            </IconButton>

            <IconButton
              onClick={handleProfileMenuOpen}
              color="inherit"
              aria-label="account"
              sx={{ ml: 1 }}
            >
              <Avatar 
                src={avatar} 
                alt={displayName}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={RouterLink} to="/profile" onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem onClick={handleSettingsOpen}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <Divider />
        <MenuItem component={RouterLink} to="/" onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ScienceIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              STEAM Hub
            </Typography>
            <IconButton 
              sx={{ ml: 'auto' }} 
              onClick={handleDrawerToggle}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <List>
            <ListItem 
              button 
              component={RouterLink} 
              to="/" 
              selected={isActive('/')}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            
            <ListItem 
              button 
              component={RouterLink} 
              to="/dashboard" 
              selected={isActive('/dashboard')}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Experiments" />
            </ListItem>
            
            <ListItem 
              button 
              component={RouterLink} 
              to="/profile" 
              selected={isActive('/profile')}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            
            <ListItem 
              button 
              component={RouterLink} 
              to="/accessibility" 
              selected={isActive('/accessibility')}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Accessibility" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <SettingsDialog
        open={settingsOpen}
        onClose={handleSettingsClose}
      />
    </>
  );
};

export default Header; 