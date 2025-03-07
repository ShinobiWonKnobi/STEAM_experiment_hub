import React, { Suspense } from 'react';
import { 
  Typography, 
  Box, 
  Grid,
  Paper,
  Divider,
  useTheme,
  CircularProgress,
  Container,
  Chip,
  alpha,
  Button
} from '@mui/material';
import { useGamificationStore } from '../../stores/gamificationStore';
import { useAsync } from '../../hooks/useAsync';
import { api, mockApi } from '../../services/api';
import ErrorBoundary from '../../components/ErrorBoundary';
import ScienceIcon from '@mui/icons-material/Science';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import { Link as RouterLink } from 'react-router-dom';

// Lazy load components
const ExperimentList = React.lazy(() => import('../experiments/ExperimentList'));
const ProgressTracker = React.lazy(() => import('../../components/ProgressTracker'));
const BadgeDisplay = React.lazy(() => import('../../components/BadgeDisplay'));

// Loading fallback
const ComponentLoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
    <CircularProgress />
  </Box>
);

/**
 * ExperimentDashboard component displays available experiments, progress, and badges
 */
const ExperimentDashboard: React.FC = () => {
  const theme = useTheme();
  
  // Get data from store
  const badges = useGamificationStore((state) => state.badges);
  const earnedBadges = useGamificationStore((state) => state.getEarnedBadges());
  const completedExperiments = useGamificationStore((state) => state.getCompletedExperiments());

  return (
    <ErrorBoundary>
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          {/* Hero Section */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 5 }, 
              mb: 5, 
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: { xs: '100%', md: '40%' }, 
                height: '100%',
                opacity: 0.1,
                background: 'url(https://images.unsplash.com/photo-1532094349884-543bc11b234d) no-repeat center center',
                backgroundSize: 'cover',
                display: { xs: 'none', md: 'block' }
              }} 
            />
            
            <Box sx={{ position: 'relative', zIndex: 1, maxWidth: { xs: '100%', md: '60%' } }}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 800,
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Experiment Dashboard
              </Typography>
              
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Welcome to your personalized dashboard. Explore experiments, track your progress, and earn badges as you learn.
              </Typography>
              
              <Grid container spacing={4} sx={{ mt: 3 }}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <ScienceIcon sx={{ fontSize: 48, color: theme.palette.success.main, mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.success.main }}>
                      {completedExperiments}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Experiments Completed
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <EmojiEventsIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                      {earnedBadges.length}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Badges Earned
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <SchoolIcon sx={{ fontSize: 48, color: theme.palette.secondary.main, mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}>
                      {Math.round((completedExperiments / 3) * 100)}%
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Overall Progress
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          
          <Grid container spacing={5}>
            {/* Main Content - Experiments */}
            <Grid item xs={12} md={8}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  borderRadius: 3,
                  mb: 5,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{ fontWeight: 600 }}
                  >
        Available Experiments
      </Typography>
      
                  <Chip 
                    icon={<ScienceIcon />} 
                    label={`${completedExperiments} of 3 completed`}
                    color="primary"
                    variant="outlined"
                    sx={{ px: 1 }}
                  />
                </Box>
                <Divider sx={{ mb: 4 }} />
                
                <Suspense fallback={<ComponentLoadingFallback />}>
                  <ExperimentList />
                </Suspense>
              </Paper>
              
              {/* Progress Tracker */}
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 3 }}
                >
                  Your Learning Journey
                </Typography>
                <Divider sx={{ mb: 4 }} />
                
                <Suspense fallback={<ComponentLoadingFallback />}>
                  <ProgressTracker />
                </Suspense>
              </Paper>
            </Grid>
            
            {/* Sidebar - Badges and Stats */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 100 }}>
                {/* Recent Badges */}
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    borderRadius: 3,
                    mb: 5,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      sx={{ fontWeight: 600 }}
                    >
                      Recent Badges
                    </Typography>
                    
                    <Chip 
                      icon={<EmojiEventsIcon />} 
                      label={`${earnedBadges.length} of ${badges.length}`}
                      color="primary"
                      variant="outlined"
                      sx={{ px: 1 }}
                    />
                  </Box>
                  <Divider sx={{ mb: 4 }} />
                  
                  <Suspense fallback={<ComponentLoadingFallback />}>
                    <BadgeDisplay limit={3} />
                  </Suspense>
                  
                  {earnedBadges.length > 3 && (
                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                      <Button 
                        component={RouterLink} 
                        to="/profile" 
                        variant="outlined" 
                        size="medium"
                        endIcon={<EmojiEventsIcon />}
                        sx={{ px: 3 }}
                      >
                        View All Badges
                      </Button>
                    </Box>
                  )}
                </Paper>
                
                {/* Badge Progress */}
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                  }}
                >
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 3 }}
                  >
                    Badge Progress
                  </Typography>
                  <Divider sx={{ mb: 4 }} />
                  
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 2 }}>
                      {Math.round((earnedBadges.length / badges.length) * 100)}%
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 3 }}>
                      of badges earned
                    </Typography>
                    
                    <Typography variant="body1" sx={{ mt: 3, mb: 4 }}>
                      {earnedBadges.length === 0 ? (
                        "Complete experiments to earn your first badge!"
                      ) : earnedBadges.length < 5 ? (
                        "You're making great progress! Keep going to earn more badges."
                      ) : (
                        "Impressive collection! You're becoming a STEAM expert."
                      )}
                    </Typography>
                    
                    <Button 
                      component={RouterLink} 
                      to="/profile" 
                      variant="contained" 
                      color="primary"
                      size="large"
                      sx={{ mt: 2, px: 4, py: 1.5, borderRadius: 2 }}
                    >
                      View Profile
                    </Button>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
    </Box>
      </Container>
    </ErrorBoundary>
  );
};

export default ExperimentDashboard; 