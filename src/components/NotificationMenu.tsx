import React from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  Badge,
  Typography,
  Box,
  Tooltip,
  Divider,
  Button,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import { useNotificationStore, type Notification } from '../stores/notificationStore';
import { formatDistanceToNow } from 'date-fns';

const NotificationMenu: React.FC = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
  } = useNotificationStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (unreadCount > 0) {
      markAllAsRead();
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'achievement':
        return <EmojiEventsIcon color="warning" />;
      case 'info':
        return <InfoIcon color="info" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <InfoIcon />;
    }
  };

  return (
    <>
      <Tooltip title={unreadCount > 0 ? `${unreadCount} new notifications` : 'Notifications'}>
        <IconButton
          onClick={handleClick}
          size="large"
          aria-label="show notifications"
          color="inherit"
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="notifications-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 3,
          sx: {
            width: 360,
            maxHeight: '80vh',
            overflow: 'auto',
            mt: 1.5,
            '&::-webkit-scrollbar': {
              width: 8,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.divider,
              borderRadius: 4,
            },
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          <Box>
            <Tooltip title="Mark all as read">
              <IconButton size="small" onClick={markAllAsRead} sx={{ mr: 1 }}>
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Clear all">
              <IconButton size="small" onClick={clearAllNotifications}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Divider />

        {notifications.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">No notifications</Typography>
          </Box>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              sx={{
                py: 2,
                px: 3,
                borderLeft: 4,
                borderColor: notification.read
                  ? 'transparent'
                  : 'primary.main',
                bgcolor: (theme) =>
                  notification.read
                    ? 'transparent'
                    : alpha(theme.palette.primary.main, 0.04),
                '&:hover': {
                  bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <ListItemIcon>{getNotificationIcon(notification.type)}</ListItemIcon>
              <ListItemText
                primary={notification.title}
                secondary={
                  <>
                    {notification.message}
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ display: 'block', mt: 0.5, color: 'text.disabled' }}
                    >
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </Typography>
                  </>
                }
                sx={{
                  my: 0,
                  '& .MuiTypography-root': {
                    color: notification.read ? 'text.secondary' : 'text.primary',
                  },
                }}
              />
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  clearNotification(notification.id);
                }}
                sx={{ ml: 1 }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </MenuItem>
          ))
        )}

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            startIcon={<SettingsIcon />}
            onClick={handleClose}
            component="a"
            href="/profile?tab=notifications"
          >
            Notification Settings
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationMenu; 