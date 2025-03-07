import React from 'react';
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
  CardActionArea
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

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
  comingSoon?: boolean;
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
  completed,
  comingSoon = false
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);
  
  const handleStartExperiment = () => {
    if (!comingSoon) {
      navigate(path);
    }
  };
  
  // Truncate description if it's too long
  const truncatedDescription = description.length > 120
    ? `${description.substring(0, 120)}...`
    : description;
  
  // Determine difficulty color
  const getDifficultyColor = () => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return theme.palette.success.main;
      case 'intermediate':
        return theme.palette.warning.main;
      case 'advanced':
        return theme.palette.error.main;
      default:
        return theme.palette.primary.main;
    }
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        },
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {comingSoon && (
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: -30,
            transform: 'rotate(45deg)',
            bgcolor: 'secondary.main',
            color: 'white',
            py: 0.5,
            px: 4,
            zIndex: 1,
            boxShadow: 1
          }}
        >
          Coming Soon
        </Box>
      )}
      
      <CardActionArea 
        onClick={handleStartExperiment}
        disabled={comingSoon}
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
        />
        
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {truncatedDescription}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Chip 
              label={difficulty} 
              size="small" 
              sx={{ 
                bgcolor: alpha(getDifficultyColor(), 0.1),
                color: getDifficultyColor(),
                borderColor: getDifficultyColor(),
                fontWeight: 500
              }}
              variant="outlined"
            />
            <Chip 
              label={subject} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
            <Chip 
              label={duration} 
              size="small" 
              variant="outlined" 
              color="default"
            />
          </Box>
          
          {progress > 0 && (
            <Box sx={{ width: '100%', mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {progress}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                color={completed ? "success" : "primary"}
                sx={{ height: 6, borderRadius: 1 }}
              />
            </Box>
          )}
          
          <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant={isHovered ? "contained" : "outlined"}
              color={comingSoon ? "secondary" : "primary"}
              disabled={comingSoon}
              sx={{ width: '100%', mt: 2 }}
            >
              {comingSoon 
                ? 'Coming Soon' 
                : completed 
                  ? 'Review Experiment' 
                  : progress > 0 
                    ? 'Continue Experiment' 
                    : 'Start Experiment'
              }
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ExperimentCard;