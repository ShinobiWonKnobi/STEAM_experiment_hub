import React, { useState } from 'react';
import { 
  Grid, 
  Typography, 
  Box, 
  Container, 
  TextField, 
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Chip,
  useTheme,
  alpha
} from '@mui/material';
import ExperimentCard from '../../components/ExperimentCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ScienceIcon from '@mui/icons-material/Science';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import BiotechIcon from '@mui/icons-material/Biotech';
import SchoolIcon from '@mui/icons-material/School';
import ErrorBoundary from '../../components/ErrorBoundary';
import { useGamificationStore } from '../../stores/gamificationStore';

// Define experiment interface
interface Experiment {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: string;
  subject: string;
  duration: number;
  path: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

// Experiment data
const experiments: Experiment[] = [
  {
    id: 'acid-base-titration',
    title: 'Acid-Base Titration',
    description: 'Learn about pH and chemical reactions by performing a virtual titration experiment.',
    imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    difficulty: 'Intermediate',
    subject: 'Chemistry',
    duration: 25,
    path: '/experiments/acid-base-titration',
    icon: <ScienceIcon />
  },
  {
    id: 'ohms-law',
    title: 'Ohm\'s Law',
    description: 'Explore the relationship between voltage, current, and resistance in electrical circuits using an interactive PhET simulation.',
    imageUrl: 'https://images.unsplash.com/photo-1620283085439-39620a1e21c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    difficulty: 'Beginner',
    subject: 'Physics',
    duration: 15,
    path: '/experiments/ohms-law',
    icon: <ElectricBoltIcon />
  },
  {
    id: 'wave-interference',
    title: 'Wave Interference',
    description: 'Investigate how waves interact with each other and create patterns of constructive and destructive interference.',
    imageUrl: 'https://images.unsplash.com/photo-1505672678657-cc7037095e60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    difficulty: 'Intermediate',
    subject: 'Physics',
    duration: 20,
    path: '/experiments/wave-interference',
    icon: <SchoolIcon />
  },
  {
    id: 'natural-selection',
    title: 'Natural Selection',
    description: 'Discover how natural selection works by observing how populations change over time in response to environmental pressures.',
    imageUrl: 'https://images.unsplash.com/photo-1535637603896-07c179d71f96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    difficulty: 'Intermediate',
    subject: 'Biology',
    duration: 30,
    path: '/experiments/natural-selection',
    icon: <BiotechIcon />,
    comingSoon: true
  },
  {
    id: 'molecule-shapes',
    title: 'Molecule Shapes',
    description: 'Explore how the arrangement of electron pairs determines the three-dimensional structure of molecules.',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    difficulty: 'Advanced',
    subject: 'Chemistry',
    duration: 25,
    path: '/experiments/molecule-shapes',
    icon: <ScienceIcon />,
    comingSoon: true
  }
];

/**
 * ExperimentList component displays a grid of available experiments
 */
const ExperimentList: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('');
  const [subjectFilter, setSubjectFilter] = useState<string>('');
  
  // Get experiment progress from gamification store
  const getExperimentProgress = useGamificationStore((state) => state.getExperimentProgress);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const handleDifficultyChange = (event: SelectChangeEvent) => {
    setDifficultyFilter(event.target.value);
  };
  
  const handleSubjectChange = (event: SelectChangeEvent) => {
    setSubjectFilter(event.target.value);
  };
  
  const filteredExperiments = experiments.filter(experiment => {
    const matchesSearch = experiment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         experiment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === '' || experiment.difficulty === difficultyFilter;
    const matchesSubject = subjectFilter === '' || experiment.subject === subjectFilter;
    
    return matchesSearch && matchesDifficulty && matchesSubject;
  });
  
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const subjects = ['Chemistry', 'Physics', 'Biology'];
  
  return (
    <ErrorBoundary>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Available Experiments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore our collection of interactive science experiments. Filter by difficulty or subject to find the perfect experiment for your learning goals.
          </Typography>
        </Box>
        
        <Box sx={{ 
          mb: 4, 
          p: 3, 
          borderRadius: 2,
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
        }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search experiments..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="difficulty-filter-label">Difficulty</InputLabel>
                <Select
                  labelId="difficulty-filter-label"
                  value={difficultyFilter}
                  label="Difficulty"
                  onChange={handleDifficultyChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterListIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">All Difficulties</MenuItem>
                  {difficulties.map(difficulty => (
                    <MenuItem key={difficulty} value={difficulty}>{difficulty}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="subject-filter-label">Subject</InputLabel>
                <Select
                  labelId="subject-filter-label"
                  value={subjectFilter}
                  label="Subject"
                  onChange={handleSubjectChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterListIcon />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">All Subjects</MenuItem>
                  {subjects.map(subject => (
                    <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        
        {filteredExperiments.length > 0 ? (
          <Grid container spacing={4}>
            {filteredExperiments.map(experiment => {
              // Get progress for this experiment
              const progress = getExperimentProgress(experiment.id);
              
              return (
                <Grid item xs={12} sm={6} md={4} key={experiment.id}>
                  <ExperimentCard
                    id={experiment.id}
                    title={experiment.title}
                    description={experiment.description}
                    imageUrl={experiment.imageUrl}
                    difficulty={experiment.difficulty}
                    subject={experiment.subject}
                    duration={`${experiment.duration} min`}
                    path={experiment.path}
                    progress={progress.progress}
                    completed={progress.completed}
                    comingSoon={experiment.comingSoon}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No experiments match your search criteria
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your filters or search term
            </Typography>
          </Box>
        )}
        
        <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            Available subjects:
          </Typography>
          {subjects.map(subject => (
            <Chip 
              key={subject} 
              label={subject} 
              size="small" 
              onClick={() => setSubjectFilter(subject)}
              color={subjectFilter === subject ? "primary" : "default"}
            />
          ))}
        </Box>
      </Container>
    </ErrorBoundary>
  );
};

export default ExperimentList; 