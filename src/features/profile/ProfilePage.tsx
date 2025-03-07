import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Avatar,
  Grid,
  Tabs,
  Tab,
  Divider,
  Button,
  useTheme,
  Chip,
  Card,
  CardContent,
  alpha,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import LockIcon from '@mui/icons-material/Lock';

// Simple TabPanel component
function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, index, value } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Hardcoded user data
const userData = {
  name: "Science Explorer",
  email: "student@example.com",
  institution: "Science Academy",
  role: "Student",
  avatar: "https://i.pravatar.cc/300?img=68",
  badges: [
    { id: 'first-experiment', name: 'First Experiment', description: 'Complete your first experiment', earned: true, imageUrl: 'https://img.icons8.com/fluency/96/test-tube.png' },
    { id: 'perfect-score', name: 'Perfect Score', description: 'Get 100% on any experiment', earned: false, imageUrl: 'https://img.icons8.com/fluency/96/prize.png' },
    { id: 'chemistry-whiz', name: 'Chemistry Whiz', description: 'Complete all chemistry experiments', earned: true, imageUrl: 'https://img.icons8.com/fluency/96/laboratory-flask.png' },
    { id: 'physics-master', name: 'Physics Master', description: 'Complete all physics experiments', earned: false, imageUrl: 'https://img.icons8.com/fluency/96/physics.png' },
    { id: 'biology-expert', name: 'Biology Expert', description: 'Complete all biology experiments', earned: true, imageUrl: 'https://img.icons8.com/fluency/96/dna-helix.png' },
    { id: 'science-explorer', name: 'Science Explorer', description: 'Complete experiments in 2 subjects', earned: true, imageUrl: 'https://img.icons8.com/fluency/96/microscope.png' },
    { id: 'quick-learner', name: 'Quick Learner', description: 'Complete any experiment in less than 10 minutes', earned: false, imageUrl: 'https://img.icons8.com/fluency/96/clock--v1.png' },
    { id: 'persistent-scientist', name: 'Persistent Scientist', description: 'Retry an experiment after failing it', earned: true, imageUrl: 'https://img.icons8.com/fluency/96/restart--v1.png' },
    { id: 'master-of-all', name: 'Master of All', description: 'Complete all available experiments', earned: false, imageUrl: 'https://img.icons8.com/fluency/96/graduation-cap.png' },
    { id: 'voice-commander', name: 'Voice Commander', description: 'Successfully use 5 different voice commands', earned: true, imageUrl: 'https://img.icons8.com/fluency/96/microphone.png' }
  ],
  experiments: [
    { id: 'acid-base', name: 'Acid-Base Titration', date: '2024-03-15', score: 85 },
    { id: 'pendulum', name: 'Pendulum Motion', date: '2024-03-10', score: 92 },
    { id: 'dna-extraction', name: 'DNA Extraction', date: '2024-02-28', score: 78 }
  ]
};

export default function ProfilePage() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Paper sx={{ mb: 4, overflow: 'hidden', borderRadius: 2, boxShadow: 3 }}>
        {/* Basic Info */}
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            src={userData.avatar}
            sx={{ width: 100, height: 100, border: `3px solid ${theme.palette.primary.main}` }}
          />
          <Box>
            <Typography variant="h4" gutterBottom>
              {userData.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {userData.email}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip icon={<SchoolIcon />} label={userData.institution} />
              <Chip icon={<PersonIcon />} label={userData.role} />
            </Box>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              fontWeight: 600,
              textTransform: 'none',
              minWidth: 120
            }
          }}
        >
          <Tab label="Badges" icon={<EmojiEventsIcon />} iconPosition="start" />
          <Tab label="Progress" icon={<BarChartIcon />} iconPosition="start" />
          <Tab label="History" icon={<HistoryIcon />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Your Badge Collection
          </Typography>
          <Divider />
        </Box>
        <Grid container spacing={3}>
          {userData.badges.map((badge) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={badge.id}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%', 
                  position: 'relative',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  },
                  bgcolor: badge.earned ? alpha(theme.palette.success.light, 0.1) : 'background.paper',
                  border: `1px solid ${badge.earned ? theme.palette.success.light : theme.palette.divider}`
                }}
              >
                {!badge.earned && (
                  <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <LockIcon color="disabled" />
                  </Box>
                )}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Avatar 
                    src={badge.imageUrl}
                    alt={badge.name}
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      margin: '0 auto',
                      filter: badge.earned ? 'none' : 'grayscale(100%)',
                      opacity: badge.earned ? 1 : 0.6
                    }} 
                  />
                </Box>
                <Typography variant="h6" gutterBottom align="center" sx={{ fontSize: '1.1rem' }}>
                  {badge.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2, height: '40px', overflow: 'hidden' }}>
                  {badge.description}
                </Typography>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Chip 
                    label={badge.earned ? 'Earned' : 'Locked'} 
                    color={badge.earned ? 'success' : 'default'} 
                    size="small" 
                    icon={badge.earned ? <EmojiEventsIcon /> : <LockIcon />}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 4, boxShadow: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Overall Progress
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Badge Progress
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ flexGrow: 1, mr: 2 }}>
                    <Box 
                      sx={{ 
                        height: 10, 
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                        borderRadius: 5,
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <Box 
                        sx={{ 
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: `${(userData.badges.filter(b => b.earned).length / userData.badges.length) * 100}%`,
                          bgcolor: theme.palette.primary.main,
                          borderRadius: 5
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {userData.badges.filter(b => b.earned).length} / {userData.badges.length}
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="h6" gutterBottom>
                  Experiment Progress
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1, mr: 2 }}>
                    <Box 
                      sx={{ 
                        height: 10, 
                        bgcolor: alpha(theme.palette.success.main, 0.2),
                        borderRadius: 5,
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <Box 
                        sx={{ 
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: `${(userData.experiments.length / 5) * 100}%`,
                          bgcolor: theme.palette.success.main,
                          borderRadius: 5
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {userData.experiments.length} / 5
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Recent Achievements
              </Typography>
              <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05), borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Earned the "Science Explorer" badge
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ScienceIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Completed "Pendulum Motion" experiment with 92% score
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    Earned the "Persistent Scientist" badge
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Experiment History
          </Typography>
          <Divider />
        </Box>
        <Grid container spacing={3}>
          {userData.experiments.map((experiment) => (
            <Grid item xs={12} key={experiment.id}>
              <Card sx={{ 
                boxShadow: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}>
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ScienceIcon sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h6">
                          {experiment.name}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Date
                      </Typography>
                      <Typography variant="body1">
                        {experiment.date}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Score
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontWeight: 'bold',
                        color: experiment.score >= 90 ? 'success.main' : 
                               experiment.score >= 70 ? 'primary.main' : 
                               'warning.main'
                      }}>
                        {experiment.score}%
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Back to Dashboard Button */}
      <Box sx={{ mt: 4 }}>
        <Button
          component={RouterLink}
          to="/dashboard"
          variant="contained"
          color="primary"
          startIcon={<ScienceIcon />}
          sx={{ px: 3, py: 1.5 }}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
} 