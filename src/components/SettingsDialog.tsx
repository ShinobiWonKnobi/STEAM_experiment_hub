import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  TextField,
  Switch,
  FormControlLabel,
  FormGroup,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useSettingsStore } from '../stores/settingsStore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const [tabValue, setTabValue] = useState(0);
  const settings = useSettingsStore();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    setTabValue(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Profile" />
            <Tab label="Notifications" />
            <Tab label="Privacy" />
            <Tab label="Theme" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <FormGroup>
            <TextField
              label="Display Name"
              value={settings.displayName}
              onChange={(e) => settings.updateProfile({ displayName: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              value={settings.email}
              onChange={(e) => settings.updateProfile({ email: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Institution"
              value={settings.institution}
              onChange={(e) => settings.updateProfile({ institution: e.target.value })}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select
                value={settings.role}
                label="Role"
                onChange={(e) => settings.updateProfile({ role: e.target.value })}
              >
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
                <MenuItem value="Researcher">Researcher</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.achievements}
                  onChange={(e) =>
                    settings.updateNotifications({ achievements: e.target.checked })
                  }
                />
              }
              label="Achievement Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.progress}
                  onChange={(e) =>
                    settings.updateNotifications({ progress: e.target.checked })
                  }
                />
              }
              label="Progress Updates"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.system}
                  onChange={(e) =>
                    settings.updateNotifications({ system: e.target.checked })
                  }
                />
              }
              label="System Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.email}
                  onChange={(e) =>
                    settings.updateNotifications({ email: e.target.checked })
                  }
                />
              }
              label="Email Notifications"
            />
          </FormGroup>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.privacy.publicProfile}
                  onChange={(e) =>
                    settings.updatePrivacy({ publicProfile: e.target.checked })
                  }
                />
              }
              label="Public Profile"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.privacy.shareProgress}
                  onChange={(e) =>
                    settings.updatePrivacy({ shareProgress: e.target.checked })
                  }
                />
              }
              label="Share Progress"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.privacy.shareAchievements}
                  onChange={(e) =>
                    settings.updatePrivacy({ shareAchievements: e.target.checked })
                  }
                />
              }
              label="Share Achievements"
            />
          </FormGroup>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <FormGroup>
            <FormControl fullWidth margin="normal">
              <InputLabel>Theme Mode</InputLabel>
              <Select
                value={settings.theme.mode}
                label="Theme Mode"
                onChange={(e) =>
                  settings.updateTheme({ mode: e.target.value as 'light' | 'dark' })
                }
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Primary Color"
              value={settings.theme.primaryColor}
              onChange={(e) => settings.updateTheme({ primaryColor: e.target.value })}
              fullWidth
              margin="normal"
              type="color"
            />
            <TextField
              label="Secondary Color"
              value={settings.theme.secondaryColor}
              onChange={(e) => settings.updateTheme({ secondaryColor: e.target.value })}
              fullWidth
              margin="normal"
              type="color"
            />
          </FormGroup>
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
} 