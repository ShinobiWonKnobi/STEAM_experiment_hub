import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme,
  alpha,
  Tooltip,
  LinearProgress,
  CircularProgress,
  Divider,
  Fade,
  Zoom,
  Button,
} from '@mui/material';
import { useGamificationStore } from '../stores/gamificationStore';
import ScienceIcon from '@mui/icons-material/Science';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link as RouterLink } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

/**
 * ProgressTracker component displays the user's progress in experiments and badges
 */
const ProgressTracker: React.FC = () => {
  const theme = useTheme();
  
  // Get data from store using helper functions
  const badges = useGamificationStore((state) => state.badges);
  const earnedBadges = useGamificationStore((state) => state.getEarnedBadges());
  const completedExperiments = useGamificationStore((state) => state.getCompletedExperiments());
  const totalExperiments = 3; // Hardcoded for now, could be fetched from API
  
  // Calculate percentages
  const experimentProgress = Math.round((completedExperiments / totalExperiments) * 100);
  const badgeProgress = Math.round((earnedBadges.length / badges.length) * 100);
  const overallProgress = Math.round((experimentProgress + badgeProgress) / 2);

  // Get motivational message based on progress
  const getMotivationalMessage = () => {
    if (overallProgress === 0) return "Start your first experiment to begin your learning journey!";
    if (overallProgress < 25) return "Great start! Keep exploring experiments to earn more badges.";
    if (overallProgress < 50) return "You're making good progress! Continue your scientific journey.";
    if (overallProgress < 75) return "Impressive work! You're well on your way to becoming a STEAM expert.";
    if (overallProgress < 100) return "Almost there! Just a few more achievements to complete.";
    return "Congratulations! You've mastered all the experiments and earned all badges!";
  };

  return (
    <ErrorBoundary>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUpIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Your Learning Journey
            </Typography>
          </Box>
          
          <Tooltip title="Your overall progress across all activities">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Overall Progress:
              </Typography>
              <Typography variant="body2" color="primary" sx={{ fontWeight: 700 }}>
                {overallProgress}%
              </Typography>
            </Box>
          </Tooltip>
        </Box>
        
        <Grid container spacing={3}>
          {/* Overall Progress Card */}
          <Grid item xs={12}>
            <Zoom in={true} style={{ transitionDelay: '100ms' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                  mb: 3,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    width: '30%', 
                    height: '100%',
                    opacity: 0.05,
                    background: 'url(https://images.unsplash.com/photo-1507413245164-6160d8298b31) no-repeat center center',
                    backgroundSize: 'cover',
                    display: { xs: 'none', md: 'block' }
                  }} 
                />
                
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                    {overallProgress < 25 ? "Just Getting Started" : 
                     overallProgress < 50 ? "Making Progress" :
                     overallProgress < 75 ? "Well On Your Way" :
                     overallProgress < 100 ? "Almost There" : "Master Scientist"}
                  </Typography>
                  
                  <Typography variant="body1" paragraph>
                    {getMotivationalMessage()}
                  </Typography>
                  
                  <Box sx={{ mt: 3, mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">Overall Progress</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{overallProgress}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={overallProgress} 
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
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
          
          {/* Experiments Progress */}
          <Grid item xs={12} md={6}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ 
                  p: 2, 
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  borderBottom: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}>
                  <ScienceIcon color="success" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Experiments
                  </Typography>
                </Box>
                
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <CircularProgress
                        variant="determinate"
                        value={experimentProgress}
                        size={120}
                        thickness={4}
                        sx={{
                          color: theme.palette.success.main,
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="h4" component="div" color="success.main" sx={{ fontWeight: 'bold' }}>
                          {experimentProgress}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.success.main }}>
                      {completedExperiments} / {totalExperiments}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      experiments completed
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 'auto' }}>
                    {completedExperiments === 0 ? (
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                        Start your first experiment to track your progress!
                      </Typography>
                    ) : completedExperiments < totalExperiments ? (
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                        {totalExperiments - completedExperiments} more experiment{totalExperiments - completedExperiments > 1 ? 's' : ''} to complete!
                      </Typography>
                    ) : (
                      <Box sx={{ textAlign: 'center' }}>
                        <CheckCircleIcon color="success" sx={{ fontSize: 32, mb: 1 }} />
                        <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
                          All experiments completed!
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
          
          {/* Badges Progress */}
          <Grid item xs={12} md={6}>
            <Zoom in={true} style={{ transitionDelay: '300ms' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ 
                  p: 2, 
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}>
                  <EmojiEventsIcon color="primary" />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Badges
                  </Typography>
                </Box>
                
                <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <CircularProgress
                        variant="determinate"
                        value={badgeProgress}
                        size={120}
                        thickness={4}
                        sx={{
                          color: theme.palette.primary.main,
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="h4" component="div" color="primary.main" sx={{ fontWeight: 'bold' }}>
                          {badgeProgress}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                      {earnedBadges.length} / {badges.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      badges earned
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                    {earnedBadges.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">
                        Complete experiments to earn your first badge!
                      </Typography>
                    ) : earnedBadges.length < badges.length ? (
                      <Button 
                        component={RouterLink} 
                        to="/profile" 
                        variant="outlined" 
                        color="primary"
                        size="small"
                        startIcon={<EmojiEventsIcon />}
                        sx={{ 
                          borderRadius: 4,
                          textTransform: 'none',
                          fontWeight: 500,
                        }}
                      >
                        View Your Badges
                      </Button>
                    ) : (
                      <Box>
                        <CheckCircleIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                        <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                          All badges collected!
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
        </Grid>
      </Box>
    </ErrorBoundary>
  );
};

export default ProgressTracker; 