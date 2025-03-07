import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Chip,
  useTheme,
  alpha,
  Button,
  Tooltip,
  Zoom,
  Fade,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { useGamificationStore } from '../stores/gamificationStore';
import BadgeDialog from './BadgeDialog';
import { Badge } from '../types';
import ErrorBoundary from './ErrorBoundary';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LockIcon from '@mui/icons-material/Lock';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';

interface BadgeDisplayProps {
  limit?: number;
  showAll?: boolean;
}

/**
 * BadgeDisplay component displays user's earned badges
 * 
 * @param limit Optional limit on the number of badges to display
 * @param showAll Whether to show all badges (earned and locked)
 */
const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  limit,
  showAll = false
}) => {
  const theme = useTheme();
  const badges = useGamificationStore((state) => state.badges);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showAllBadges, setShowAllBadges] = useState(showAll);
  const [filterEarned, setFilterEarned] = useState(false);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
  };

  const handleCloseDialog = () => {
    setSelectedBadge(null);
  };

  const toggleFilter = () => {
    setFilterEarned(!filterEarned);
  };

  // Filter badges based on props and filter state
  const earnedBadges = badges.filter(badge => badge.earned);
  const displayBadges = showAllBadges 
    ? (filterEarned ? earnedBadges : badges)
    : earnedBadges;
  
  // Apply limit if provided
  const limitedBadges = limit && limit > 0 
    ? displayBadges.slice(0, limit) 
    : displayBadges;

  return (
    <ErrorBoundary>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiEventsIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {showAllBadges ? 'All Badges' : 'Your Badges'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showAllBadges && (
              <Tooltip title={filterEarned ? "Show all badges" : "Show only earned badges"}>
                <IconButton 
                  size="small" 
                  onClick={toggleFilter}
                  color={filterEarned ? "primary" : "default"}
                >
                  <FilterListIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            
            <Chip 
              label={`${earnedBadges.length} of ${badges.length} earned`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ fontWeight: 500 }}
            />
          </Box>
        </Box>

        {limitedBadges.length > 0 ? (
          <Grid container spacing={2}>
            {limitedBadges.map((badge) => (
              <Grid item xs={6} sm={limit && limit <= 3 ? 4 : 3} key={badge.id}>
                <Zoom in={true} style={{ transitionDelay: `${limitedBadges.indexOf(badge) * 50}ms` }}>
                  <Paper
                    elevation={0}
                    onClick={() => handleBadgeClick(badge)}
                    onMouseEnter={() => setHoveredBadge(badge.id)}
                    onMouseLeave={() => setHoveredBadge(null)}
                    sx={{
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      borderRadius: 2,
                      position: 'relative',
                      overflow: 'hidden',
                      border: `1px solid ${alpha(
                        badge.earned ? theme.palette.success.main : theme.palette.divider,
                        badge.earned ? 0.3 : 0.8
                      )}`,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: hoveredBadge === badge.id ? 'translateY(-4px)' : 'translateY(0)',
                      boxShadow: hoveredBadge === badge.id
                        ? `0 8px 16px ${alpha(
                            badge.earned ? theme.palette.success.main : theme.palette.primary.main,
                            0.2
                          )}`
                        : 'none',
                      bgcolor: badge.earned
                        ? alpha(theme.palette.success.main, 0.05)
                        : alpha(theme.palette.background.paper, 0.8),
                      '&::after': badge.earned ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
                      } : {},
                    }}
                  >
                    {!badge.earned && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(1px)',
                          zIndex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: hoveredBadge === badge.id ? 0 : 0.7,
                          transition: 'opacity 0.3s ease',
                        }}
                      >
                        <LockIcon sx={{ color: alpha(theme.palette.text.secondary, 0.5), fontSize: 32 }} />
                      </Box>
                    )}
                    
                    <Box
                      sx={{
                        position: 'relative',
                        mb: 1,
                        width: 70,
                        height: 70,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {badge.earned && (
                        <Box
                          sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            animation: badge.earned ? 'pulse 2s infinite' : 'none',
                            '@keyframes pulse': {
                              '0%': {
                                boxShadow: `0 0 0 0 ${alpha(theme.palette.success.main, 0.7)}`,
                              },
                              '70%': {
                                boxShadow: `0 0 0 10px ${alpha(theme.palette.success.main, 0)}`,
                              },
                              '100%': {
                                boxShadow: `0 0 0 0 ${alpha(theme.palette.success.main, 0)}`,
                              },
                            },
                          }}
                        />
                      )}
                      <Avatar
                        src={badge.imageUrl}
                        alt={badge.name}
                        sx={{
                          width: 64,
                          height: 64,
                          filter: badge.earned ? 'none' : 'grayscale(100%)',
                          opacity: badge.earned ? 1 : 0.5,
                          transition: 'all 0.3s ease',
                          transform: hoveredBadge === badge.id && badge.earned ? 'scale(1.1)' : 'scale(1)',
                          boxShadow: badge.earned 
                            ? `0 0 10px ${alpha(theme.palette.success.main, 0.5)}`
                            : 'none',
                        }}
                      />
                    </Box>
                    
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 0.5,
                        color: badge.earned
                          ? 'text.primary'
                          : 'text.secondary',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      {badge.name}
                    </Typography>
                    
                    <Fade in={hoveredBadge === badge.id}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          display: hoveredBadge === badge.id ? 'block' : 'none',
                          mb: 1,
                          position: 'relative',
                          zIndex: 2,
                        }}
                      >
                        {badge.description.length > 60
                          ? `${badge.description.substring(0, 60)}...`
                          : badge.description}
                      </Typography>
                    </Fade>
                    
                    <Chip
                      label={badge.earned ? 'Earned' : 'Locked'}
                      size="small"
                      color={badge.earned ? 'success' : 'default'}
                      variant={badge.earned ? 'filled' : 'outlined'}
                      sx={{ 
                        mt: 'auto',
                        position: 'relative',
                        zIndex: 2,
                        fontWeight: 500,
                      }}
                      icon={badge.earned ? <EmojiEventsIcon /> : <LockIcon />}
                    />
                    
                    <Fade in={hoveredBadge === badge.id}>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          display: hoveredBadge === badge.id ? 'block' : 'none',
                          zIndex: 3,
                        }}
                      >
                        <Tooltip title="View details">
                          <IconButton
                            size="small"
                            sx={{
                              bgcolor: alpha(theme.palette.background.paper, 0.9),
                              boxShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.1)}`,
                              '&:hover': {
                                bgcolor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                              },
                            }}
                          >
                            <InfoOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Fade>
                  </Paper>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ 
            py: 4, 
            textAlign: 'center',
            bgcolor: alpha(theme.palette.background.paper, 0.5),
            borderRadius: 2,
            border: `1px dashed ${theme.palette.divider}`,
          }}>
            <EmojiEventsIcon sx={{ fontSize: 48, color: alpha(theme.palette.text.secondary, 0.3), mb: 2 }} />
            <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {showAllBadges 
                ? 'No badges available.' 
                : 'No earned badges found. Complete experiments to earn badges!'}
            </Typography>
            {!showAllBadges && (
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => setShowAllBadges(true)}
                sx={{ mt: 2 }}
              >
                View Available Badges
              </Button>
            )}
          </Box>
        )}

        {limit && displayBadges.length > limit && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button 
              variant="outlined" 
              color="primary"
              size="small"
              onClick={() => setShowAllBadges(!showAllBadges)}
              startIcon={<EmojiEventsIcon />}
              sx={{ 
                borderRadius: 4,
                px: 3,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              {showAllBadges ? 'Show Less' : 'View All Badges'}
            </Button>
          </Box>
        )}

        <BadgeDialog
          badge={selectedBadge}
          open={Boolean(selectedBadge)}
          onClose={handleCloseDialog}
        />
      </Box>
    </ErrorBoundary>
  );
};

export default BadgeDisplay; 