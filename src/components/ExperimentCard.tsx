import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box, 
  Chip, 
  LinearProgress,
  alpha,
  useTheme,
  Tooltip,
  IconButton,
  Zoom,
  Fade,
  Paper,
  Divider,
  CardActionArea,
  CardActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useGamificationStore } from '../stores/gamificationStore';

export interface ExperimentCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: string;
  subject: string;
  duration: string;
  path: string;
  progress: number;
  completed: boolean;
}

const ExperimentCard: React.FC<ExperimentCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  difficulty,
  subject,
  duration,
  path,
  progress,
  completed
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const badges = useGamificationStore(state => state.badges);
  const relatedBadge = badges.find(b => 
    (id === 'acid-base-titration' && b.id === 'chemistry-whiz') ||
    (id === 'pendulum-motion' && b.id === 'physics-master') ||
    (id === 'dna-extraction' && b.id === 'biology-expert')
  );

  const getDifficultyColor = () => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'primary';
      case 'advanced':
        return 'secondary';
      default:
        return 'primary';
    }
  };
  
  const getSubjectIcon = () => {
    switch (subject.toLowerCase()) {
      case 'chemistry':
        return '🧪';
      case 'physics':
        return '🔭';
      case 'biology':
        return '🧬';
      case 'math':
        return '📊';
      default:
        return '🔬';
    }
  };

  const handleStartExperiment = () => {
    navigate(path);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? `0 12px 28px ${alpha(theme.palette.primary.main, 0.2)}`
          : `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
        borderRadius: 2,
        overflow: 'hidden',
        '&::after': isHovered ? {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        } : {},
        border: completed ? `1px solid ${alpha(theme.palette.success.main, 0.3)}` : `1px solid ${theme.palette.divider}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardActionArea 
        onClick={handleStartExperiment}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="160"
            image={imageUrl}
            alt={title}
            sx={{ 
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to bottom, ${alpha(theme.palette.common.black, 0)} 70%, ${alpha(theme.palette.common.black, 0.7)} 100%)`,
            }}
          />
          
          {completed && (
            <Zoom in={completed}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  zIndex: 1,
                  bgcolor: 'success.main',
                  color: 'white',
                  borderRadius: '50%',
                  p: 0.5,
                  boxShadow: `0 2px 8px ${alpha(theme.palette.success.main, 0.5)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircleIcon />
              </Box>
            </Zoom>
          )}
          
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Chip
              label={difficulty}
              size="small"
              color={getDifficultyColor()}
              sx={{ 
                fontWeight: 'bold',
                backdropFilter: 'blur(4px)',
                bgcolor: alpha(theme.palette[getDifficultyColor()].main, 0.8),
              }}
            />
          </Box>
          
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 12,
              zIndex: 1,
            }}
          >
            <Chip
              icon={<SchoolIcon />}
              label={subject}
              size="small"
              sx={{ 
                backdropFilter: 'blur(4px)',
                bgcolor: alpha(theme.palette.background.paper, 0.7),
                color: 'text.primary',
                fontWeight: 500,
              }}
            />
          </Box>
          
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 12,
              zIndex: 1,
            }}
          >
            <Chip
              icon={<AccessTimeIcon />}
              label={duration}
              size="small"
              sx={{ 
                backdropFilter: 'blur(4px)',
                bgcolor: alpha(theme.palette.background.paper, 0.7),
                color: 'text.primary',
              }}
            />
          </Box>
        </Box>
        
        <CardContent sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: 2.5,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography 
              gutterBottom 
              variant="h6" 
              component="h2"
              sx={{ 
                fontWeight: 600,
                mb: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {getSubjectIcon()} {title}
            </Typography>
            
            {relatedBadge && (
              <Tooltip 
                title={`Complete this experiment to earn the ${relatedBadge.name} badge!`}
                placement="top"
                arrow
              >
                <Box sx={{ 
                  color: relatedBadge.earned ? 'warning.main' : 'text.disabled',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <EmojiEventsIcon fontSize="small" />
                </Box>
              </Tooltip>
            )}
          </Box>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 2,
              flexGrow: 1,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Typography>
          
          <Box sx={{ mt: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                {completed ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {Math.round(progress)}%
              </Typography>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 6, 
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  background: completed 
                    ? `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.light})`
                    : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }
              }} 
            />
          </Box>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          variant={completed ? "outlined" : "contained"}
          color={completed ? "success" : "primary"}
          fullWidth
          startIcon={completed ? <CheckCircleIcon /> : <PlayArrowIcon />}
          onClick={handleStartExperiment}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: completed ? 'none' : 2,
          }}
        >
          {completed ? 'Review Experiment' : progress > 0 ? 'Continue Experiment' : 'Start Experiment'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExperimentCard;